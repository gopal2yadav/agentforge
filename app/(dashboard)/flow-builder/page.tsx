'use client';
import { useState, useEffect, useCallback } from 'react';

interface FlowNode {
  id: string;
  type: 'agent' | 'trigger' | 'condition' | 'output' | 'delay';
  name: string;
  config: any;
  x: number;
  y: number;
}

interface FlowEdge {
  from: string;
  to: string;
}

const NODE_TYPES = [
  { type: 'trigger', name: 'Trigger', desc: 'Start the flow', color: '#6ee7b7', icon: 'T' },
  { type: 'agent', name: 'AI Agent', desc: 'Run an agent', color: '#a5b4fc', icon: 'A' },
  { type: 'condition', name: 'Condition', desc: 'If/else branch', color: '#fcd34d', icon: '?' },
  { type: 'delay', name: 'Delay', desc: 'Wait before next', color: '#f0abfc', icon: 'D' },
  { type: 'output', name: 'Output', desc: 'Send result', color: '#93c5fd', icon: 'O' },
];

const TRIGGER_OPTIONS = ['Webhook', 'Schedule (Cron)', 'New Email', 'Slack Message', 'Form Submission', 'Manual'];

export default function FlowBuilderPage() {
  const [nodes, setNodes] = useState<FlowNode[]>([
    { id: 'trigger-1', type: 'trigger', name: 'Webhook Trigger', config: { trigger: 'Webhook' }, x: 300, y: 40 },
  ]);
  const [edges, setEdges] = useState<FlowEdge[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [flowName, setFlowName] = useState('New Workflow');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetch('/api/agents').then(r => r.json()).then(d => setAgents(Array.isArray(d) ? d : [])).catch(() => {}); }, []);

  const addNode = (type: string) => {
    const nt = NODE_TYPES.find(n => n.type === type);
    if (!nt) return;
    const id = type + '-' + Date.now();
    const newNode: FlowNode = {
      id, type: type as any, name: nt.name,
      config: type === 'agent' ? { agentId: agents[0]?.id || '' } : type === 'delay' ? { minutes: 5 } : {},
      x: 200 + Math.random() * 200, y: 100 + nodes.length * 100,
    };
    setNodes(prev => [...prev, newNode]);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setNodes(prev => prev.map(n => n.id === dragging ? { ...n, x: e.clientX - rect.left - dragOffset.x, y: e.clientY - rect.top - dragOffset.y } : n));
  };

  const startDrag = (e: React.MouseEvent, nodeId: string) => {
    const rect = e.currentTarget.closest('.flow-canvas')?.getBoundingClientRect();
    if (!rect) return;
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    setDragging(nodeId);
    setDragOffset({ x: e.clientX - rect.left - node.x, y: e.clientY - rect.top - node.y });
  };

  const handleNodeClick = (nodeId: string) => {
    if (connecting) {
      if (connecting !== nodeId) {
        setEdges(prev => [...prev, { from: connecting, to: nodeId }]);
      }
      setConnecting(null);
    } else {
      setSelectedNode(selectedNode === nodeId ? null : nodeId);
    }
  };

  const deleteNode = (nodeId: string) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setEdges(prev => prev.filter(e => e.from !== nodeId && e.to !== nodeId));
    setSelectedNode(null);
  };

  const saveFlow = async () => {
    setSaving(true);
    try {
      const steps = nodes.filter(n => n.type === 'agent').map(n => {
        const agent = agents.find(a => a.id === n.config.agentId);
        return agent?.name || n.name;
      });
      const trigger = nodes.find(n => n.type === 'trigger')?.config?.trigger || 'Manual';
      await fetch('/api/flows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: flowName, description: 'Visual flow with ' + nodes.length + ' nodes', trigger, steps, status: 'active' }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {}
    setSaving(false);
  };

  const selNode = nodes.find(n => n.id === selectedNode);
  const getNodeColor = (type: string) => NODE_TYPES.find(n => n.type === type)?.color || '#a5b4fc';

  return (
    <div className="flex h-[calc(100vh-120px)] gap-4">
      {/* Left Panel — Node Library */}
      <div className="w-56 shrink-0 rounded-xl p-4" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <div className="text-sm font-semibold mb-3">Add Node</div>
        <div className="space-y-2">
          {NODE_TYPES.map(nt => (
            <button key={nt.type} onClick={() => addNode(nt.type)} className="w-full flex items-center gap-2.5 p-2.5 rounded-lg text-left transition-all hover:translate-y-[-1px]" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(99,102,241,0.1)' }}>
              <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold" style={{ background: nt.color + '20', color: nt.color }}>{nt.icon}</div>
              <div>
                <div className="text-xs font-semibold">{nt.name}</div>
                <div className="text-[9px] text-indigo-300/40">{nt.desc}</div>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(99,102,241,0.1)' }}>
          <div className="text-[10px] text-indigo-300/40 mb-2">Flow: {nodes.length} nodes, {edges.length} connections</div>
          <input type="text" value={flowName} onChange={e => setFlowName(e.target.value)} className="w-full px-2 py-1.5 rounded text-xs mb-2" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(99,102,241,0.1)', color: '#e0e7ff' }} />
          <button onClick={saveFlow} disabled={saving} className="w-full py-2 rounded-lg text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>{saving ? 'Saving...' : saved ? 'Saved!' : 'Save Flow'}</button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 rounded-xl relative overflow-hidden flow-canvas" style={{ background: 'rgba(5,3,15,0.8)', border: '1px solid rgba(99,102,241,0.15)', backgroundImage: 'radial-gradient(rgba(99,102,241,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} onMouseMove={handleCanvasMouseMove} onMouseUp={() => setDragging(null)} onMouseLeave={() => setDragging(null)}>
        <div className="absolute top-3 left-3 text-[10px] text-indigo-300/30">Visual Flow Builder — Click nodes to select, drag to move</div>
        {connecting && <div className="absolute top-3 right-3 px-3 py-1 rounded text-[10px] font-semibold" style={{ background: 'rgba(99,102,241,0.2)', color: '#a5b4fc' }}>Click target node to connect...</div>}

        {/* Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {edges.map((edge, i) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;
            const fx = fromNode.x + 80; const fy = fromNode.y + 40;
            const tx = toNode.x + 80; const ty = toNode.y;
            const my = (fy + ty) / 2;
            return <path key={i} d={'M ' + fx + ' ' + fy + ' C ' + fx + ' ' + my + ' ' + tx + ' ' + my + ' ' + tx + ' ' + ty} fill="none" stroke="rgba(99,102,241,0.4)" strokeWidth="2" strokeDasharray="6 3" />;
          })}
        </svg>

        {/* Nodes */}
        {nodes.map(node => (
          <div key={node.id} className="absolute cursor-move select-none" style={{ left: node.x, top: node.y, width: 160, transition: dragging === node.id ? 'none' : 'box-shadow 0.2s' }} onMouseDown={e => { e.stopPropagation(); startDrag(e, node.id); }} onClick={e => { e.stopPropagation(); handleNodeClick(node.id); }}>
            <div className="rounded-xl p-3 transition-all" style={{ background: 'rgba(15,15,35,0.9)', border: selectedNode === node.id ? '2px solid ' + getNodeColor(node.type) : '1px solid rgba(99,102,241,0.2)', boxShadow: selectedNode === node.id ? '0 0 20px ' + getNodeColor(node.type) + '40' : 'none' }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold" style={{ background: getNodeColor(node.type) + '20', color: getNodeColor(node.type) }}>{NODE_TYPES.find(t => t.type === node.type)?.icon}</div>
                <div className="text-xs font-semibold truncate">{node.name}</div>
              </div>
              <div className="text-[9px] text-indigo-300/40">{node.type === 'agent' ? (agents.find(a => a.id === node.config.agentId)?.name || 'Select agent') : node.type === 'trigger' ? (node.config.trigger || 'Webhook') : node.type === 'delay' ? (node.config.minutes + ' min delay') : node.type}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Panel — Node Config */}
      {selNode && (
        <div className="w-64 shrink-0 rounded-xl p-4" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold">Configure</div>
            <button onClick={() => setSelectedNode(null)} className="text-xs text-indigo-400/50">Close</button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-indigo-300/40 block mb-1">Name</label>
              <input type="text" value={selNode.name} onChange={e => setNodes(prev => prev.map(n => n.id === selNode.id ? { ...n, name: e.target.value } : n))} className="w-full px-2 py-1.5 rounded text-xs" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(99,102,241,0.1)', color: '#e0e7ff' }} />
            </div>

            {selNode.type === 'agent' && (
              <div>
                <label className="text-[10px] text-indigo-300/40 block mb-1">Agent</label>
                <select value={selNode.config.agentId || ''} onChange={e => setNodes(prev => prev.map(n => n.id === selNode.id ? { ...n, config: { ...n.config, agentId: e.target.value } } : n))} className="w-full px-2 py-1.5 rounded text-xs" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(99,102,241,0.1)', color: '#e0e7ff' }}>
                  <option value="">Select agent...</option>
                  {agents.map(a => <option key={a.id} value={a.id}>{a.name} ({a.role})</option>)}
                </select>
              </div>
            )}

            {selNode.type === 'trigger' && (
              <div>
                <label className="text-[10px] text-indigo-300/40 block mb-1">Trigger Type</label>
                <select value={selNode.config.trigger || 'Webhook'} onChange={e => setNodes(prev => prev.map(n => n.id === selNode.id ? { ...n, config: { ...n.config, trigger: e.target.value } } : n))} className="w-full px-2 py-1.5 rounded text-xs" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(99,102,241,0.1)', color: '#e0e7ff' }}>
                  {TRIGGER_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            )}

            {selNode.type === 'delay' && (
              <div>
                <label className="text-[10px] text-indigo-300/40 block mb-1">Delay (minutes)</label>
                <input type="number" value={selNode.config.minutes || 5} onChange={e => setNodes(prev => prev.map(n => n.id === selNode.id ? { ...n, config: { ...n.config, minutes: parseInt(e.target.value) } } : n))} className="w-full px-2 py-1.5 rounded text-xs" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(99,102,241,0.1)', color: '#e0e7ff' }} />
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button onClick={() => setConnecting(selNode.id)} className="flex-1 py-1.5 rounded text-[10px] font-semibold" style={{ background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>Connect</button>
              <button onClick={() => deleteNode(selNode.id)} className="flex-1 py-1.5 rounded text-[10px] font-semibold" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
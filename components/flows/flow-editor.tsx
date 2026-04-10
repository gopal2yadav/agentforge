'use client';

import { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  addEdge, Background, Controls, MiniMap,
  useNodesState, useEdgesState, Panel, Handle, Position,
  type Connection, type NodeProps, type Node, type Edge, MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Bot, Zap, GitBranch, ArrowRight, Play, Save, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

function AgentNode({ data, selected }: NodeProps) {
  return (
    <div className={cn('px-4 py-3 rounded-xl border-2 bg-[#14141f] min-w-[180px]', selected ? 'border-[#6366f1] shadow-lg' : 'border-[#2a2a3d]')}>
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-[#6366f1]" />
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: (data.color || '#6366f1') + '18' }}>
          <Bot className="w-4 h-4" style={{ color: data.color || '#6366f1' }} />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-white">{data.label}</div>
          <div className="text-[10px] text-[#6b6b8a]">{data.model || 'claude-sonnet-4'}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-[#6366f1]" />
    </div>
  );
}

function ToolNode({ data, selected }: NodeProps) {
  return (
    <div className={cn('px-4 py-3 rounded-xl border-2 bg-[#14141f] min-w-[160px]', selected ? 'border-[#22d3ee]' : 'border-[#2a2a3d]')}>
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-[#22d3ee]" />
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#22d3ee]/10 flex items-center justify-center"><Zap className="w-4 h-4 text-[#22d3ee]" /></div>
        <div><div className="text-[13px] font-semibold text-white">{data.label}</div><div className="text-[10px] text-[#6b6b8a]">Tool</div></div>
      </div>
      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-[#22d3ee]" />
    </div>
  );
}

function ConditionNode({ data, selected }: NodeProps) {
  return (
    <div className={cn('px-4 py-3 rounded-xl border-2 bg-[#14141f] min-w-[160px]', selected ? 'border-amber-500' : 'border-[#2a2a3d]')}>
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-amber-500" />
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><GitBranch className="w-4 h-4 text-amber-500" /></div>
        <div><div className="text-[13px] font-semibold text-white">{data.label}</div><div className="text-[10px] text-[#6b6b8a]">Condition</div></div>
      </div>
      <Handle type="source" position={Position.Right} id="yes" style={{ top: '30%' }} className="!w-3 !h-3 !bg-[#22c55e]" />
      <Handle type="source" position={Position.Right} id="no" style={{ top: '70%' }} className="!w-3 !h-3 !bg-[#ef4444]" />
    </div>
  );
}

function InputNode({ data, selected }: NodeProps) {
  return (
    <div className={cn('px-4 py-3 rounded-xl border-2 border-dashed bg-[#14141f] min-w-[140px]', selected ? 'border-[#22c55e]' : 'border-[#2a2a3d]')}>
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#22c55e]/10 flex items-center justify-center"><MessageSquare className="w-4 h-4 text-[#22c55e]" /></div>
        <div className="text-[13px] font-semibold text-white">{data.label || 'Input'}</div>
      </div>
      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-[#22c55e]" />
    </div>
  );
}

function OutputNode({ data, selected }: NodeProps) {
  return (
    <div className={cn('px-4 py-3 rounded-xl border-2 border-dashed bg-[#14141f] min-w-[140px]', selected ? 'border-[#ec4899]' : 'border-[#2a2a3d]')}>
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-[#ec4899]" />
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#ec4899]/10 flex items-center justify-center"><ArrowRight className="w-4 h-4 text-[#ec4899]" /></div>
        <div className="text-[13px] font-semibold text-white">{data.label || 'Output'}</div>
      </div>
    </div>
  );
}

const nodeTypes = { agent: AgentNode, tool: ToolNode, condition: ConditionNode, input: InputNode, output: OutputNode };

const defaultNodes: Node[] = [
  { id: 'input-1', type: 'input', position: { x: 50, y: 200 }, data: { label: 'User Input' } },
  { id: 'agent-1', type: 'agent', position: { x: 320, y: 150 }, data: { label: 'Research Agent', model: 'claude-sonnet-4', color: '#6366f1' } },
  { id: 'agent-2', type: 'agent', position: { x: 320, y: 300 }, data: { label: 'Writer Agent', model: 'gpt-4o-mini', color: '#22d3ee' } },
  { id: 'condition-1', type: 'condition', position: { x: 600, y: 200 }, data: { label: 'Quality Check' } },
  { id: 'output-1', type: 'output', position: { x: 850, y: 200 }, data: { label: 'Final Output' } },
];

const defaultEdges: Edge[] = [
  { id: 'e1', source: 'input-1', target: 'agent-1', animated: true, style: { stroke: '#6366f1' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' } },
  { id: 'e2', source: 'input-1', target: 'agent-2', animated: true, style: { stroke: '#22d3ee' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#22d3ee' } },
  { id: 'e3', source: 'agent-1', target: 'condition-1', style: { stroke: '#6366f1' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' } },
  { id: 'e4', source: 'agent-2', target: 'condition-1', style: { stroke: '#22d3ee' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#22d3ee' } },
  { id: 'e5', source: 'condition-1', sourceHandle: 'yes', target: 'output-1', style: { stroke: '#22c55e' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' } },
];

interface FlowEditorProps { flowId?: string; flowName?: string; initialNodes?: Node[]; initialEdges?: Edge[]; onSave?: (nodes: Node[], edges: Edge[]) => void; }

export function FlowEditor({ flowId, flowName = 'Untitled Flow', initialNodes, initialEdges, onSave }: FlowEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes || defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges || defaultEdges);
  const [name, setName] = useState(flowName);
  const counter = useRef(10);

  const onConnect = useCallback((c: Connection) => {
    setEdges(eds => addEdge({ ...c, animated: true, style: { stroke: '#6366f1' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' } }, eds));
  }, [setEdges]);

  const addNode = (type: string) => {
    const id = type + '-' + counter.current++;
    const labels: Record<string,string> = { agent: 'New Agent', tool: 'New Tool', condition: 'Check', input: 'Input', output: 'Output' };
    setNodes(nds => [...nds, { id, type, position: { x: 400+Math.random()*100, y: 200+Math.random()*100 }, data: { label: labels[type] || 'Node', ...(type==='agent' ? { model: 'claude-sonnet-4', color: '#6366f1' } : {}) } }]);
  };

  return (
    <div className="h-[calc(100vh-56px-48px)] flex flex-col">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#14141f]/60 border-b border-[#2a2a3d]">
        <div className="flex items-center gap-3">
          <input value={name} onChange={e => setName(e.target.value)} className="bg-transparent text-base font-bold text-white outline-none border-b border-transparent hover:border-[#3a3a4d] focus:border-[#6366f1]" />
          <span className="text-[11px] text-[#6b6b8a] font-mono">{nodes.length} nodes · {edges.length} edges</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2a2a3d] border border-[#3a3a4d] text-xs font-semibold text-[#a0a0b8] hover:bg-[#3a3a4d]"><Save className="w-3.5 h-3.5" /> Save</button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#6366f1] text-white text-xs font-semibold hover:bg-[#5558e6]"><Play className="w-3.5 h-3.5" /> Run Flow</button>
        </div>
      </div>
      <div className="flex-1 relative">
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes} fitView className="bg-[#0a0a0f]" defaultEdgeOptions={{ animated: true, style: { stroke: '#6366f140', strokeWidth: 2 } }}>
          <Background color="#252536" gap={20} size={1} />
          <Controls />
          <MiniMap nodeColor={() => '#6366f1'} maskColor="rgba(10,10,15,0.7)" />
          <Panel position="top-left">
            <div className="bg-[#14141f]/90 backdrop-blur-xl border border-[#2a2a3d] rounded-xl p-2 shadow-2xl">
              <div className="text-[10px] text-[#6b6b8a] uppercase tracking-wider font-semibold px-2 py-1 mb-1">Add Nodes</div>
              {[{t:'input',l:'Input',c:'#22c55e'},{t:'agent',l:'AI Agent',c:'#6366f1'},{t:'tool',l:'Tool',c:'#22d3ee'},{t:'condition',l:'Condition',c:'#f59e0b'},{t:'output',l:'Output',c:'#ec4899'}].map(i=>(
                <button key={i.t} onClick={()=>addNode(i.t)} className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#2a2a3d] text-left">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{background:i.c+'15'}}><Bot className="w-3.5 h-3.5" style={{color:i.c}} /></div>
                  <span className="text-xs font-semibold text-[#e0e0e8]">{i.l}</span>
                </button>
              ))}
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

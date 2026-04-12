'use client';
import { useState, useEffect, useRef } from 'react';

const MODELS = ['claude-sonnet-4', 'claude-opus-4', 'gpt-4o'];

interface Message { role: 'user' | 'assistant'; content: string; }

export default function PlaygroundPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('claude-sonnet-4');
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState<any[]>([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { fetch('/api/agents').then(r => r.json()).then(setAgents).catch(() => {}); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const agent = agents.find(a => a.name === selectedAgent);
      const res = await fetch('/api/playground', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, model, agent: agent || null }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || data.error || 'No response' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Failed to connect to AI service.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-[900px] mx-auto flex flex-col h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Playground</h1>
          <p className="text-sm text-gray-500">Test your agents with real AI responses</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={selectedAgent} onChange={e => setSelectedAgent(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <option value="">Nexus Assistant</option>
            {agents.map((a: any) => <option key={a.id} value={a.name}>{a.name}</option>)}
          </select>
          <select value={model} onChange={e => setModel(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
            {MODELS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-y-auto p-4 mb-4">
        {messages.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl mx-auto mb-4 font-bold">N</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Start a Conversation</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">{selectedAgent ? 'Chatting with: ' + selectedAgent : 'Using Nexus Assistant. Select an agent above to chat as that agent.'}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['What can you help me with?', 'Analyze my workflow', 'Generate a report outline'].map(q => (
                <button key={q} onClick={() => { setInput(q); }} className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-500 hover:border-indigo-300 hover:text-indigo-600">{q}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={'flex ' + (msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={'max-w-[75%] rounded-xl px-4 py-3 text-sm ' + (msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-900 border border-gray-200')}>
                  {msg.role === 'assistant' && selectedAgent && <div className="text-xs text-indigo-600 font-semibold mb-1">{selectedAgent}</div>}
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()} placeholder={selectedAgent ? 'Ask ' + selectedAgent + '...' : 'Type a message...'} className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500" disabled={loading} />
        <button onClick={sendMessage} disabled={loading || !input.trim()} className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 shadow-sm">Send</button>
      </div>
    </div>
  );
}
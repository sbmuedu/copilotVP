import React, { useState } from 'react';

interface ChatMessage {
  sender: 'user' | 'system';
  text: string;
  timestamp: string;
}

interface ChatPanelProps {
  scenarioId: string;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ scenarioId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      sender: 'user',
      text: input,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Send to backend
    const res = await fetch(`http://localhost:3000/chat/${scenarioId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const systemMessage: ChatMessage = {
      sender: 'system',
      text: data.reply,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, systemMessage]);
  };

  return (
    <div className="bg-white shadow rounded p-4 space-y-4">
      <h2 className="text-lg font-semibold">Chat</h2>
      <div className="h-64 overflow-y-auto border rounded p-2 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded ${msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

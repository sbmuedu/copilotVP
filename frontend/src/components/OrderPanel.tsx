import React, { useState } from 'react';

interface OrderPanelProps {
  scenarioId: string;
}

export const OrderPanel: React.FC<OrderPanelProps> = ({ scenarioId }) => {
  const [orderType, setOrderType] = useState('lab');
  const [orderText, setOrderText] = useState('');
  const [orders, setOrders] = useState<string[]>([]);

  const submitOrder = async () => {
    if (!orderText.trim()) return;

    const res = await fetch(`http://localhost:3000/orders/${scenarioId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: orderType, text: orderText }),
    });

    const data = await res.json();
    setOrders(prev => [...prev, `${orderType.toUpperCase()}: ${orderText}`]);
    setOrderText('');
  };

  return (
    <div className="bg-white shadow rounded p-4 space-y-4">
      <h2 className="text-lg font-semibold">Place Orders</h2>
      <div className="flex gap-2">
        <select title='temp'
          className="border rounded px-2 py-1"
          value={orderType}
          onChange={e => setOrderType(e.target.value)}
        >
          <option value="lab">Lab</option>
          <option value="imaging">Imaging</option>
          <option value="medication">Medication</option>
        </select>
        <input
          className="flex-1 border rounded px-2 py-1"
          value={orderText}
          onChange={e => setOrderText(e.target.value)}
          placeholder="Order details..."
        />
        <button className="bg-green-500 text-white px-4 py-1 rounded" onClick={submitOrder}>
          Submit
        </button>
      </div>
      <div className="space-y-1">
        {orders.map((order, i) => (
          <div key={i} className="text-gray-700">{order}</div>
        ))}
      </div>
    </div>
  );
};

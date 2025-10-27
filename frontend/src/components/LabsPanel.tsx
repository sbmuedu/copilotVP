import React from 'react';

interface LabsPanelProps {
  labs: string[];
}

export const LabsPanel: React.FC<LabsPanelProps> = ({ labs }) => {
  if (!labs || labs.length === 0) return null;

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-2">Lab Results</h2>
      <ul className="list-disc pl-5 space-y-1">
        {labs.map((lab, index) => (
          <li key={index} className="text-gray-700">{lab}</li>
        ))}
      </ul>
    </div>
  );
};

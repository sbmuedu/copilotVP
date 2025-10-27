import React from 'react';

interface VitalsPanelProps {
  vitals: Record<string, number>;
}

export const VitalsPanel: React.FC<VitalsPanelProps> = ({ vitals }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-2">Initial Vitals</h2>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(vitals).map(([key, value]) => (
          <div key={key} className="flex justify-between border-b py-1">
            <span className="text-gray-600">{key}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';

interface ImagingPanelProps {
  imaging: string[];
}

export const ImagingPanel: React.FC<ImagingPanelProps> = ({ imaging }) => {
  if (!imaging || imaging.length === 0) return null;

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-2">Imaging</h2>
      <ul className="list-disc pl-5 space-y-1">
        {imaging.map((img, index) => (
          <li key={index} className="text-gray-700">{img}</li>
        ))}
      </ul>
    </div>
  );
};

import React from 'react';

interface TimelineEvent {
  timestamp: string;
  actor: string;
  action: string;
}

interface TimelinePanelProps {
  events: TimelineEvent[];
}

export const TimelinePanel: React.FC<TimelinePanelProps> = ({ events }) => {
  if (!events || events.length === 0) return null;

  return (
    <div className="bg-white shadow rounded p-4 space-y-4">
      <h2 className="text-lg font-semibold">Timeline</h2>
      <ul className="space-y-2">
        {events.map((event, i) => (
          <li key={i} className="border-l-4 border-blue-500 pl-4">
            <div className="text-sm text-gray-500">{new Date(event.timestamp).toLocaleString()}</div>
            <div className="text-gray-800">
              <strong>{event.actor}</strong>: {event.action}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

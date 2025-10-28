import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TimelinePanel } from '@/components/TimelinePanel';

interface TimelineEvent {
  timestamp: string;
  actor: string;
  action: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { id } = router.query;
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [actorFilter, setActorFilter] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchTimeline = async () => {
      const res = await fetch(`/api/timeline/${id}${actorFilter ? `?actor=${actorFilter}` : ''}`);
      const data = await res.json();
      setTimeline(data);
    };
    fetchTimeline();
  }, [id, actorFilter]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Supervisor Dashboard</h1>

      <div className="flex gap-2 items-center">
        <label className="text-sm font-medium">Filter by actor:</label>
        <select title='temp'
          className="border rounded px-2 py-1"
          value={actorFilter}
          onChange={e => setActorFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="user">User</option>
          <option value="system">System</option>
        </select>
      </div>

      <TimelinePanel events={timeline} />
    </div>
  );
}

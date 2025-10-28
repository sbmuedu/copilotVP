import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Scenario } from "sharedTypes/dist/scenario"; // adjust path if needed
import { VitalsPanel } from "@/components/VitalsPanel";
import { LabsPanel } from "@/components/LabsPanel";
import { ImagingPanel } from "@/components/ImagingPanel";
import { ChatPanel } from "@/components/ChatPanel";
import { OrderPanel } from '@/components/OrderPanel';

export default function ScenarioPage() {
  const { id } = useRouter().query;
  const [scenario, setScenario] = useState<Scenario | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/scenarios/${id}`).then((res) => {
        setScenario(res.data);
      });
    }
  }, [id]);

  if (!scenario) return <div className="p-4">Loading scenario...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{scenario.title}</h1>
      <p className="text-gray-700">{scenario.description}</p>

      <section>
        <VitalsPanel vitals={scenario.initialVitals} />
      </section>

      <section>
        <LabsPanel labs={scenario.labs} />
      </section>

      <section>
        <ImagingPanel imaging={scenario.imaging} />
      </section>

      <section>
        <h2 className="text-xl font-semibold">Nurse Report</h2>
        <p className="italic">{scenario.nurseReport}</p>
      </section>

      <section>
      <ChatPanel scenarioId={scenario.id} />
      <OrderPanel scenarioId={scenario.id} />
      </section>
    </div>
  );
}

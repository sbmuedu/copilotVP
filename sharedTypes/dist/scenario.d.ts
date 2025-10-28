<<<<<<< HEAD
=======
export interface TimelineEvent {
    timestamp: string;
    actor: string;
    action: string;
}
>>>>>>> 1ac453298dc23ba17ca86fb8abbda600340632fc
export interface Scenario {
    id: string;
    title: string;
    description: string;
    initialVitals: Record<string, number>;
    labs: string[];
    imaging: string[];
    nurseReport: string;
    branchingLogic: Record<string, any>;
<<<<<<< HEAD
=======
    timeline: TimelineEvent[];
>>>>>>> 1ac453298dc23ba17ca86fb8abbda600340632fc
}
//# sourceMappingURL=scenario.d.ts.map
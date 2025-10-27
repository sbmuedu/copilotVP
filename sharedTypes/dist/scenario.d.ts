export interface Scenario {
    id: string;
    title: string;
    description: string;
    initialVitals: Record<string, number>;
    labs: string[];
    imaging: string[];
    nurseReport: string;
    branchingLogic: Record<string, any>;
}
//# sourceMappingURL=scenario.d.ts.map
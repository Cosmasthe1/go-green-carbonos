// Generic frames only. Exact equations ALWAYS come from the selected methodology.
export const emissionReduction = (BE: number, PE: number, LE: number) => BE - PE - LE; // ER = BE - PE - LE
export const netRemoval = (removal: number, projectEmissions: number, leakage: number, deductions: number) =>
  removal - projectEmissions - leakage - deductions;

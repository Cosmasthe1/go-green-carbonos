import { describe, it, expect } from 'vitest';
import { evaluateEligibility } from './index';

describe('evaluateEligibility', () => {
  it('rejects VM0001 for Kenya (US-only)', () => {
    const res = evaluateEligibility(
      { country: 'KE', sector: 'REFRIGERANTS', activity: 'REFRIGERANT_LEAK_DETECTION' },
      [{ methodologyId: 'VM0001', version: '1.2', status: 'ACTIVE', sector: 'REFRIGERANTS', outcome: ['REDUCTION'],
         geography: 'US', activityTypes: ['REFRIGERANT_LEAK_DETECTION'], requiresModules: [], requiresTools: [] }],
    );
    expect(res.status).toBe('NO_DIRECT_METHOD');
    expect(res.candidates[0].eligibility).toBe('REJECTED');
  });
});

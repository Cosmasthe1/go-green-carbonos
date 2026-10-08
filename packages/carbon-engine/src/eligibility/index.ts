import type { EligibilityResult, MethodologyMetadata, ProjectInput } from '../types';

/**
 * Rule 1: never hard-code methodology selection (e.g. tree_planting -> VM0047).
 * Pipeline (spec s34): action -> technology -> sector -> geography -> baseline ->
 * applicability -> status -> additionality -> modules -> tools -> candidates.
 * Rule 3: reject geographically restricted methodologies (e.g. VM0001 is US-only).
 * Rule 7: AI may suggest, but only this engine + human review decides.
 */
export function evaluateEligibility(
  project: ProjectInput,
  registry: MethodologyMetadata[],
): EligibilityResult {
  const candidates = registry
    .filter((m) => m.status.startsWith('ACTIVE'))
    .filter((m) => m.sector === project.sector)
    .filter((m) => m.activityTypes.includes(project.activity))
    .map((m) => {
      const geoOk = m.geography === 'GLOBAL' || m.geography === project.country;
      return {
        methodology: m.methodologyId,
        version: m.version,
        status: m.status,
        eligibility: geoOk ? ('CANDIDATE' as const) : ('REJECTED' as const),
        reason: geoOk ? undefined : `Geographic restriction: ${m.geography}`,
      };
    });

  const viable = candidates.some((c) => c.eligibility === 'CANDIDATE');
  return {
    action: project.activity,
    status: viable ? 'CANDIDATE' : 'NO_DIRECT_METHOD',
    candidates,
    mrvAvailable: true, // Rule 4: MRV is independent of methodology
    carbonCreditEligibility: viable ? 'CANDIDATE' : 'REQUIRES_METHODOLOGY_ASSESSMENT',
  };
}

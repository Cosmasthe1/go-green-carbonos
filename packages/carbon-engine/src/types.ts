export type MethodologyStatus =
  | 'ACTIVE_DIRECT' | 'ACTIVE_FRAMEWORK' | 'ACTIVE_MODULE' | 'ACTIVE_TOOL'
  | 'TRANSITIONING' | 'LEGACY' | 'NO_DIRECT_METHOD' | 'UNDER_DEVELOPMENT' | 'CONCEPT';

export type MethodologyLifecycle =
  | 'PROPOSED' | 'UNDER_DEVELOPMENT' | 'APPROVED' | 'ACTIVE'
  | 'REVISED' | 'TRANSITIONING' | 'INACTIVE' | 'ARCHIVED';

export type ToolRequirement = 'REQUIRED' | 'OPTIONAL' | 'CONDITIONAL' | 'NOT_APPLICABLE';

export interface MethodologyMetadata {
  methodologyId: string;       // e.g. VM0038
  version: string;             // e.g. 1.1  (always store code + version: VM0038:v1.1)
  status: string;
  sector: string;
  outcome: string[];
  geography: string;           // GLOBAL | ISO country code
  activityTypes: string[];
  requiresModules: string[];
  requiresTools: string[];
  effectiveFrom?: string | null;
  inactivationDate?: string | null;
}

export interface ProjectInput {
  country: string;
  sector: string;
  activity: string;
  technology?: string;
  baseline?: string;
  projectType?: string;
  projectStartDate?: string;
  gridConnected?: boolean;
}

export type ApplicabilityStatus = 'PASS' | 'FAIL' | 'PENDING';

export interface ProjectMethodology {
  projectId: string;
  methodologyCode: string;
  methodologyVersion: string;
  status: 'CANDIDATE' | 'SELECTED' | 'ACTIVE' | 'TRANSITIONING' | 'REJECTED';
  modules: string[];
  tools: string[];
  applicabilityStatus: ApplicabilityStatus;
  additionalityStatus: ApplicabilityStatus;
  baselineStatus: 'DEFINED' | 'PENDING';
  lastReviewedAt: Date;
}

export interface EligibilityResult {
  action: string;
  status: MethodologyStatus | 'CANDIDATE';
  candidates: Array<{ methodology: string; version: string; status: string; eligibility: 'CANDIDATE' | 'REJECTED'; reason?: string }>;
  mrvAvailable: boolean;
  carbonCreditEligibility: 'CANDIDATE' | 'REQUIRES_METHODOLOGY_ASSESSMENT' | 'PROJECT_SPECIFIC_ASSESSMENT' | 'NOT_APPLICABLE';
}

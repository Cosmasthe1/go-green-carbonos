# Go Green CarbonOS

> A methodology-aware climate MRV and carbon-accounting operating system that connects real-world climate actions to standardized measurement, methodology eligibility, carbon calculations, evidence and verification workflows.

**Status:** Architecture scaffold · **Spec version:** 1.0 (October 2026) · **Primary standard:** Verra VCS · **Geography:** Kenya / Africa / Global

---

## What CarbonOS is (and is not)

CarbonOS **does not create carbon credits**. It provides the infrastructure to determine whether a climate action can potentially generate a recognized carbon benefit, and whether it can be developed under a Verra VCS methodology.

Environmental Activity ≠ Carbon Reduction ≠ Carbon Removal ≠ Verified Carbon Unit (VCU)

```
Climate Action → Measured Activity → GHG Calculation → MRV Report
   → Validation / Verification → Verified Reduction/Removal → VCS Issuance → VCU
```

A CarbonOS estimate is **not** a Verra-issued credit. A project can be environmentally beneficial without being credit-eligible.

## Core concept: the Methodology Engine

```
Climate Action → Project Type → Sector → Geographic Eligibility → Technology/Practice
  → Applicable Methodology → Modules → Tools → Monitoring Parameters
  → Baseline → Additionality → ER/Removal Calculation → MRV Evidence
  → Verification → Potential Carbon Credit
```

Methodology statuses: `ACTIVE_DIRECT`, `ACTIVE_FRAMEWORK`, `ACTIVE_MODULE`, `ACTIVE_TOOL`, `TRANSITIONING`, `LEGACY`, `NO_DIRECT_METHOD`, `UNDER_DEVELOPMENT`, `CONCEPT`.

## Governance rules (non-negotiable)

1. **Never hard-code** methodology selection (no `tree_planting → VM0047`).
2. **Always evaluate version**: store `VM0038:v1.1`, not `VM0038`.
3. **Check geographic restrictions** (e.g. VM0001 is US-only, so it is rejected for Kenya).
4. **Separate methodology from MRV**: a project can have MRV = yes, methodology = no.
5. **Separate carbon accounting from certification.**
6. **Preserve source evidence** for every result.
7. **AI cannot override methodology rules.** AI recommends; the rules engine and a human decide; a deterministic engine calculates.

## Repository structure

```
go-green-carbonos/
├── apps/
│   ├── web/                 Next.js dashboard (registry, projects, eligibility, MRV)
│   ├── api/                 NestJS REST API (/api/v1)
│   └── worker/              Background jobs (Verra sync, satellite ingestion, reports)
├── packages/
│   ├── carbon-engine/       Versioned rules engine + deterministic calculations
│   │   └── src/{methodologies,modules,tools,eligibility,baselines,additionality,equations,uncertainty}
│   ├── mrv/  gis/  drone/  satellite/  ai/  evidence/  audit/  database/  shared/
├── services/                carbon-calculation, imagery-processing (Python), data-ingestion,
│                            report-generation, notifications
├── data/                    methodology seeds, emission factors, satellite/drone/project data
├── docs/                    architecture, methodologies, mrv, api, specification
└── infrastructure/          docker, kubernetes, terraform
```

### Methodology packages scaffolded

| Code | Domain | Notes |
|---|---|---|
| VM0038 v1.1 | EV charging | Not auto-assigned to electric construction machinery |
| VMR0017 | Grid-connected renewables | Off-grid requires separate assessment |
| VM0042 v2.2 | Agricultural land management | Reductions + SOC removals |
| VM0051 v1.1 | Rice methane | |
| VM0041 v2.0 | Enteric methane | |
| VM0044 v1.2 | Biochar | Removal |
| VM0047 v1.1 | ARR | Removal |
| VM0048 (+VMD0055) | REDD framework | Avoided unplanned deforestation |
| VM0003 / VM0010 | Improved forest management | Routed by baseline (clear-cut vs selective logging) |
| VM0007 | REDD+ framework | Modular |
| VM0049 | CCS framework | Captured ≠ removed ≠ net removal |
| VM0043 v1.1 | CO₂ in concrete | |
| VM0050 | Clean cooking | |
| VMR0016 | Landfill gas | Replaces ACM0001 / AMS-III.G from 2026-12-01 |
| VMR0018 | Wastewater/manure solids separation | AMS-III.Y inactive standalone 2027-07-01 |
| VM0001 v1.2 | Refrigerant leak detection | US only, MRV-only for Kenya |

Legacy/CDM methodologies (ACM0010, AMS-III.D, ACM0014, AMS-III.H, AMS-III.BA, etc.) live in `data/methodologies/legacy-and-transitioning.seed.json`. Actions with no direct mapping (e-waste, electric construction machinery, plastic recycling, etc.) live in `data/methodologies/no-direct-mapping.seed.json` and are treated as **MRV-only**.

> ⚠️ Version numbers and dates were transcribed from the specification. Entries marked `TBD-verify-against-verra` have no version in the spec. Verify everything against the official Verra catalogue before relying on it.

## Tech stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, MapLibre, React Query, Zod
- **Backend:** NestJS, Node.js, TypeScript, Prisma, REST
- **Data:** PostgreSQL + PostGIS + TimescaleDB, S3-compatible object storage
- **Geo/ML processing:** Python, GDAL, Rasterio, GeoPandas, OpenCV, PyTorch
- **Infra:** Docker, Kubernetes, Terraform, GitHub Actions, Prometheus, Grafana

## Getting started

```bash
# prerequisites: Node 20+, pnpm 9+, Docker
cp .env.example .env
pnpm install
pnpm infra:up           # Postgres/Timescale, MinIO, Mosquitto
pnpm db:migrate
pnpm registry:seed      # load methodology registry from data/methodologies
pnpm dev
```

## Registry API

```
GET  /api/v1/methodologies?sector=agriculture
GET  /api/v1/methodologies/VM0042/v2.2
GET  /api/v1/climate-actions/AGRICULTURAL_LAND_MANAGEMENT/methodologies
POST /api/v1/methodologies/eligibility
```

Example eligibility request:

```json
{ "country": "KE", "sector": "AGRICULTURE", "activity": "SOIL_CARBON",
  "technology": "CONSERVATION_AGRICULTURE", "projectType": "CARBON_PROJECT" }
```

## Kenya priority portfolio

- **Tier 1:** EV charging, reforestation, forest conservation, agricultural land management, biochar, clean cooking, renewable energy, landfill methane, livestock methane
- **Tier 2:** rice methane, manure management, wastewater, CO₂ utilization, industrial efficiency
- **Tier 3 (MRV / accounting only, not automatic VCU generation):** e-waste, electric construction equipment, plastic recycling, other circular-economy, emerging engineered removals

## Implementation phases

1. **Methodology registry**: database, versioning, taxonomy, mappings, eligibility rules, source references
2. **Carbon engine**: parameter registry, emission factors, baseline, project emissions, leakage, uncertainty, audit trail
3. **MRV**: IoT, GPS, satellite, drone, field data, evidence, sampling, validation
4. **Project management**: onboarding, methodology selection, monitoring plans, MRV reports, verification workflow
5. **Carbon market**: VCU tracking, issuance, transfers, retirement, marketplace integrations

## Contributing guidance

- Equations must be transcribed from the **official methodology document**, never generated.
- Every calculation must record `methodology_version`, `parameter_source`, `equation_version`, `data_timestamp`, `measurement_source`, `calculation_timestamp`, `operator`, `audit_log`.
- Methodology changes arrive through the update service as `METHODOLOGY_UPDATE_EVENT` and require human review before entering the registry.

## Disclaimer

This repository implements an engineering architecture and methodology-mapping framework, **not a certification decision**. A project must not be declared VCU-eligible solely because an activity appears in the specification. Before registration, evaluate the current VCS Standard, methodology version and applicability, geography, baseline, additionality, boundary, leakage, permanence, uncertainty, monitoring, safeguards, modules, tools, host-country requirements, and validation/verification requirements.

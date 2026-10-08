// Rule 2: Applicable version = code + version + effective date + project start date.
// Always reference methodologies as `VM0038:v1.1`, never by bare code.
export const methodologyKey = (code: string, version: string) => `${code}:v${version}`;

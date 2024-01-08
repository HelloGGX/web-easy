export interface EslintGeneratorSchema {
  name: string;
  preset: Preset;
  tags?: string;
  directory?: string;
  linter?: Linter;
  skipFormat?: boolean;
}

interface NormalizedEslintGeneratorSchema extends EslintGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

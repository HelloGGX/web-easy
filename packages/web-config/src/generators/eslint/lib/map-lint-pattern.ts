export function mapLintPattern(projectRoot: string, extension: string) {
  return `${projectRoot}/src/**/*.${extension}`;
}

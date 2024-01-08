import {
  addDependenciesToPackageJson,
  ensurePackage,
  GeneratorCallback,
  joinPathFragments,
  NX_VERSION,
  Tree,
  updateJson,
} from '@nx/devkit';
import { Linter, lintProjectGenerator } from '@nx/eslint';
import { NormalizedEslintGeneratorSchema } from '../schema';
import { mapLintPattern } from './map-lint-pattern';
import { extendVueEslintJson, extraEslintDependencies } from '../../utils/lint';

export async function addLinter(
  tree: Tree,
  normalizedOptions: NormalizedEslintGeneratorSchema
) {
  const { projectName, projectRoot, linter } = normalizedOptions;

  const tasks: GeneratorCallback[] = [];
  if (!linter || linter === Linter.None) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }
  // 确保了@nx/eslint包被安装
  ensurePackage('@nx/eslint', NX_VERSION);

  const lintTask = await lintProjectGenerator(tree, {
    project: projectName,
    linter: Linter.EsLint,
    skipFormat: true,
    tsConfigPaths: [joinPathFragments(projectRoot, 'tsconfig.json')],
    eslintFilePatterns: [mapLintPattern(projectRoot, '{ts,tsx,js,jsx,vue}')],
  });

  tasks.push(lintTask);

  updateJson(
    tree,
    joinPathFragments(projectRoot, '.eslintrc.json'),
    extendVueEslintJson
  );
  const installTask = await addDependenciesToPackageJson(
    tree,
    extraEslintDependencies.dependencies,
    {
      ...extraEslintDependencies.devDependencies,
    }
  );
  tasks.push(installTask);

  return installTask;
}

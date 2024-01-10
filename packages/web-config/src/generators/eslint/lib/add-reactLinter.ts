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
import { extendReactEslintJson, extraReactEslintDependencies } from '../../utils/lint';

export async function addReactLinter(
  tree: Tree,
  normalizedOptions: NormalizedEslintGeneratorSchema
) {
  const { projectName, projectRoot, linter, skipFormat } = normalizedOptions;

  const tasks: GeneratorCallback[] = [];
  if (!linter || linter === Linter.None) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }

  ensurePackage('@nx/eslint', NX_VERSION);

  const lintTask = await lintProjectGenerator(tree, {
    project: projectName,
    linter: Linter.EsLint,
    skipFormat: skipFormat,
    tsConfigPaths: [joinPathFragments(projectRoot, 'tsconfig.json')],
    eslintFilePatterns: [mapLintPattern(projectRoot, '{ts,tsx,js,jsx,vue}')],
  });

  tasks.push(lintTask);

  /**更新.eslintrc.json */
  updateJson(
    tree,
    joinPathFragments(projectRoot, '.eslintrc.json'),
    extendReactEslintJson
  );

  /**
   * 更新eslint需要的依赖
   */
  const installTask = await addDependenciesToPackageJson(
    tree,
    extraReactEslintDependencies.dependencies,
    {
      ...extraReactEslintDependencies.devDependencies,
    }
  );
  tasks.push(installTask);

  return installTask;
}

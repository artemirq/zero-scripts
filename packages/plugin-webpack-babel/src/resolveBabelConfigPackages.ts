const babelPackages: string[] = [
  '@babel/preset-typescript',
  '@babel/plugin-proposal-decorators',
  '@babel/plugin-transform-flow-strip-types',
  '@babel/preset-env',
  '@babel/plugin-transform-runtime',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties'
];

export function resolveBabelConfigPackages(config: string): string {
  let tempString = config;

  babelPackages.forEach(pkgName => {
    if (tempString.includes(pkgName)) {
      tempString = tempString.replace(new RegExp(pkgName, 'g'), () =>
        require.resolve(pkgName)
      );
    }
  });

  return tempString;
}

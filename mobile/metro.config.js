const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const { resolver: { sourceExts, assetExts } } = await getDefaultConfig();

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'jsx', 'js', 'ts', 'tsx', '.env']
    },
  };
})();

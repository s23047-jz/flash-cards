module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      "nativewind/babel",
      "react-native-reanimated/plugin",
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }],
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
        },
      ],
    ],
  };
};

module.exports = function (api) {
  // Cache the returned value forever and don't call this function again.
  api.cache(true);

  let presets = [];

  let plugins = [];

  // Only applies the following plugin in test mode
  if (process.env.NODE_ENV === "test") {
    presets = [
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-react",
      "@babel/preset-typescript",
    ];
    plugins = [
      [
        "@babel/plugin-transform-react-jsx",
        {
          runtime: "automatic", // This will auto-import the necessary 'react/jsx-runtime'
        },
      ],
    ];
  }

  return { presets, plugins };
};

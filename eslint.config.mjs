// eslint-config-next v16 ships native flat config, so FlatCompat is no longer needed.
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "public/r/**"] },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;

import type { Config } from "@jest/types";
const config = async (): Promise<Config.InitialOptions> => {
  return {
    preset: "ts-jest",

    transform: {
      "^.+\\.{ts|tsx}?$": [
        "ts-jest",
        {
          babel: true,
          tsConfig: "tsconfig.json",
        },
      ],
    },

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // A list of paths to modules that run some code to configure or set up the testing framework before each test
    // setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],

    moduleNameMapper: {
      "@/(.*)": "<rootDir>/$1",
    },
  };
};

export default config;

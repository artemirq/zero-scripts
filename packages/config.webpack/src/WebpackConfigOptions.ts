export type WebpackConfigOptions = {
  isDev: boolean;
  additionalEntry: string[];
  moduleFileExtensions: string[];
  jsFileExtensions: string[];
  useSourceMap: boolean;
  useTypescript: boolean;
  paths: {
    root: string;
    src: string;
    build: string;
    indexJs: string;
    indexHtml: string;
    public: string;
    tsConfig: string;
  };
};

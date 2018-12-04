export type Settings = {
  theme: 'dark' | 'light';
};

type Methods = {
  updateSettings: (settings: Partial<Settings>) => void;
};

export type SettingsWithMethods = Settings & Methods;

export type Settings = {
  theme: 'dark' | 'light';
  episodeRowLayout: EpisodeRowLayout;
};

export type EpisodeRowLayout = 'default' | 'compact';

type Methods = {
  updateSettings: (settings: Partial<Settings>) => void;
};

export type SettingsWithMethods = Settings & Methods;

export type Settings = {
  theme: 'dark' | 'light';
  episodeRowLayout: EpisodeRowLayout;
  navLayout: NavLayout;
};

export type EpisodeRowLayout = 'default' | 'compact';
export type NavLayout = 'side' | 'bottom';

type Methods = {
  updateSettings: (settings: Partial<Settings>) => void;
};

export type SettingsWithMethods = Settings & Methods;

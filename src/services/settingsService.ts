import { Settings } from '../models/Settings';

const defaultSettings: Settings = {
  theme: 'dark',
  episodeRowLayout: 'default',
  navLayout: 'bottom',
};

export class SettingsService {
  getSettings(): Settings {
    const settings = JSON.parse(localStorage.getItem('settings') as string) as Settings;
    return Object.assign({}, defaultSettings, settings);
  }

  setSettings(settings: Settings) {
    if (!settings) return;

    localStorage.setItem('settings', JSON.stringify(settings));
  }
}

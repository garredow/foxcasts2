import { Settings } from '../models/Settings';

const defaultSettings = {
  theme: 'dark',
};

export class SettingsService {
  getSettings(): Settings {
    const settings = JSON.parse(localStorage.getItem('settings') as string) as Settings;
    return settings || defaultSettings;
  }

  setSettings(settings: Settings) {
    if (!settings) return;

    localStorage.setItem('settings', JSON.stringify(settings));
  }
}

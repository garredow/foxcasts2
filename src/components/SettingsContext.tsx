import React from 'react';
import { SettingsWithMethods } from '../models/Settings';

const SettingsContext = React.createContext<SettingsWithMethods>({} as SettingsWithMethods);

export default SettingsContext;

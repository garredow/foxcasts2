import React from 'react';
import { AppContextProps } from '../models';

const AppContext = React.createContext<AppContextProps>({} as any);

export default AppContext;

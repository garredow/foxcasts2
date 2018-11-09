import { EpisodeExtended } from '.';

export interface AppContextProps {
  setAppTitle: (title: string) => void;
  setActiveEpisode: (episode: EpisodeExtended) => void;
}

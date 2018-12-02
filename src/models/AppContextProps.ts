import { EpisodeExtended } from '.';

export type AppContextProps = {
  setAppTitle: (title: string) => void;
  setActiveEpisode: (episode: EpisodeExtended) => void;
};

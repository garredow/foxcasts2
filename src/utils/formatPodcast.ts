import { ITunesPodcast, Podcast } from '../models';

const formatPodcast = (rawPodcast: ITunesPodcast): Podcast => {
  const podcast: Podcast = {
    id: rawPodcast.collectionId,
    authorId: rawPodcast.artistId,
    title: rawPodcast.collectionName,
    author: rawPodcast.artistName,
    cover: {
      30: rawPodcast.artworkUrl30,
      60: rawPodcast.artworkUrl60,
      100: rawPodcast.artworkUrl100,
      600: rawPodcast.artworkUrl600,
    },
    summary: rawPodcast.summary,
    description: rawPodcast.description,
    feedUrl: rawPodcast.feedUrl,
  };

  return podcast;
};

export default formatPodcast;

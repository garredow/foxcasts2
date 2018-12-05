import Dexie from 'dexie';
import { Podcast, Episode, EpisodeExtended } from '../models';

class DatabaseService {
  db: Dexie;

  constructor() {
    this.db = new Dexie('foxcasts');
    this.db.version(1).stores({
      podcasts: '++id, authorId, podcastId',
      episodes: '++id, authorId, podcastId, date, progress',
    });
  }

  async addPodcast(podcast: Podcast, episodes: Episode[]): Promise<void> {
    const existingSubscription = await this.getPodcastById(podcast.id);
    if (existingSubscription) {
      console.log(`Already subscribed to ${podcast.title}. (ID: ${existingSubscription.id}`);
      return;
    }

    await this.db.transaction(
      'rw',
      this.db.table('podcasts'),
      this.db.table('episodes'),
      async () => {
        await this.db.table('podcasts').add(podcast);
        await this.db.table('episodes').bulkAdd(episodes);
      }
    );
  }

  async deletePodcast(podcastId: number): Promise<void> {
    if (typeof podcastId === 'string') {
      podcastId = parseInt(podcastId, 10);
    }

    await this.db.transaction(
      'rw',
      this.db.table('podcasts'),
      this.db.table('episodes'),
      async () => {
        const episodes = await this.db
          .table('episodes')
          .where({ podcastId })
          .toArray();
        const episodeIds = episodes.map(episode => episode.id);

        await this.db.table('podcasts').delete(podcastId);
        await this.db.table('episodes').bulkDelete(episodeIds);
      }
    );
  }

  async getPodcastById(podcastId: number, includeEpisodes = false): Promise<Podcast> {
    if (typeof podcastId === 'string') {
      podcastId = parseInt(podcastId, 10);
    }

    const podcast: Podcast = await this.db.table('podcasts').get({ id: podcastId });

    if (podcast && includeEpisodes) {
      const episodes: Episode[] = await this.db
        .table('episodes')
        .where({ podcastId })
        // .sortBy('date')
        .toArray();
      podcast.episodes = episodes;
    }

    return podcast;
  }

  async getPodcasts(): Promise<Podcast[]> {
    const podcasts: Podcast[] = await this.db.table('podcasts').toArray();
    return podcasts;
  }

  async getPlaylist(playlist: string): Promise<EpisodeExtended[]> {
    const podcastCovers = await this.getPodcasts().then(podcasts => {
      return podcasts.reduce((coverMap: any, podcast) => {
        coverMap[podcast.id] = podcast.cover;
        return coverMap;
      }, {});
    });

    let episodes = [];

    switch (playlist) {
      case 'recent':
        episodes = await this.db
          .table('episodes')
          .orderBy('date')
          .reverse()
          .limit(20)
          .toArray();
        break;
      case 'inProgress':
        episodes = await this.db
          .table('episodes')
          .where('progress')
          .above(0)
          .reverse()
          .sortBy('date')
          .then(results => results.filter(e => e.progress < e.duration));
        break;
      default:
        break;
    }

    const result = episodes.map(episode => ({
      ...episode,
      cover: podcastCovers[episode.podcastId],
    }));

    return result;
  }

  async updateEpisode(episodeId: number, changes: any): Promise<Episode> {
    const updatedEpisode: Episode = (await this.db
      .table('episodes')
      .update(episodeId, changes)) as any; // TODO: update() returns number?
    return updatedEpisode;
  }
}

export default DatabaseService;

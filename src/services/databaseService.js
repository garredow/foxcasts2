import Dexie from 'dexie';

class DatabaseService {
  constructor() {
    this.db = new Dexie('foxcasts');
    this.db.version(1).stores({
      podcasts: '++id, authorId, podcastId',
      episodes: '++id, authorId, podcastId',
    });
  }

  async addPodcast(podcast, episodes) {
    const existingSubscription = await this.getPodcastById(podcast.id);
    if (existingSubscription) {
      console.log(`Already subscribed to ${podcast.title}. (ID: ${existingSubscription.id}`);
      return;
    }

    await this.db.transaction('rw', this.db.podcasts, this.db.episodes, async () => {
      await this.db.table('podcasts').add(podcast);
      await this.db.table('episodes').bulkAdd(episodes);
    });
  }

  async deletePodcast(podcastId) {
    if (typeof podcastId === 'string') {
      podcastId = parseInt(podcastId, 10);
    }

    await this.db.transaction('rw', this.db.podcasts, this.db.episodes, async () => {
      const episodes = await this.db.episodes.where({ podcastId }).toArray();
      const episodeIds = episodes.map(episode => episode.id);

      await this.db.podcasts.delete(podcastId);
      await this.db.episodes.bulkDelete(episodeIds);
    });
  }

  async getPodcastById(podcastId, includeEpisodes) {
    if (typeof podcastId === 'string') {
      podcastId = parseInt(podcastId, 10);
    }

    const podcast = await this.db.podcasts.get({ id: podcastId });

    if (podcast && includeEpisodes) {
      const episodes = await this.db.episodes
        .where({ podcastId })
        // .sortBy('date')
        .toArray();
      podcast.episodes = episodes;
    }

    return podcast;
  }

  async getPodcasts() {
    const podcasts = await this.db.table('podcasts').toArray();
    return podcasts;
  }

  async getPlaylist(playlist) {
    return [];
  }
}

export default DatabaseService;

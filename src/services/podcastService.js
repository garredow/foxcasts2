import ApiService from './apiService';
import DatabaseService from './databaseService';

const apiService = new ApiService();
const databaseService = new DatabaseService();

class PodcastService {
  async subscribe(podcastId) {
    try {
      const podcast = await apiService.getPodcastById(podcastId);
      const episodes = await apiService.getEpisodes(podcast.feedUrl).then(results => {
        return results.map(episode => ({
          ...episode,
          authorId: podcast.authorId,
          podcastId: podcast.id,
        }));
      });

      await databaseService.addPodcast(podcast, episodes);
    } catch (err) {
      console.error('Error subscribing', err);
      throw new Error('Failed to subscribe to podcast.');
    }
  }

  async unsubscribe(podcastId) {
    try {
      await databaseService.deletePodcast(podcastId);
    } catch (err) {
      console.error('Error unsubscribing', err);
      throw new Error('Failed to unsubscribe from podcast.');
    }
  }

  async getSubscriptions() {
    const podcasts = databaseService.getPodcasts();
    return podcasts;
  }

  async getPodcastById(id, includeEpisodes) {
    const podcast = await databaseService.getPodcastById(id, includeEpisodes);
    return podcast;
  }
}

export default PodcastService;

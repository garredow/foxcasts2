import ApiService from './apiService';
import DatabaseService from './databaseService';
import { Episode, Podcast } from '../models';

const apiService = new ApiService();
const databaseService = new DatabaseService();

class PodcastService {
  async subscribe(podcastId: number): Promise<void> {
    try {
      const podcast = await apiService.getPodcastById(podcastId);
      const episodes = await apiService.getEpisodes(podcast.feedUrl).then(results => {
        return results.map(
          episode =>
            ({
              ...episode,
              authorId: podcast.authorId,
              author: episode.author || podcast.author,
              podcastId: podcast.id,
            } as Episode)
        );
      });

      await databaseService.addPodcast(podcast, episodes);
    } catch (err) {
      console.error('Error subscribing', err);
      throw new Error('Failed to subscribe to podcast.');
    }
  }

  async unsubscribe(podcastId: number): Promise<void> {
    try {
      await databaseService.deletePodcast(podcastId);
    } catch (err) {
      console.error('Error unsubscribing', err);
      throw new Error('Failed to unsubscribe from podcast.');
    }
  }

  async getSubscriptions(): Promise<Podcast[]> {
    const podcasts = databaseService.getPodcasts();
    return podcasts;
  }

  async getPodcastById(id: number, includeEpisodes: boolean = false): Promise<Podcast> {
    const podcast = await databaseService.getPodcastById(id, includeEpisodes);
    return podcast;
  }

  async updateEpisode(episodeId: number, changes: any): Promise<void> {
    try {
      const updatedEpisode = await databaseService.updateEpisode(episodeId, changes);
    } catch (err) {
      console.error(`Error updating episode ${episodeId}`, err);
    }
  }
}

export default PodcastService;

import axios from 'axios';
import formatPodcast from '../utils/formatPodcast';
import { Episode, ITunesPodcast, Podcast } from '../models';

const getDurationInSeconds = (duration: string) => {
  if (typeof duration === 'number') return duration;

  if (!duration.includes(':')) {
    return parseInt(duration, 10);
  }

  const parts = duration.split(':').reverse();

  let seconds = parseInt(parts[0], 10);
  seconds += parts[1] ? parseInt(parts[1], 10) * 60 : 0;
  seconds += parts[2] ? parseInt(parts[2], 10) * 60 * 60 : 0;

  return seconds;
};

const parseXmlEpisodes = (xmlString: string): Episode[] => {
  const xml = new DOMParser().parseFromString(xmlString, 'text/xml');

  const recentEpisodes = Array.from(xml.getElementsByTagName('item')).slice(0, 30); // TODO: Remove temporary limit?

  const episodes: Episode[] = [];

  recentEpisodes.forEach(rawEpisode => {
    const authorNode =
      rawEpisode.getElementsByTagName('itunes:author')[0] ||
      rawEpisode.getElementsByTagName('author')[0];
    const descriptionNode =
      rawEpisode.getElementsByTagName('itunes:description')[0] ||
      rawEpisode.getElementsByTagName('description')[0];
    const titleNode =
      rawEpisode.getElementsByTagName('itunes:title')[0] ||
      rawEpisode.getElementsByTagName('title')[0];
    const subTitleNode =
      rawEpisode.getElementsByTagName('itunes:subtitle')[0] ||
      rawEpisode.getElementsByTagName('subtitle')[0];
    const durationNode =
      rawEpisode.getElementsByTagName('itunes:duration')[0] ||
      rawEpisode.getElementsByTagName('duration')[0];

    try {
      const episode = {
        duration: durationNode && getDurationInSeconds(durationNode.textContent as string),
        progress: 0,
        guid: rawEpisode.getElementsByTagName('guid')[0].textContent,
        date: new Date(rawEpisode.getElementsByTagName('pubDate')[0]
          .textContent as string).toISOString(),
        author: authorNode && authorNode.textContent,
        title: titleNode && titleNode.textContent,
        subTitle: subTitleNode && subTitleNode.textContent,
        description: descriptionNode && descriptionNode.textContent,
        fileSize: parseInt(
          rawEpisode.getElementsByTagName('enclosure')[0].getAttribute('length') as string,
          10
        ),
        type: rawEpisode.getElementsByTagName('enclosure')[0].getAttribute('type'),
        fileUrl: rawEpisode.getElementsByTagName('enclosure')[0].getAttribute('url'),
      } as Episode;

      episodes.push(episode);
    } catch (err) {
      console.log('Error parsing episode', err, rawEpisode);
    }
  });

  return episodes;
};

class ApiService {
  async search(query: string) {
    const url = `https://itunes.apple.com/search?media=podcast&term=${query}`;
    const results = await axios
      .get(`https://proxy.garredow.co/cors/${encodeURIComponent(url)}`)
      .then(res => res.data.results) // TODO: Use formatPodcast
      .catch(err => {
        console.log('Failed to search', err);
        throw new Error('Failed to search iTunes catalog.');
      });

    return results;
  }

  async getEpisodes(feedUrl: string): Promise<Episode[]> {
    const result = await axios
      .get(`https://proxy.garredow.co/cors/${encodeURIComponent(feedUrl)}`)
      .then(res => res.data)
      .catch(err => {
        console.error('Failed to get episodes', err);
        throw new Error('Failed to get episodes for podcast.');
      });

    try {
      const episodes = parseXmlEpisodes(result);
      return episodes;
    } catch (err) {
      console.error('Failed to parse episodes', err);
      throw new Error('Failed to get episodes for podcast.');
    }
  }

  async getPodcastById(podcastId: number): Promise<Podcast> {
    const url = `https://itunes.apple.com/lookup?id=${podcastId}`;
    const result = await axios
      .get(`https://proxy.garredow.co/cors/${encodeURIComponent(url)}`)
      .then(res => formatPodcast(res.data.results[0]))
      .catch(err => {
        console.log('Failed to get podcast', err);
        throw new Error('Failed to get podcast detail from iTunes.');
      });

    return result;
  }
}

export default ApiService;

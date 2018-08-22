import axios from 'axios';
import formatPodcast from '../utils/formatPodcast';

const getDurationInSeconds = duration => {
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

const parseXmlEpisodes = xmlString => {
  const xml = new DOMParser().parseFromString(xmlString, 'text/xml');

  const recentEpisodes = Array.from(xml.getElementsByTagName('item')).slice(0, 30); // TODO: Remove temporary limit?
  const episodes = recentEpisodes.map(episode => {
    const authorNode =
      episode.getElementsByTagName('itunes:author')[0] || episode.getElementsByTagName('author')[0];
    const descriptionNode =
      episode.getElementsByTagName('itunes:description')[0] ||
      episode.getElementsByTagName('description')[0];
    const titleNode =
      episode.getElementsByTagName('itunes:title')[0] || episode.getElementsByTagName('title')[0];
    const subTitleNode =
      episode.getElementsByTagName('itunes:subtitle')[0] ||
      episode.getElementsByTagName('subtitle')[0];
    const durationNode =
      episode.getElementsByTagName('itunes:duration')[0] ||
      episode.getElementsByTagName('duration')[0];

    try {
      const result = {
        duration: durationNode && getDurationInSeconds(durationNode.textContent),
        guid: episode.getElementsByTagName('guid')[0].textContent,
        date: new Date(episode.getElementsByTagName('pubDate')[0].textContent).toISOString(),
        author: authorNode && authorNode.textContent,
        title: titleNode && titleNode.textContent,
        subTitle: subTitleNode && subTitleNode.textContent,
        description: descriptionNode && descriptionNode.textContent,
        fileSize: parseInt(episode.getElementsByTagName('enclosure')[0].getAttribute('length'), 10),
        type: episode.getElementsByTagName('enclosure')[0].getAttribute('type'),
        fileUrl: episode.getElementsByTagName('enclosure')[0].getAttribute('url'),
      };
      return result;
    } catch (err) {
      console.log('Error parsing episode', err, episode);
      return null;
    }
  });
  return episodes;
};

class ApiService {
  async search(query) {
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

  async getEpisodes(feedUrl) {
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

  async getPodcastById(podcastId) {
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

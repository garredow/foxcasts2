import fetch from 'node-fetch';

import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  try {
    const url = event.queryStringParameters.feedUrl;
    if (!url.includes('feed') && !url.includes('rss')) {
      console.log(`Probably not a valid RSS feed: ${url}`);
      return {
        statusCode: 400,
      };
    }
    const response = await fetch(url, {
      headers: { Accept: 'application/rss+xml' },
    });
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.text();

    return {
      statusCode: 200,
      body: data,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

export { handler };

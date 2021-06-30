import fetch from 'node-fetch';

import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  try {
    const url = `https://itunes.apple.com/search?media=podcast&term=${event.queryStringParameters.q}`;
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
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

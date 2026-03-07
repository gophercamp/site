import { purgeCache } from '@netlify/functions';

const handler = async () => {
  console.log('Purging everything');

  await purgeCache();

  return new Response('Purged!', { status: 202 });
};

export default handler;

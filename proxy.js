export default async function handler(req, res) {
  const TARGET_API = "http://ver3.yacinelive.com";
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { path, stream } = req.query;

  try {
    let fetchUrl = `${TARGET_API}/api/categories`;
    
    if (path === 'categories') {
      fetchUrl = `${TARGET_API}/api/categories`;
    } else if (req.url.includes('/category/')) {
      const parts = req.url.split('/');
      const catId = parts[parts.length - 1];
      fetchUrl = `${TARGET_API}/api/getChannelsByCategory/${catId}`;
    } else if (stream) {
      const streamRes = await fetch(stream, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10)' }
      });
      const streamData = await streamRes.text();
      return res.status(200).send(streamData);
    }

    const apiRes = await fetch(fetchUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10)' }
    });
    const data = await apiRes.text();

    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
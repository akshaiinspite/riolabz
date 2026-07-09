const https = require('https');

const urls = [
  'https://xalt-backend-zi62.onrender.com/uploads/studio_workspace.png',
  'https://xalt-backend-zi62.onrender.com/uploads/design_artists.png',
  'https://xalt-backend-zi62.onrender.com/uploads/studio_floor_vfx.png',
  'https://xalt-backend-zi62.onrender.com/uploads/studio_floor_audio.png'
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`${url} -> Status: ${res.statusCode}, Content-Type: ${res.headers['content-type']}`);
  }).on('error', (e) => {
    console.error(`Error for ${url}:`, e.message);
  });
});

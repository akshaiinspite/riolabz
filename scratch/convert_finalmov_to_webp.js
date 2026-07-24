const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const backendRequire = createRequire(path.join(__dirname, '..', 'backend', 'server.js'));
const sharp = backendRequire('sharp');

const finalmovDir = path.join(__dirname, '..', 'frontend', 'public', 'finalmov');

async function convertFrames() {
  const files = fs.readdirSync(finalmovDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} PNG frames in finalmov.`);

  let convertedCount = 0;
  for (const file of files) {
    const pngPath = path.join(finalmovDir, file);
    const webpPath = path.join(finalmovDir, file.replace(/\.png$/i, '.webp'));

    if (!fs.existsSync(webpPath)) {
      await sharp(pngPath)
        .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(webpPath);
      convertedCount++;
    }
  }

  console.log(`Successfully converted ${convertedCount} frames to WebP.`);
}

convertFrames().catch(err => {
  console.error('Error converting frames:', err);
});

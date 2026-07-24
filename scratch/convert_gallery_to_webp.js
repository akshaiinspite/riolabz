const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const backendRequire = createRequire(path.join(__dirname, '..', 'backend', 'server.js'));
const sharp = backendRequire('sharp');

const galleryDir = path.join(__dirname, '..', 'frontend', 'src', 'assets', 'images', 'image-galley');

async function convertGallery() {
  const files = fs.readdirSync(galleryDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  for (const file of files) {
    const inputPath = path.join(galleryDir, file);
    const webpPath = path.join(galleryDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    await sharp(inputPath)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(webpPath);
    console.log(`Converted ${file} -> ${path.basename(webpPath)}`);
  }
}

convertGallery().catch(console.error);

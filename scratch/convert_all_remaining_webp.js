const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const backendRequire = createRequire(path.join(__dirname, '..', 'backend', 'server.js'));
const sharp = backendRequire('sharp');

const dirsToScan = [
  path.join(__dirname, '..', 'frontend', 'public', 'uploads'),
  path.join(__dirname, '..', 'frontend', 'src', 'assets', 'images', 'about'),
  path.join(__dirname, '..', 'frontend', 'src', 'assets', 'images', 'cta'),
  path.join(__dirname, '..', 'frontend', 'src', 'assets', 'images', 'hero'),
  path.join(__dirname, '..', 'frontend', 'src', 'assets', 'images', 'our-story'),
  path.join(__dirname, '..', 'frontend', 'src', 'assets', 'images', 'projects'),
];

async function scanAndConvert() {
  let count = 0;
  for (const dir of dirsToScan) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.endsWith('.png') || file.endsWith('.jpeg') || file.endsWith('.jpg')) {
        const inputPath = path.join(dir, file);
        const webpPath = path.join(dir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

        if (!fs.existsSync(webpPath)) {
          await sharp(inputPath)
            .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 82 })
            .toFile(webpPath);
          console.log(`Converted: ${file} -> ${path.basename(webpPath)}`);
          count++;
        }
      }
    }
  }
  console.log(`Total new WebP assets created: ${count}`);
}

scanAndConvert().catch(console.error);

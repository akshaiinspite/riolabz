import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ffmpegPath = require(path.join(process.cwd(), 'backend', 'node_modules', '@ffmpeg-installer', 'ffmpeg'));
const sharp = require(path.join(process.cwd(), 'backend', 'node_modules', 'sharp'));

const ffmpegBinary = ffmpegPath.path;
const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'frontend', 'public');
const finalmovDir = path.join(publicDir, 'finalmov');
const videoOutputDir = path.join(publicDir, 'video');
const uploadsDir = path.join(publicDir, 'uploads');

if (!fs.existsSync(videoOutputDir)) {
  fs.mkdirSync(videoOutputDir, { recursive: true });
}

console.log('--- STEP 1: CONVERTING PNG SEQUENCE TO MP4 & WEBM ---');
const mp4Output = path.join(videoOutputDir, 'hero-sequence.mp4');
const webmOutput = path.join(videoOutputDir, 'hero-sequence.webm');

const inputPattern = path.join(finalmovDir, 'finalmov_%05d.png');

console.log('Generating H.264 MP4...');
try {
  const mp4Cmd = `"${ffmpegBinary}" -y -framerate 24 -i "${inputPattern}" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p "${mp4Output}"`;
  execSync(mp4Cmd, { stdio: 'inherit' });
  console.log(`MP4 created successfully: ${fs.statSync(mp4Output).size} bytes`);
} catch (e) {
  console.error('MP4 generation error:', e);
}

console.log('Generating VP9 WebM...');
try {
  const webmCmd = `"${ffmpegBinary}" -y -framerate 24 -i "${inputPattern}" -c:v libvpx-vp9 -crf 32 -b:v 0 "${webmOutput}"`;
  execSync(webmCmd, { stdio: 'inherit' });
  console.log(`WebM created successfully: ${fs.statSync(webmOutput).size} bytes`);
} catch (e) {
  console.error('WebM generation error:', e);
}

console.log('--- STEP 2: RESIZING AND COMPRESSING OVERSIZED LOGO ---');
const logoPath = path.join(uploadsDir, 'XALT LOGO - VERT (1).png');
const logoWebpOutput = path.join(uploadsDir, 'xalt-logo-vert-240.webp');
const logoPngOutput = path.join(uploadsDir, 'xalt-logo-vert-240.png');

if (fs.existsSync(logoPath)) {
  await sharp(logoPath)
    .resize(240, 240, { fit: 'inside' })
    .webp({ quality: 85 })
    .toFile(logoWebpOutput);
  console.log(`Resized Logo WebP created: ${fs.statSync(logoWebpOutput).size} bytes`);

  await sharp(logoPath)
    .resize(240, 240, { fit: 'inside' })
    .png({ compressionLevel: 9 })
    .toFile(logoPngOutput);
  console.log(`Resized Logo PNG created: ${fs.statSync(logoPngOutput).size} bytes`);
}

console.log('--- STEP 3: COMPRESSING UPLOADS MEDIA LIBRARY ---');
const files = fs.readdirSync(uploadsDir);
for (const file of files) {
  const filePath = path.join(uploadsDir, file);
  const stat = fs.statSync(filePath);
  if (!stat.isFile()) continue;

  const ext = path.extname(file).toLowerCase();
  const baseName = path.basename(file, ext);

  // Skip already generated -240 variants
  if (file.includes('-240.') || file.endsWith('.webp')) continue;

  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    const webpPath = path.join(uploadsDir, `${baseName}.webp`);
    try {
      // Create WebP variant if size > 100KB or missing
      if (stat.size > 100 * 1024 && !fs.existsSync(webpPath)) {
        await sharp(filePath)
          .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 78 })
          .toFile(webpPath);
        console.log(`Compressed ${file} (${(stat.size / 1024).toFixed(0)}KB) -> ${baseName}.webp (${(fs.statSync(webpPath).size / 1024).toFixed(0)}KB)`);
      }
    } catch (err) {
      console.warn(`Could not process ${file}:`, err.message);
    }
  }
}

console.log('--- MEDIA PROCESSING COMPLETE ---');

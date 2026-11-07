// Converts site photos to compressed WebP next to the source file.
// Run after adding or replacing an image: `node scripts/optimize-images.mjs`
import sharp from 'sharp';
import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, extname } from 'path';

const MAX_WIDTH = 1600;
const dirs = ['public/images', 'public/images/goa', 'src/components/images'];
const skip = /EDITABLE/;
const sizes = {};

for (const dir of dirs) {
    for (const name of readdirSync(dir)) {
        const src = join(dir, name);
        if (statSync(src).isDirectory() || skip.test(name) || !['.jpg', '.jpeg', '.png'].includes(extname(name).toLowerCase())) continue;
        const out = src.replace(/\.(jpe?g|png)$/i, '.webp');
        const info = await sharp(src)
            .resize({ width: MAX_WIDTH, withoutEnlargement: true })
            .webp({ quality: 72 })
            .toFile(out);
        if (out.startsWith('public/')) sizes[out.slice('public'.length)] = [info.width, info.height];
        console.log(`${out}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB  (was ${Math.round(statSync(src).size / 1024)} KB)`);
    }
}

// Width/height for every public WebP, so <img> tags can reserve space (no layout shift).
writeFileSync('src/data/imageSizes.json', JSON.stringify(sizes, null, 2) + '\n');
console.log('wrote src/data/imageSizes.json');

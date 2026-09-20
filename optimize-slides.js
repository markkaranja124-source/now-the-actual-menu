const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_DIR = __dirname;
const SLIDES_DIR = path.join(ROOT_DIR, 'slides');

if (!fs.existsSync(SLIDES_DIR)) {
    fs.mkdirSync(SLIDES_DIR, { recursive: true });
}

// 11 high-res camera photos
const DSC_FILES = [
    'DSC_3034.JPG',
    'DSC_3049.JPG',
    'DSC_3063.JPG',
    'DSC_3077.JPG',
    'DSC_3088.JPG',
    'DSC_3098.JPG',
    'DSC_3100.JPG',
    'DSC_3101.JPG',
    'DSC_3114.JPG',
    'DSC_3136.JPG',
    'DSC_3171.JPG',
    'DSC_3201.JPG'
];

async function processSlides() {
    console.log('🚀 Starting conversion of camera photos into optimized WebP slides...');
    let totalOriginalBytes = 0;
    let totalWebpBytes = 0;
    const slideManifest = [];

    for (let i = 0; i < DSC_FILES.length; i++) {
        const filename = DSC_FILES[i];
        const inputPath = path.join(ROOT_DIR, filename);

        if (!fs.existsSync(inputPath)) {
            console.warn(`⚠️ Warning: File ${filename} does not exist. Skipping.`);
            continue;
        }

        const stats = fs.statSync(inputPath);
        totalOriginalBytes += stats.size;

        const slideIndex = i + 1;
        const outputFilename = `slide-${slideIndex}.webp`;
        const outputPath = path.join(SLIDES_DIR, outputFilename);

        console.log(`📸 [${slideIndex}/${DSC_FILES.length}] Processing ${filename} -> slides/${outputFilename}...`);

        // Resize to 1920px max width while preserving aspect ratio, quality 85% WebP
        await sharp(inputPath)
            .rotate() // auto-orient based on EXIF
            .resize({
                width: 1920,
                height: 1280,
                fit: 'cover',
                position: 'center',
                withoutEnlargement: true
            })
            .webp({ quality: 85, effort: 5 })
            .toFile(outputPath);

        const outStats = fs.statSync(outputPath);
        totalWebpBytes += outStats.size;

        console.log(`   ✅ Original: ${(stats.size / 1024 / 1024).toFixed(2)} MB  -->  WebP: ${(outStats.size / 1024).toFixed(1)} KB`);

        slideManifest.push({
            index: slideIndex,
            original: filename,
            file: `slides/${outputFilename}`,
            sizeKB: (outStats.size / 1024).toFixed(1)
        });
    }

    // Save manifest JSON for reference
    fs.writeFileSync(path.join(SLIDES_DIR, 'manifest.json'), JSON.stringify(slideManifest, null, 2), 'utf-8');

    console.log('\n🎉 ALL PHOTOS SUCCESSFULLY CONVERTED TO WEBP!');
    console.log(`📦 Original Total Size: ${(totalOriginalBytes / 1024 / 1024).toFixed(2)} MB`);
    console.log(`⚡ Optimized WebP Size: ${(totalWebpBytes / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📉 Bandwidth Saved: ${(((totalOriginalBytes - totalWebpBytes) / totalOriginalBytes) * 100).toFixed(1)}%`);
}

processSlides().catch(err => {
    console.error('❌ Error processing slides:', err);
    process.exit(1);
});

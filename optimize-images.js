const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeHeavyImages() {
    const dir = __dirname;
    const files = fs.readdirSync(dir);
    let totalSavedBytes = 0;
    let optimizedCount = 0;

    console.log('--- Starting Heavy Image Optimization ---');

    for (const file of files) {
        if (!file.endsWith('.webp')) continue;
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        
        // Optimize if file size is > 100 KB
        if (stats.size > 100 * 1024) {
            try {
                const originalSize = stats.size;
                const buffer = fs.readFileSync(filePath);
                
                // Use sharp to resize & re-encode
                const optimizedBuffer = await sharp(buffer)
                    .resize({
                        width: 700,
                        height: 700,
                        fit: 'inside',
                        withoutEnlargement: true
                    })
                    .webp({
                        quality: 80,
                        effort: 4,
                        alphaQuality: 85
                    })
                    .toBuffer();

                if (optimizedBuffer.length < originalSize) {
                    fs.writeFileSync(filePath, optimizedBuffer);
                    const saved = originalSize - optimizedBuffer.length;
                    totalSavedBytes += saved;
                    optimizedCount++;
                    console.log(`✓ ${file}: ${(originalSize / 1024).toFixed(1)} KB -> ${(optimizedBuffer.length / 1024).toFixed(1)} KB (Saved ${(saved / 1024).toFixed(1)} KB)`);
                } else {
                    console.log(`- ${file}: Already optimal (${(originalSize / 1024).toFixed(1)} KB)`);
                }
            } catch (err) {
                console.error(`❌ Error optimizing ${file}:`, err.message);
            }
        }
    }

    console.log(`\n🎉 Optimization Complete!`);
    console.log(`Images optimized: ${optimizedCount}`);
    console.log(`Total data saved: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB`);
}

optimizeHeavyImages();

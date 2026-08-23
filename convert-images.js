const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_DIR = __dirname;
const VALID_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const EXCLUDED_DIRS = ['node_modules', '.git'];

function getAllImageFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!EXCLUDED_DIRS.includes(file)) {
                arrayOfFiles = getAllImageFiles(fullPath, arrayOfFiles);
            }
        } else {
            const ext = path.extname(file).toLowerCase();
            if (VALID_EXTENSIONS.includes(ext)) {
                arrayOfFiles.push(fullPath);
            }
        }
    });

    return arrayOfFiles;
}

async function convertAllImagesToWebp() {
    console.log('🖼️  Recursively scanning project for all PNG, JPG & JPEG images...');
    
    try {
        const imagePaths = getAllImageFiles(ROOT_DIR);
        let convertedCount = 0;

        for (const inputPath of imagePaths) {
            const dir = path.dirname(inputPath);
            const ext = path.extname(inputPath);
            const baseName = path.basename(inputPath, ext);
            const webpFileName = `${baseName}.webp`;
            const outputPath = path.join(dir, webpFileName);

            const relativeInput = path.relative(ROOT_DIR, inputPath);
            const relativeOutput = path.relative(ROOT_DIR, outputPath);

            console.log(`⏳ Converting ${relativeInput} -> ${relativeOutput}...`);
            await sharp(inputPath)
                .webp({ quality: 82, effort: 4 })
                .toFile(outputPath);
            
            console.log(`✅ Converted: ${relativeOutput}`);
            convertedCount++;
        }

        if (convertedCount === 0) {
            console.log('✨ No PNG/JPG images found. All images are up-to-date!');
        } else {
            console.log(`🎉 Done! Converted a total of ${convertedCount} image(s) across all folders to WebP format.`);
        }
    } catch (err) {
        console.error('❌ Error converting images:', err);
    }
}

convertAllImagesToWebp();

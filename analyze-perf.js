const fs = require('fs');

const files = ['index.html', 'order.html', 'order-summary.html', 'ai-helper.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    const html = fs.readFileSync(file, 'utf8');
    const regex = /<img[^>]+src=["']([^"']+)["']/g;
    let match;
    const imgs = [];
    while ((match = regex.exec(html)) !== null) {
        imgs.push(match[1]);
    }
    
    let totalBytes = 0;
    const largeImgs = [];
    imgs.forEach(src => {
        const clean = src.split('?')[0];
        if (fs.existsSync(clean)) {
            const size = fs.statSync(clean).size;
            totalBytes += size;
            if (size > 200000) {
                largeImgs.push({ name: clean, size: (size / 1024).toFixed(1) + ' KB' });
            }
        }
    });

    console.log(`=== ${file} ===`);
    console.log(`HTML size: ${(fs.statSync(file).size / 1024).toFixed(1)} KB`);
    console.log(`Total images referenced: ${imgs.length}`);
    console.log(`Total image weight: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
    if (largeImgs.length > 0) {
        console.log('Large images (>200KB):', largeImgs);
    }
    console.log('');
});

// Check lazy loading in index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');
const allImgs = indexHtml.match(/<img[^>]+>/g) || [];
let missingLazy = 0;
allImgs.forEach((img, i) => {
    if (!img.includes('loading="lazy"') && !img.includes("loading='lazy'")) {
        missingLazy++;
        if (missingLazy <= 10) console.log('Missing lazy:', img.substring(0, 80));
    }
});
console.log(`\nindex.html total <img>: ${allImgs.length}, missing loading="lazy": ${missingLazy}`);

// Check CSS and JS sizes
['style.css', 'app.js'].forEach(f => {
    if (fs.existsSync(f)) {
        console.log(`${f} size: ${(fs.statSync(f).size / 1024).toFixed(1)} KB`);
    }
});


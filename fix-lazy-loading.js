const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace all <img> tags that don't have loading="lazy" (skip the first logo.webp hero image if it has fetchpriority="high")
let count = 0;
html = html.replace(/<img\s+([^>]+)>/gi, (match, attrs) => {
    // Keep hero main logo eager
    if (attrs.includes('hero-logo-img') || attrs.includes('fetchpriority="high"')) {
        return match;
    }
    let newAttrs = attrs;
    if (!newAttrs.includes('loading=')) {
        newAttrs += ' loading="lazy"';
        count++;
    }
    if (!newAttrs.includes('decoding=')) {
        newAttrs += ' decoding="async"';
    }
    return `<img ${newAttrs}>`;
});

fs.writeFileSync('index.html', html, 'utf8');
console.log(`Updated ${count} images with loading="lazy" in index.html`);

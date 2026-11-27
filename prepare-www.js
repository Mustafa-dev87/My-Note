// Copies the web app files into www/ for Capacitor.
const fs = require('fs');
fs.rmSync('www', { recursive: true, force: true });
fs.mkdirSync('www');
for (const f of ['index.html', 'sw.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png']) {
  fs.copyFileSync(f, 'www/' + f);
}
console.log('www ready');

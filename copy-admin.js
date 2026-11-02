import fs from 'fs';
import path from 'path';

try {
  const distDir = path.resolve('dist');
  const indexFile = path.join(distDir, 'index.html');

  if (fs.existsSync(indexFile)) {
    const adminDir = path.join(distDir, 'admin');
    if (!fs.existsSync(adminDir)) {
      fs.mkdirSync(adminDir, { recursive: true });
    }
    // Copy index.html to dist/admin/index.html
    fs.copyFileSync(indexFile, path.join(adminDir, 'index.html'));
    // Also copy to dist/admin.html
    fs.copyFileSync(indexFile, path.join(distDir, 'admin.html'));
    console.log('✓ Successfully generated dist/admin/index.html and dist/admin.html fallback static endpoints');
  }
} catch (e) {
  console.warn('Post-build admin fallback generation note:', e.message);
}

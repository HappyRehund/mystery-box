const { execSync } = require('child_process');

// Compile TypeScript seed file
execSync('npx tsc prisma/seed.ts --target ES2017 --module commonjs --esModuleInterop --skipLibCheck --outDir ./prisma', { stdio: 'inherit' });

console.log('Seed file compiled successfully');

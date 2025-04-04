const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths to clean
const pathsToClean = [
  '.next',
  'node_modules/.cache'
];

// Clean directories
pathsToClean.forEach(dirPath => {
  try {
    if (fs.existsSync(dirPath)) {
      console.log(`Removing ${dirPath}...`);
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✅ ${dirPath} removed successfully`);
    } else {
      console.log(`⚠️ ${dirPath} does not exist, skipping...`);
    }
  } catch (err) {
    console.error(`❌ Error removing ${dirPath}:`, err);
  }
});

// Install dependencies
console.log('Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (err) {
  console.error('❌ Error installing dependencies:', err);
  process.exit(1);
}

// Build the project
console.log('Building the project...');
try {
  execSync('npx next build', { stdio: 'inherit' });
  console.log('✅ Project built successfully');
} catch (err) {
  console.error('❌ Error building the project:', err);
  process.exit(1);
}

console.log('🎉 Cleanup complete! You can now run the development server with: npm run dev'); 
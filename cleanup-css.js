#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files to remove (now converted to Tailwind)
const filesToRemove = [
  'src/styles/design-system.css',
  'src/styles/modern-layout.css', 
  'src/styles/navigation.css',
  'src/styles/components/buttons.css',
  'src/styles/components/cards.css',
  'src/styles/components/forms.css',
  'src/styles/components/language-switcher.css',
  'src/styles/components/language-switcher.module.css',
  'src/styles/themes/dark.css',
  'src/styles/themes/light.css',
  'src/styles/globals.css'
];

// Remove unused CSS files
console.log('Removing unused CSS files...');
filesToRemove.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log(`Removed: ${file}`);
  }
});

// Remove empty directories
const dirsToCheck = [
  'src/styles/components',
  'src/styles/themes'
];

dirsToCheck.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    const files = fs.readdirSync(fullPath);
    if (files.length === 0) {
      fs.rmdirSync(fullPath);
      console.log(`Removed empty directory: ${dir}`);
    }
  }
});

console.log('CSS cleanup completed!');
console.log('\nRemaining CSS files:');
console.log('- src/app/globals.css (converted to Tailwind)');
console.log('- src/styles/responsive.css (converted to Tailwind)');
console.log('\nAll custom CSS has been converted to Tailwind CSS utilities.');
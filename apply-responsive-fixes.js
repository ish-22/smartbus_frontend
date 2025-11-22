#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Responsive class mappings
const responsiveMappings = {
  // Layout
  'space-y-6': 'space-responsive-md',
  'space-y-4': 'space-responsive-sm',
  'space-y-8': 'space-responsive-lg',
  'gap-6': 'gap-responsive-md',
  'gap-4': 'gap-responsive-sm',
  'gap-8': 'gap-responsive-lg',
  
  // Typography
  'text-2xl': 'text-responsive-2xl',
  'text-xl': 'text-responsive-xl',
  'text-lg': 'text-responsive-lg',
  'text-base': 'text-responsive-base',
  'text-sm': 'text-responsive-sm',
  
  // Grids
  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4': 'grid-responsive-4',
  'grid grid-cols-1 md:grid-cols-3': 'grid-responsive-3',
  'grid grid-cols-1 md:grid-cols-2': 'grid-responsive-2',
  'grid grid-cols-1': 'grid-responsive-1',
  
  // Icons
  'h-6 w-6': 'icon-responsive-md',
  'h-5 w-5': 'icon-responsive-sm',
  'h-8 w-8': 'icon-responsive-lg',
  
  // Padding
  'p-6': 'card-responsive',
  'mb-4': 'mb-responsive-md',
  'mb-6': 'mb-responsive-lg',
};

// Common responsive patterns
const patterns = [
  {
    search: /className="([^"]*space-y-6[^"]*)"/g,
    replace: (match, classes) => `className="${classes.replace('space-y-6', 'space-responsive-md')}"`
  },
  {
    search: /className="([^"]*text-2xl[^"]*)"/g,
    replace: (match, classes) => `className="${classes.replace('text-2xl', 'text-responsive-2xl')}"`
  },
  {
    search: /className="([^"]*grid grid-cols-1 md:grid-cols-4[^"]*)"/g,
    replace: (match, classes) => `className="${classes.replace('grid grid-cols-1 md:grid-cols-4', 'grid-responsive-4')}"`
  },
  {
    search: /className="([^"]*grid grid-cols-1 md:grid-cols-3[^"]*)"/g,
    replace: (match, classes) => `className="${classes.replace('grid grid-cols-1 md:grid-cols-3', 'grid-responsive-3')}"`
  },
  {
    search: /className="([^"]*grid grid-cols-1 md:grid-cols-2[^"]*)"/g,
    replace: (match, classes) => `className="${classes.replace('grid grid-cols-1 md:grid-cols-2', 'grid-responsive-2')}"`
  }
];

// Add no-scroll-x to main containers
const addNoScrollX = (content) => {
  return content.replace(
    /return \(\s*<div className="([^"]*space-y-[^"]*)"/g,
    'return (\n    <div className="$1 no-scroll-x"'
  );
};

// Add responsive classes to icons
const makeIconsResponsive = (content) => {
  return content
    .replace(/className="h-6 w-6([^"]*)"/g, 'className="icon-responsive-md$1"')
    .replace(/className="h-5 w-5([^"]*)"/g, 'className="icon-responsive-sm$1"')
    .replace(/className="h-8 w-8([^"]*)"/g, 'className="icon-responsive-lg$1"');
};

// Add flex-shrink-0 to icons
const addFlexShrink = (content) => {
  return content.replace(
    /<div className="p-2 bg-([^"]*) rounded-lg">/g,
    '<div className="p-2 bg-$1 rounded-lg flex-shrink-0">'
  );
};

// Add min-w-0 and truncate to text containers
const addTextTruncation = (content) => {
  return content.replace(
    /<div className="ml-4">/g,
    '<div className="ml-3 min-w-0">'
  ).replace(
    /<p className="text-sm font-medium text-gray-600">([^<]*)<\/p>/g,
    '<p className="text-responsive-xs font-medium text-gray-600 truncate">$1</p>'
  ).replace(
    /<p className="text-2xl font-bold text-gray-900">([^<]*)<\/p>/g,
    '<p className="text-responsive-lg font-bold text-gray-900">$1</p>'
  );
};

// Process a single file
const processFile = (filePath) => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already processed
    if (content.includes('no-scroll-x') || content.includes('text-responsive-')) {
      console.log(`Skipping ${filePath} - already processed`);
      return;
    }
    
    // Apply transformations
    content = addNoScrollX(content);
    content = makeIconsResponsive(content);
    content = addFlexShrink(content);
    content = addTextTruncation(content);
    
    // Apply pattern replacements
    patterns.forEach(pattern => {
      content = content.replace(pattern.search, pattern.replace);
    });
    
    // Apply simple mappings
    Object.entries(responsiveMappings).forEach(([search, replace]) => {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      content = content.replace(regex, replace);
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`Processed: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
};

// Find all page files
const findPageFiles = (dir) => {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findPageFiles(fullPath));
    } else if (item === 'page.tsx' && !fullPath.includes('auth')) {
      files.push(fullPath);
    }
  }
  
  return files;
};

// Main execution
const appDir = path.join(__dirname, 'src', 'app');
const pageFiles = findPageFiles(appDir);

console.log(`Found ${pageFiles.length} page files to process...`);

pageFiles.forEach(processFile);

console.log('Responsive fixes applied to all pages!');
console.log('\nNext steps:');
console.log('1. Review the changes');
console.log('2. Test on different screen sizes');
console.log('3. Apply manual fixes where needed');
console.log('4. Update any custom components');
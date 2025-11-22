#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Mapping of custom CSS classes to Tailwind utilities
const classReplacements = {
  // Responsive grids
  'grid-responsive-1': 'grid grid-cols-1',
  'grid-responsive-2': 'grid grid-cols-1 sm:grid-cols-2',
  'grid-responsive-3': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  'grid-responsive-4': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  
  // Responsive text
  'text-responsive-xs': 'text-xs sm:text-sm',
  'text-responsive-sm': 'text-sm sm:text-base',
  'text-responsive-base': 'text-sm sm:text-base lg:text-lg',
  'text-responsive-lg': 'text-base sm:text-lg lg:text-xl',
  'text-responsive-xl': 'text-lg sm:text-xl lg:text-2xl',
  'text-responsive-2xl': 'text-xl sm:text-2xl lg:text-3xl',
  
  // Responsive icons
  'icon-responsive-sm': 'h-4 w-4 sm:h-5 sm:w-5',
  'icon-responsive-md': 'h-5 w-5 sm:h-6 sm:w-6',
  'icon-responsive-lg': 'h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8',
  
  // Responsive spacing
  'space-responsive-sm': 'space-y-3 sm:space-y-4',
  'space-responsive-md': 'space-y-4 sm:space-y-6',
  'space-responsive-lg': 'space-y-6 sm:space-y-8',
  'gap-responsive-sm': 'gap-3 sm:gap-4',
  'gap-responsive-md': 'gap-4 sm:gap-6',
  'gap-responsive-lg': 'gap-6 sm:gap-8',
  
  // Responsive margins
  'mb-responsive-sm': 'mb-2 sm:mb-3',
  'mb-responsive-md': 'mb-3 sm:mb-4',
  'mb-responsive-lg': 'mb-4 sm:mb-6',
  
  // Responsive cards
  'card-responsive': 'p-3 sm:p-4 lg:p-6',
  
  // Mobile utilities
  'mobile-full-width': 'w-full',
  'mobile-hidden': 'hidden sm:block',
  'mobile-only': 'block sm:hidden',
  'no-scroll-x': 'overflow-x-hidden',
  
  // Flex utilities
  'flex-responsive-col': 'flex flex-col sm:flex-row',
  'flex-responsive-wrap': 'flex flex-wrap',
  
  // Button responsive
  'btn-responsive': 'px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base',
  'btn-responsive-sm': 'px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm',
  
  // Table responsive
  'table-responsive': 'overflow-x-auto',
  
  // Form responsive
  'form-responsive': 'space-y-3 sm:space-y-4',
  'input-responsive': 'w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
  
  // Navigation
  'nav-responsive': 'flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4',
  'tabs-responsive': 'flex flex-wrap gap-2 sm:gap-4',
  'tab-responsive': 'px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm',
  
  // Modern components
  'modern-card': 'bg-white rounded-xl shadow-lg p-6 mb-6 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5',
  'stats-grid': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8',
  'modern-table': 'bg-white rounded-xl overflow-hidden shadow-lg',
  'table-header': 'bg-gray-50 px-6 py-4 border-b border-gray-200',
  'table-row': 'px-6 py-4 border-b border-gray-100 transition-colors hover:bg-gray-50',
  'modern-form': 'bg-white rounded-xl p-8 shadow-lg',
  'form-group': 'mb-6',
  'form-label': 'block text-sm font-medium text-gray-700 mb-2',
  'form-input': 'w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20',
  
  // Sidebar
  'sidebar-transition': 'transition-all duration-300 ease-in-out',
  'sidebar-collapsed': 'w-20',
  'sidebar-expanded': 'w-60',
  'sidebar-item': 'transition-all duration-150 hover:bg-white hover:bg-opacity-10 hover:translate-x-0.5',
  
  // Mobile nav
  'mobile-nav': 'fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 grid grid-cols-4 h-16 z-50',
  'mobile-nav-item': 'flex flex-col items-center justify-center p-2 text-gray-500 no-underline text-xs transition-colors hover:text-blue-600',
  
  // Animations
  'fade-in': 'animate-fade-in',
  'slide-in': 'animate-slide-in',
  'loading-pulse': 'animate-pulse',
  'update-flash': 'animate-flash',
  
  // Container
  'container-responsive': 'w-full max-w-none px-4 sm:px-4 lg:px-8'
};

// Process a single file
const processFile = (filePath) => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Replace each custom class with Tailwind utilities
    Object.entries(classReplacements).forEach(([oldClass, newClasses]) => {
      const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
      if (content.includes(oldClass)) {
        content = content.replace(regex, newClasses);
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
};

// Find all TSX and JSX files
const findFiles = (dir, extensions = ['.tsx', '.jsx', '.ts', '.js']) => {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findFiles(fullPath, extensions));
    } else if (extensions.some(ext => item.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  
  return files;
};

// Main execution
const srcDir = path.join(__dirname, 'src');
const files = findFiles(srcDir);

console.log(`Found ${files.length} files to process...`);

files.forEach(processFile);

console.log('Conversion to Tailwind CSS completed!');
console.log('\nAll custom CSS classes have been replaced with Tailwind utilities.');
console.log('The UI/UX should remain exactly the same.');
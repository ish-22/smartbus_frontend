# SmartBus Tracker - Refactor Plan

## Issues Identified

### Duplicate Pages
- Multiple dashboard pages (admin/dashboard, passenger/dashboard, driver/dashboard, owner/dashboard)
- Duplicate feedback pages (admin/feedback, passenger/feedback, app/feedback)
- Multiple lost-found implementations
- Redundant header components (admin-header, driver-header, owner-header, passenger-header)

### Structural Issues
- Mixed routing patterns (some pages in role folders, others in root)
- Unused components and layouts
- Inconsistent navigation configuration
- Missing pages for some sidebar links

### Navigation Issues
- Sidebar links not matching actual page routes
- Role-based navigation not properly enforced
- Missing pages for some navigation items

## Refactor Strategy

### 1. Consolidate Navigation
- Single ModernSidebar component for all roles
- Centralized navigation configuration
- Remove duplicate header components

### 2. Organize Pages by Role
- `/admin/*` - Admin-only pages
- `/owner/*` - Owner-only pages  
- `/driver/*` - Driver-only pages
- `/passenger/*` - Passenger-only pages

### 3. Remove Duplicates
- Keep role-specific implementations
- Remove generic/duplicate pages
- Consolidate shared components

### 4. Fix Routing
- Ensure all sidebar links have corresponding pages
- Implement proper role-based access control
- Remove unused routes

## Files to Remove
- Duplicate header components
- Unused layout files
- Generic pages that duplicate role-specific ones
- Orphaned components

## Files to Create
- Missing pages for sidebar navigation
- Consolidated navigation config
- Role-based route guards
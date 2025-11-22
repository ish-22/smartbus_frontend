# SmartBus Mobile Responsive Template

## Complete Mobile-First Responsive Strategy

### 1. Breakpoint Strategy
- **xs**: 320px (Small mobile)
- **sm**: 375px (Standard mobile)  
- **md**: 414px (Large mobile)
- **lg**: 768px (Tablet)
- **xl**: 1024px (Desktop)
- **2xl**: 1280px (Large desktop)

### 2. Page Structure Template

```tsx
export default function PageName() {
  return (
    <div className="space-responsive-md no-scroll-x">
      {/* Header Section */}
      <div>
        <h1 className="text-responsive-2xl font-bold text-gray-900">Page Title</h1>
        <p className="text-responsive-sm text-gray-600 mt-1">Page description</p>
      </div>

      {/* Stats Cards - Use appropriate grid */}
      <div className="grid-responsive-4 gap-responsive-md">
        <Card className="card-responsive">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <Icon className="icon-responsive-md text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-responsive-xs font-medium text-gray-600 truncate">Label</p>
              <p className="text-responsive-lg font-bold text-gray-900">Value</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Content Section */}
      <div className="space-responsive-sm">
        {/* Mobile Card View for Tables */}
        <div className="lg:hidden space-responsive-sm">
          {items.map((item) => (
            <Card key={item.id} className="card-responsive">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="text-responsive-sm font-semibold text-gray-900 truncate">
                    {item.title}
                  </h3>
                  <div className="mt-1 space-y-1">
                    <p className="text-responsive-xs text-gray-600">Detail 1</p>
                    <p className="text-responsive-xs text-gray-600">Detail 2</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="px-2 py-1 text-responsive-xs rounded-full bg-blue-100 text-blue-800">
                    Status
                  </span>
                  <Button className="btn-responsive-sm">Action</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Desktop Table View */}
        <Card className="hidden lg:block overflow-hidden">
          <div className="table-responsive">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Column 1
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.data}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
```

### 3. Responsive Utility Classes

#### Layout Classes
- `no-scroll-x` - Prevent horizontal scrolling
- `container-responsive` - Responsive container with proper padding
- `grid-responsive-1/2/3/4` - Responsive grid layouts
- `flex-responsive-col` - Flex column on mobile, row on desktop

#### Spacing Classes
- `space-responsive-sm/md/lg` - Responsive vertical spacing
- `gap-responsive-sm/md/lg` - Responsive grid gaps
- `mb-responsive-sm/md/lg` - Responsive bottom margins
- `card-responsive` - Responsive card padding

#### Typography Classes
- `text-responsive-xs` - text-xs sm:text-sm
- `text-responsive-sm` - text-sm sm:text-base
- `text-responsive-base` - text-sm sm:text-base lg:text-lg
- `text-responsive-lg` - text-base sm:text-lg lg:text-xl
- `text-responsive-xl` - text-lg sm:text-xl lg:text-2xl
- `text-responsive-2xl` - text-xl sm:text-2xl lg:text-3xl

#### Icon Classes
- `icon-responsive-sm` - h-4 w-4 sm:h-5 sm:w-5
- `icon-responsive-md` - h-5 w-5 sm:h-6 sm:w-6
- `icon-responsive-lg` - h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8

#### Button Classes
- `btn-responsive` - Responsive button padding and text
- `btn-responsive-sm` - Small responsive button

### 4. Mobile-Specific Patterns

#### Navigation Tabs
```tsx
<div className="border-b border-gray-200 overflow-x-auto">
  <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max">
    {tabs.map((tab) => (
      <button className="py-2 px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 whitespace-nowrap">
        <Icon className="icon-responsive-sm" />
        <span className="hidden sm:inline">{tab.fullLabel}</span>
        <span className="sm:hidden">{tab.shortLabel}</span>
      </button>
    ))}
  </nav>
</div>
```

#### Form Layout
```tsx
<div className="form-responsive">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-responsive-sm">
    <input className="input-responsive" />
  </div>
</div>
```

#### Modal/Dialog
```tsx
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
  <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
    <div className="card-responsive">
      {/* Modal content */}
    </div>
  </div>
</div>
```

### 5. Implementation Checklist

For each page, ensure:

- [ ] Use `no-scroll-x` on main container
- [ ] Replace fixed text sizes with `text-responsive-*`
- [ ] Replace fixed icon sizes with `icon-responsive-*`
- [ ] Use responsive grids: `grid-responsive-*`
- [ ] Use responsive spacing: `space-responsive-*`, `gap-responsive-*`
- [ ] Use responsive padding: `card-responsive`
- [ ] Add `flex-shrink-0` to icons and status badges
- [ ] Add `min-w-0` and `truncate` to text containers
- [ ] Implement mobile card view for tables
- [ ] Use `hidden lg:block` for desktop-only elements
- [ ] Use `lg:hidden` for mobile-only elements
- [ ] Test on 320px, 375px, 414px, 768px, 1024px

### 6. Common Mobile Issues & Solutions

#### Issue: Text Overflow
```tsx
// Bad
<h3 className="text-lg font-semibold">{longTitle}</h3>

// Good
<h3 className="text-responsive-base font-semibold truncate">{longTitle}</h3>
```

#### Issue: Button Text Too Long
```tsx
// Bad
<Button>Complete Registration Process</Button>

// Good
<Button className="btn-responsive">
  <span className="hidden sm:inline">Complete Registration Process</span>
  <span className="sm:hidden">Register</span>
</Button>
```

#### Issue: Cards Too Narrow
```tsx
// Bad
<div className="grid grid-cols-4 gap-6">

// Good
<div className="grid-responsive-4 gap-responsive-md">
```

#### Issue: Table Overflow
```tsx
// Bad
<table className="min-w-full">

// Good
{/* Mobile Cards */}
<div className="lg:hidden">
  {items.map(item => <Card key={item.id}>...</Card>)}
</div>

{/* Desktop Table */}
<div className="hidden lg:block table-responsive">
  <table className="min-w-full">
```

### 7. Testing Strategy

Test each page on:
1. **320px** - iPhone SE, small Android
2. **375px** - iPhone 12/13/14 
3. **414px** - iPhone Plus models
4. **768px** - iPad portrait
5. **1024px** - iPad landscape, small desktop

Verify:
- No horizontal scrolling
- All text readable
- Buttons accessible
- Cards don't squeeze
- Navigation works
- Forms are usable

This template ensures 100% mobile responsiveness across all screen sizes while maintaining a professional appearance.
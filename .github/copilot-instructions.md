# Copilot Instructions

## Project Overview
This is a Next.js 15 application using App Router, TypeScript, and Tailwind CSS 4. Follow these guidelines for all code generation.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Icons:** react-icons/lu (Lucide icons only)
- **Font:** Poppins (via next/font/google)

## Code Style

### General Principles
- Write concise, readable code
- Prefer composition over inheritance
- Use descriptive variable names (no single letters except loop indices)
- Keep functions small and focused (max ~20 lines)
- Extract reusable logic into custom hooks or utility functions
- Avoid code duplication - DRY (Don't Repeat Yourself)

### TypeScript
- Always define explicit types for props, state, and function returns
- Use `interface` for object shapes, `type` for unions/intersections
- Avoid `any` - use `unknown` if type is truly unknown
- Use const assertions where applicable
- Prefer optional chaining (`?.`) and nullish coalescing (`??`)

```typescript
// Good
interface CustomerProps {
  id: number;
  name: string;
  status: "active" | "pending" | "inactive";
}

// Avoid
const customer: any = { ... };
```

### React/Next.js
- Use functional components only
- Prefer Server Components; add `"use client"` only when necessary
- Use `useCallback` and `useMemo` for expensive computations
- Colocate related files (component, styles, tests)
- Use Next.js Image component for optimized images
- Use Next.js Link for client-side navigation

```typescript
// Good - Server Component (default)
export default function CustomerList({ customers }: Props) {
  return <ul>{customers.map(c => <li key={c.id}>{c.name}</li>)}</ul>;
}

// Client Component - only when needed
"use client";
export default function InteractiveForm() {
  const [value, setValue] = useState("");
  // ...
}
```

### Tailwind CSS 4
- Use Tailwind v4 syntax:
  - Gradients: `bg-linear-to-r` (not `bg-gradient-to-r`)
  - Z-index: `z-50` (not `z-[50]`)
  - Use built-in values when possible (e.g., `min-h-125` not `min-h-[500px]`)
- Group related classes logically
- Use consistent color scheme:
  - Primary: `#EA580C` (orange-600)
  - Background: `#0F172A` (slate-900), `#F8FAFC` (slate-50)
  - Text: `#1E293B` (slate-800), `#64748B` (slate-500)

### File Structure
```
app/
  (auth)/           # Auth route group
    _components/    # Auth-specific components
  (dashboard)/      # Dashboard route group
    _components/    # Dashboard-specific components
  _components/      # Shared components
  page.tsx          # Route page
  layout.tsx        # Route layout
  loading.tsx       # Loading UI
  error.tsx         # Error UI
lib/                # Utilities and helpers
public/             # Static assets
```

### Component Structure
```typescript
// 1. Imports (external, then internal)
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { cn } from "@/lib/utils";

// 2. Types/Interfaces
interface Props {
  title: string;
  onSubmit: (data: FormData) => void;
}

// 3. Component
export default function MyComponent({ title, onSubmit }: Props) {
  // 3a. Hooks
  const [value, setValue] = useState("");
  
  // 3b. Derived state
  const isValid = value.length > 0;
  
  // 3c. Handlers
  const handleSubmit = () => { /* ... */ };
  
  // 3d. Render
  return <div>{/* ... */}</div>;
}
```

### Naming Conventions
- **Files:** PascalCase for components (`CustomerCard.tsx`), camelCase for utils (`formatDate.ts`)
- **Components:** PascalCase (`CustomerCard`)
- **Functions/Variables:** camelCase (`handleSubmit`, `isLoading`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces:** PascalCase with descriptive names (`CustomerFormData`)

### Error Handling
- Use try-catch for async operations
- Provide meaningful error messages
- Use error boundaries (error.tsx) at route level
- Never swallow errors silently

### Performance
- Lazy load heavy components with `dynamic()`
- Use `loading.tsx` for route-level suspense
- Optimize images with Next.js Image
- Avoid unnecessary re-renders (memoization)
- Keep bundle size small - avoid heavy dependencies

### Accessibility
- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- Maintain sufficient color contrast

## Don'ts
- Don't use `var` - use `const` or `let`
- Don't use `any` type
- Don't use inline styles - use Tailwind classes
- Don't create god components (split if > 150 lines)
- Don't hardcode values - use constants or config
- Don't ignore TypeScript errors with `@ts-ignore`
- Don't use deprecated patterns or APIs

## Dependencies
When suggesting new dependencies:
- Prefer established, well-maintained packages
- Check bundle size impact
- Ensure TypeScript support
- Verify compatibility with Next.js 15

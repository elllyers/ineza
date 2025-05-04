# Ineza - A Modern Authentication-Protected Service Platform

Ineza is a Next.js-based web application that provides seamless access to various services including banking, document processing, and writing services. Built with TypeScript and protected by Clerk authentication, it offers a secure and user-friendly interface for accessing digital services.

The platform features a modern, responsive design with a dark theme and implements route protection for sensitive areas. It uses React Server Components for optimal performance and includes custom UI components built with Tailwind CSS. The application provides a seamless authentication flow and protected dashboard access for registered users.

## Repository Structure
```
ineza/
├── app/                      # Next.js 13+ app directory structure
│   ├── (auth)/              # Authentication-related pages (sign-in, sign-up)
│   └── (root)/              # Main application pages and layouts
├── components/              # Reusable React components
│   ├── ui/                  # Base UI components (buttons, calendar)
│   ├── Hero.tsx            # Landing page hero section
│   └── Navbar.tsx          # Application navigation bar
├── lib/                    # Utility functions and shared code
└── middleware.ts           # Route protection and authentication middleware
```

## Usage Instructions
### Prerequisites
- Node.js 16.x or later
- npm or yarn package manager
- A Clerk.dev account for authentication

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd ineza
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
# Create .env.local file
touch .env.local

# Add required Clerk environment variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

### Quick Start
1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to `http://localhost:3000`

### More Detailed Examples
1. Accessing protected routes:
```typescript
// Protected routes are defined in middleware.ts
const protectedRoutes = [
  "/dashboard",
  "/services",
  "/services/*"
];
```

2. Using the UI components:
```typescript
import { Button } from "@/components/ui/button";

// Example usage
<Button variant="default">
  Click me
</Button>
```

### Troubleshooting
Common issues and solutions:

1. Authentication Issues
- Error: "Unable to access protected route"
  - Ensure you're logged in
  - Check if Clerk environment variables are properly set
  - Clear browser cookies and try again

2. Build Errors
- Error: "Module not found"
  - Run `npm install` to ensure all dependencies are installed
  - Check import paths match the repository structure

## Data Flow
The application follows a simple data flow pattern where authentication state manages access to protected routes and services.

```ascii
[Client] -> [Clerk Auth] -> [Middleware] -> [Protected Routes]
     |           |              |                  |
     └─────────>[Public Routes]─┴──────────────────┘
```

Key component interactions:
1. Clerk.js handles user authentication and session management
2. Middleware intercepts requests to protected routes
3. Protected routes require valid authentication
4. Public routes are accessible without authentication
5. UI components adapt based on authentication state

## Infrastructure
The application uses the following key infrastructure components:

Authentication:
- Clerk.js for user authentication and management
- Protected route middleware for security

Frontend:
- Next.js 13+ for server-side rendering and routing
- React Server Components for optimal performance
- Tailwind CSS for styling
- TypeScript for type safety
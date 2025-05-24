# Ineza - Your Digital Services Hub

## Overview
Ineza is a comprehensive digital services platform that provides seamless access to various essential services including banking operations, government documentation (Irembo), and professional writing services. Built with Next.js 13+ and secured by Clerk authentication, it offers a modern, secure, and user-friendly interface for accessing and managing digital services.

## Key Features

### Service Categories
- **Banking Services**: Secure transactions, account management, and financial operations
- **Irembo Services**: Government documentation, permits, and certificates
- **Writing Services**: Professional document writing and editing

### Platform Capabilities
- Dynamic service forms with custom fields
- Secure payment processing
- Real-time service status tracking
- Admin dashboard for service management
- User-friendly interface with dark theme
- Responsive design for all devices

## Documentation
- [How Services Work](app/(root)/(home)/(services)/services/how-services-work.md) - Detailed guide on using our services
- [Technical Specification](app/(root)/(home)/(services)/services/spec.md) - Technical details for developers

## Project Structure
```
ineza/
├── app/                      # Next.js 13+ app directory
│   ├── (auth)/              # Authentication pages
│   └── (root)/              # Main application
│       └── (home)/
│           └── (services)/  # Services implementation
├── components/              # Reusable components
│   ├── ui/                 # Base UI components
│   └── dashboard/          # Admin dashboard components
├── lib/                    # Utilities and helpers
└── public/                 # Static assets
```

## Technology Stack
- **Framework**: Next.js 13+ with App Router
- **Authentication**: Clerk.js
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Hooks
- **Payment Processing**: Integrated payment gateways
- **Form Handling**: Dynamic form generation

## Getting Started

### Prerequisites
- Node.js 16.x or later
- npm or yarn
- Clerk.dev account
- Environment variables setup

### Installation

1. Clone the repository:
```bash
git clone https://github.com/elllyers/ineza.git
cd ineza
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
```bash
# Create .env.local with:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
```

4. Start development server:
```bash
npm run dev
# or
yarn dev
```

## User Roles

### Client Users
- Browse available services
- Submit service requests
- Track request status
- Make payments
- View service history

### Administrators
- Manage services
- Process requests
- View analytics
- Generate reports
- Configure pricing

## Security Features
- Clerk authentication
- Protected routes
- Secure payment processing
- Data encryption
- Role-based access control

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support
For support and queries:
- Check the [How Services Work](app/(root)/(home)/(services)/services/how-services-work.md) guide
- Contact our support team
- Visit our help center

## License
This project is proprietary software. All rights reserved.

---

Built with ❤️ by Ineza Team
# DocLedger Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-14.0+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A comprehensive document management and analytics dashboard designed for medical practices in Bangladesh. Streamline your workflow with advanced features for managing doctors, chambers, patients, appointments, operations, financial records, and more.

## 🚀 Live Demo

Experience the application live: **[DocLedger Dashboard](https://docledger.vercel.app/)**

## 🌟 Features

### Core Functionality
- **Multi-language Support**: Full English and Bengali (বাংলা) localization
- **Secure Authentication**: Role-based access control for admins, doctors, and users
- **Real-time Dashboard**: Comprehensive analytics and statistics overview
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Management Modules
- **👨‍⚕️ Doctor Management**: Add, edit, and manage doctor profiles and permissions
- **🏥 Chamber Management**: Organize and assign chambers to doctors
- **👥 User Management**: Handle user accounts with chamber-specific access
- **📅 Appointment Management**: Schedule and track patient appointments
- **🔪 Operation Management**: Record and manage surgical procedures
- **📋 Operation Type Management**: Define and categorize operation types
- **💰 Expenditure Management**: Track and document expenses with file attachments
- **💳 Deposit Management**: Manage financial deposits and transactions
- **🏦 Bank Account Management**: Maintain multiple bank and mobile financial service accounts

### Advanced Features
- **Financial Analytics**: Comprehensive income, expense, and profit tracking
- **File Upload Support**: Secure document and receipt management
- **Data Export**: Download reports and financial records
- **Search & Filtering**: Advanced search across all modules
- **Data Validation**: Robust form validation with localized error messages
- **Toast Notifications**: User-friendly feedback system

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Forms**: Custom form components with validation

### Fonts & Styling
- **Primary Font**: [Inter](https://fonts.google.com/specimen/Inter) (English)
- **Bengali Font**: [Baloo Da 2](https://fonts.google.com/specimen/Baloo+Da+2) (বাংলা)
- **CSS Framework**: Tailwind CSS with custom design system

### Development Tools
- **Package Manager**: npm/yarn/pnpm
- **Code Quality**: ESLint, TypeScript strict mode
- **Build Tool**: Next.js built-in bundler
- **Deployment**: Vercel/Netlify compatible

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **npm/yarn/pnpm**: Latest stable version
- **Git**: For version control

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nishatrhythm/docledger-dashboard.git
   cd docledger-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup** (if required)
   ```bash
   # Create environment file if needed
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Getting Started
1. **Login**: Use your credentials to access the dashboard
2. **Dashboard Overview**: View key statistics and recent activities
3. **Language Selection**: Switch between English and Bengali using the language switcher
4. **Navigation**: Use the sidebar to access different management modules

### Key Workflows

#### Managing Doctors
- Navigate to "Doctor" section
- Add new doctors with contact information
- Assign chambers and manage permissions
- Reset passwords and update profiles

#### Appointment Scheduling
- Go to "Appointment" management
- Select doctor and chamber
- Enter patient details and schedule time
- Track appointment status and history

#### Financial Management
- Use "Expenditure" and "Deposit" modules
- Upload supporting documents
- Generate financial reports
- Monitor income and expenses

## 📁 Project Structure

```
docledger-dashboard/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── dashboard/         # Main dashboard
│   │   ├── doctor/            # Doctor management
│   │   ├── chamber/           # Chamber management
│   │   ├── user/              # User management
│   │   ├── appointment/       # Appointment management
│   │   ├── operation/         # Operation management
│   │   ├── expenditure/       # Expenditure management
│   │   ├── deposit/           # Deposit management
│   │   └── account/           # Account management
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Shadcn/ui components
│   │   └── forms/            # Form components
│   ├── contexts/             # React contexts (Language, etc.)
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Utility functions
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind CSS configuration
├── next.config.ts           # Next.js configuration
├── components.json          # Shadcn/ui configuration
└── package.json             # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Ensure all tests pass
- Update documentation as needed
- Maintain code quality standards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**DocLedger Team**
- Project Repository: [GitHub](https://github.com/nishatrhythm/docledger-dashboard)
- Issues: [GitHub Issues](https://github.com/nishatrhythm/docledger-dashboard/issues)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

---

**Made with ❤️ for medical professionals in Bangladesh**
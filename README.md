# 🛍️ Adipas - Modern E-Commerce Platform

![Adipas Banner](https://via.placeholder.com/1200x400/3B82F6/FFFFFF?text=Adipas+E-Commerce+Platform)

A modern, responsive e-commerce platform built with React, TypeScript, and Tailwind CSS. Features a complete shopping experience with admin dashboard, real-time cart management, and beautiful UI/UX.

## 🚀 Live Demo

- **Live Application**: [https://adipas-3t82.vercel.app/products](https://adipas-3t82.vercel.app/products)
- **Video Presentation**: [YouTube Demo](https://youtu.be/HWzP6rz_qqM)
- **Presentation Slides**: [Canva Slides](https://www.canva.com/design/DAG3Jk2NPCQ/3YSonh_DP-ZT0ePu5I7iqw/edit?utm_content=DAG3Jk2NPCQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## ✨ Features

### 🛒 Shopping Experience
- **Product Catalog** - Browse products with grid/list views
- **Advanced Search** - Real-time search by name, category, description
- **Smart Filtering** - Filter by category, price range, ratings
- **Product Details** - Comprehensive product information pages
- **Shopping Cart** - Add/remove items, quantity management
- **Checkout Process** - Complete checkout with shipping & payment

### 👨‍💼 Admin Dashboard
- **Product Management** - Add, edit, delete products
- **Admin Authentication** - Secure login system
- **Protected Routes** - Role-based access control
- **Real-time Updates** - Instant product catalog updates

### 🎨 User Experience
- **Dark/Light Mode** - Theme toggle with system preference
- **Responsive Design** - Mobile-first responsive layout
- **Loading States** - Smooth loading indicators
- **Error Handling** - Comprehensive error boundaries
- **Persistent Cart** - Cart saved in localStorage

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing

### State Management
- **React Context API** - Global state management
- **Local Storage** - Persistent data storage

### UI Components
- **shadcn/ui** - Custom component library
- **Lucide React** - Beautiful icons
- **Custom Components** - Tailored e-commerce components

### API & Data
- **FakeStore API** - Product data source
- **Local Products** - Admin-added products

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/adipas-ecommerce.git
   cd adipas-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # Base UI components
│   ├── layout/         # Layout components
│   └── products/       # Product-specific components
├── contexts/           # React contexts
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   ├── ProductContext.tsx
│   └── ThemeContext.tsx
├── hooks/              # Custom hooks
├── pages/              # Page components
├── types/              # TypeScript definitions
└── utils/              # Utility functions
```

## 🔐 Authentication

Demo Admin Credentials:
- **Username**: admin
- **Password**: password

*Note: This is for demonstration purposes only.*

## 🎯 Key Features Explained

### Product Management
- Dynamic product listing from FakeStore API
- Local product management for admins
- Real-time search and filtering
- Category-based organization

### Shopping Cart
- Add/remove products with quantity control
- Persistent cart using localStorage
- Real-time price calculations
- Tax and total amount computation

### Admin System
- Secure authentication flow
- Protected admin dashboard
- Product CRUD operations
- Session management

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Adaptive layouts

## 🚀 Deployment

The application is deployed on Vercel with automatic CI/CD from the main branch.

### Build Command
```bash
npm run build
```

### Deployment Status
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

## 🙏 Acknowledgments

- [FakeStore API](https://fakestoreapi.com/) for product data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://react.dev/) for the framework
- [Vercel](https://vercel.com/) for deployment

---

<div align="center">

⭐ Don't forget to star this repository if you find it helpful!

[Live Demo](https://adipas-3t82.vercel.app/products) • [Video Demo](https://youtu.be/HWzP6rz_qqM) • [Presentation](https://www.canva.com/design/DAG3Jk2NPCQ/3YSonh_DP-ZT0ePu5I7iqw/edit)

</div>
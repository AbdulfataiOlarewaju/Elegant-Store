# E-Commerce Application

A modern, visually appealing e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project features a comprehensive admin panel for managing products and orders, and a user-friendly shopping interface with advanced features like search, filtering, cart management, and secure PayPal payments.

## Features

### Admin Panel
- **Product Management**: Add, edit, delete, and view products with image uploads via Cloudinary.
- **Order Management**: View and update order statuses, track customer orders.
- **Dashboard**: Overview of key metrics including total products, orders, and revenue.

### Shopping View
- **Product Listing**: Browse products with filtering and sorting options.
- **Search Functionality**: Advanced search to find products quickly.
- **User Account**: Manage personal information, view order history.
- **Shopping Cart**: Add, remove, and update items in the cart.
- **Checkout**: Secure checkout process with PayPal integration.
- **Address Management**: Save and manage delivery addresses.
- **Product Reviews**: Leave and view reviews for products.
- **Payment Handling**: PayPal return, success, and cancel pages.

### Additional Features
- **Authentication**: User login and registration with JWT tokens.
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS and Radix UI components.
- **State Management**: Redux Toolkit for efficient state handling.
- **Image Uploads**: Cloudinary integration for product images.
- **Notifications**: Toast notifications using Sonner.

## Tech Stack

### Frontend
- **React**: UI library for building the user interface.
- **Vite**: Fast build tool and development server.
- **Redux Toolkit**: State management.
- **React Router DOM**: Client-side routing.
- **Tailwind CSS**: Utility-first CSS framework.
- **Radix UI**: Accessible UI components.
- **Lucide React**: Icon library.
- **Axios**: HTTP client for API requests.

### Backend
- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database with Mongoose ODM.
- **JWT**: JSON Web Tokens for authentication.
- **Bcryptjs**: Password hashing.
- **Multer**: File upload handling.
- **Cloudinary**: Image hosting and management.
- **PayPal SDK**: Payment processing.

### Development Tools
- **ESLint**: Code linting.
- **Nodemon**: Auto-restart for backend development.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- PayPal Developer Account (for payment integration)
- Cloudinary Account (for image uploads)

### Backend Setup
1. Navigate to the `server` directory:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the `server` directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   ```
4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `Code` directory:
   ```
   cd Code
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).
2. Register a new account or log in.
3. As an admin, access the admin panel at `/admin` to manage products and orders.
4. As a user, browse products, add to cart, and proceed to checkout.
5. Use PayPal for payment processing.

## Project Structure

```
/
├── Code/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Redux store and slices
│   │   └── ...
│   ├── public/           # Static assets
│   └── package.json
├── server/               # Backend (Node.js + Express)
│   ├── controllers/      # Route handlers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── helpers/          # Utility functions
│   └── server.js         # Main server file
└── README.md
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the ISC License.

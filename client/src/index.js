import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header';
import AuthForm from './AuthForm';
import Home from './Home';
import ProductInfo from './ProductInfo';
import Cart from './Cart';
import About  from './About';
import Contact from './Contact';
import PrivacyPolicy from './PrivacyPolicy';
import Footer from './Footer';
import ProductForm from './ProductForm';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './ErrorPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/ProductInfo",
    element: <ProductInfo />,
  },
  {
    path: "/Cart",
    element: <Cart />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Contact",
    element: <Contact />,
  },
  {
    path: "/AuthForm",
    element: <AuthForm />,
  },
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/ProductForm",
    element: <ProductForm />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>
);



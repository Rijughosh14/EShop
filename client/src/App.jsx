import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/footer/About';
import Careers from './components/footer/Careers';
import Press from './components/footer/Press';
import Sustainability from './components/footer/Sustainability';
import Help from './components/footer/Help';
import Contact from './components/footer/Contact';
import Shipping from './components/footer/Shipping';
import Returns from './components/footer/Returns';
import Privacy from './components/footer/Privacy';
import Terms from './components/footer/Terms';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import PaymentStatus from './pages/PaymentStatus';
import CategoryProductListing from './pages/CategoryProductListing';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import { LoginPage, SignupPage } from './pages/Auth';
import {useDispatch, useSelector} from 'react-redux'
import { validateToken } from './features/auth/authThunk';
import { selectIsLoading } from './features/auth/authSelectors';
import { updateTokens } from './features/auth/authSlice';
import { setUpdateAuthState } from './utils/tokenManager';
import { ProtectedRoute } from './components/ProtectedRoute';
import { FullPageSpinner } from './components/LoadingSpinner';
import { useEffect } from 'react';



const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
};

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  const isLoading = useSelector(selectIsLoading);

  const Layout = isAuthPage ? AuthLayout : MainLayout;

  const dispatch=useDispatch();

  // Set up token manager to update Redux state
  useEffect(() => {
    setUpdateAuthState((tokens) => {
      dispatch(updateTokens(tokens));
    });
  }, [dispatch]);
  
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const result = await dispatch(validateToken());
        if (result.payload === null) {
          console.log('ℹ️ No authentication token found - user not logged in');
        } else {
          console.log('✅ Authentication token validated successfully');
        }
      } catch (error) {
        console.error('❌ Token validation failed:', error);
      }
    };

    initializeAuth();
  }, [dispatch]);

  // Show loading spinner during initial auth check
  if (isLoading && !isAuthPage) {
    return <FullPageSpinner />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:id" element={<CategoryProductListing />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/payment-status" element={<ProtectedRoute><PaymentStatus /></ProtectedRoute>} />
        {/* Footer informational routes */}
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/press" element={<Press />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Layout>
  );
}
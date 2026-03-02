import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import { AnimatePresence } from 'motion/react';

export default function App() {
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const apiUrl = process.env.NODE_ENV === 'production' 
              ? '/api/location' 
              : 'http://localhost:3000/api/location';
            
            await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ latitude, longitude }),
            });
            console.log('✅ Location tracked:', { latitude, longitude });
          } catch (error) {
            console.error('❌ Failed to save location:', error);
          }
        },
        (error) => {
          console.warn('⚠️  Geolocation error:', error.message);
          // Handle different error cases
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.log('User denied geolocation permission');
              break;
            case error.POSITION_UNAVAILABLE:
              console.log('Geolocation position unavailable');
              break;
            case error.TIMEOUT:
              console.log('Geolocation request timed out');
              break;
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.log('Geolocation not supported in this browser');
    }
  }, []);

  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen bg-white text-zinc-900 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

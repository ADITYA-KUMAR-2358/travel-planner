import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import DestinationsPage from './pages/Destinations/DestinationsPage';

const ItineraryBuilder = lazy(() => import('./pages/Itinerary/ItineraryBuilder'));
const MyBookings = lazy(() => import('./pages/Bookings/MyBookings'));
const DestinationDetail = lazy(() => import('./pages/Destinations/DestinationDetail'));

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        width: '50px', 
        height: '50px', 
        border: '4px solid #f3f3f3', 
        borderTop: '4px solid #28b9c7', 
        borderRadius: '50%', 
        animation: 'spin 1s linear infinite',
        margin: '0 auto 1rem'
      }}></div>
      <p>Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <Main />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />
          <Route path="/itinerary" element={<ItineraryBuilder />} />
          <Route path="/bookings" element={<MyBookings />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;

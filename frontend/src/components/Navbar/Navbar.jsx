import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { SiYourtraveldottv } from 'react-icons/si';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './navbar.css';

const Navbar = () => {
  const [active, setActive] = useState('navBar');
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showNav = () => {
    setActive('navBar activeNavbar');
  };

  const removeNavbar = () => {
    setActive('navBar');
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <section className='navBarSection'>
      <header className="header flex">
        <div className="logoDiv">
          <Link to="/" className="logo flex">
            <h1><SiYourtraveldottv className="icon" /> Roamio</h1>
          </Link>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <Link to="/" className="navLink" onClick={removeNavbar}>Home</Link>
            </li>

            <li className="navItem">
              <Link to="/destinations" className="navLink" onClick={removeNavbar}>Destinations</Link>
            </li>

            <li className="navItem">
              <a href="#about" className="navLink" onClick={removeNavbar}>About</a>
            </li>

            <li className="navItem">
              <a href="#contact" className="navLink" onClick={removeNavbar}>Contact</a>
            </li>

            {isAuthenticated ? (
              <>
                <li className="navItem">
                  <div className="user-info">
                    <FaUser className="user-icon" />
                    <span>{user?.name}</span>
                  </div>
                </li>
                <li className="navItem">
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="navItem">
                <div className="auth-buttons-container">
                  <Link to="/login" onClick={removeNavbar}>
                    <button className="auth-btn login-btn">Login</button>
                  </Link>
                  <Link to="/register" onClick={removeNavbar}>
                    <button className="auth-btn signup-btn">Sign Up</button>
                  </Link>
                </div>
              </li>
            )}
          </ul>

          <div onClick={removeNavbar} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </header>
    </section>
  );
};

export default Navbar;

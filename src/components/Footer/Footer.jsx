import React, { useEffect, useRef } from 'react';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_ring from '../../assets/bell_ring.svg';
import user_avatar from '../../assets/user_avatar.png';
import caret_arrow from '../../assets/caret_arrow.svg';
import { logout } from '../../firebase';

const Navbar = () => {
  const navRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="navbar" ref={navRef}>
        <div className="navbar-left">
          <img src={logo} alt="Logo" />
          <ul>
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>New & Popular</li>
            <li>My List</li>
            <li>Browse by Languages</li>
          </ul>
        </div>
        <div className="navbar-right">
          <img src={search_icon} alt="Search" className="icons" />
          <img src={bell_ring} alt="Notifications" className="icons" />
          <img src={user_avatar} alt="Profile" className="profile" />
          <div className="navbar-profile">
            <img src={caret_arrow} alt="Caret" />
            <div className="dropdown">
              <p onClick={() => logout()}>Sign Out of Netflix</p>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded CSS */}
      <style>{`
        .navbar {
          width: 100%;
          padding: 20px 6%;
          display: flex;
          justify-content: space-between;
          position: fixed;
          font-size: 14px;
          color: #e5e5e5;
          background-image: linear-gradient(180deg, rgba(0,0,0,0.7) 10%, transparent);
          z-index: 1;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 50px;
        }

        .navbar-left img {
          width: 90px;
        }

        .navbar-left ul {
          display: flex;
          list-style: none;
          gap: 20px;
        }

        .navbar-left ul li {
          cursor: pointer;
        }

        .navbar-right {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .icons {
          width: 20px;
          cursor: pointer;
        }

        .profile {
          border-radius: 4px;
          width: 35px;
        }

        .navbar-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          position: relative;
        }

        .dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: max-content;
          background: rgb(15, 1, 1);
          padding: 18px 22px;
          border-radius: 2px;
          text-decoration: underline;
          z-index: 1;
          display: none;
        }

        .dropdown p {
          font-size: 13px;
          cursor: pointer;
        }

        .navbar-profile:hover .dropdown {
          display: block;
        }

        .nav-dark {
          background: #141414;
        }

        @media (max-width: 800px) {
          .navbar {
            padding: 20px 4%;
          }
          .navbar-left ul {
            display: none;
          }
          .navbar img {
            height: 25px;
          }
        }

        @media (max-width: 500px) {
          .navbar img {
            height: 20px;
          }
          .navbar-right {
            gap: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;


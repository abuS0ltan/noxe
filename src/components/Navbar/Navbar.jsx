import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './navbar.css';
export default function Navbar({ userData,logout }) {
  useEffect(() => {
    changeNavTogglertColor();
    console.log(userData);
  });
  let changeNavTogglertColor = () => {
    let navbarToggler = document.querySelector('.navbar-toggler');
    navbarToggler.addEventListener('click', () => {
      navbarToggler.style.borderColor = "transparent";

    })
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link className="navbar-brand" to='home'>Noxe</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='home' className='nav-link'>Home</Link>
              </li>
              <li className="nav-item">
                <Link to='movies' className='nav-link'>Moveis</Link>
                <div>
                  <div></div>
                </div>
              </li>
              <li className="nav-item">
                <Link to='tvshows' className='nav-link'>Tv Shows</Link>
              </li>
              <li className="nav-item">
                <Link to='people' className='nav-link'>People</Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userData == undefined ?
                <>

                  <li className="nav-item">
                    <Link to='login' className='nav-link'>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to='rigster' className='nav-link'>Rigester</Link>
                  </li>
                </>
                :
                <>
                  <li className="nav-item">
                    <Link className='nav-link'>{userData.first_name}</Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={logout} className='nav-link'>Logout</Link>
                  </li>

                </>
                
              }


            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}

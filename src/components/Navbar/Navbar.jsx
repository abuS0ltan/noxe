import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './navbar.css';
import './navbarMq.css'
export default function Navbar({ userData, logout }) {
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
  let apper=false;
  let drowpDownApper =()=>{
    let drowpDown=document.querySelector('.drowpDown');
    if(apper==false){
      apper=true;
      drowpDown.style.display='block';
      window.removeEventListener('click',()=>{
        console.log('remove')
      })
    }
    else{
      apper=false;
      drowpDown.style.display='none';
    }
  }
  window.addEventListener('click',(e)=>{
    let drowpDownBtn=document.querySelector('.name');
    if(e.target!=drowpDownBtn){
      if(userData!=undefined)
      if(apper==true){
        apper =false;
        let drowpDown=document.querySelector('.drowpDown');
        if(drowpDown!=null)
          drowpDown.style.display='none';
      }
    }
    
  })
  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link className="navbar-brand" to='home'>Noxe</Link>

          <div className='btnDiv'>
            {
              userData != undefined ?
                <>
                  <li className="nav-item d-flex">
                    <span onClick={()=>drowpDownApper()} className='nav-link px-xl-4 px-md-3 px-2 name'> {userData.first_name}<FontAwesomeIcon className='icon' icon="fa-regular fa-user" /></span>
                    <ul className="drowpDown">
                      <li className="nav-item">
                        <Link className='nav-link' to='/profile'>Profile</Link>
                      </li>
                      <li className="nav-item">
                        <Link className='nav-link' to='/yourlist'>YourList</Link>
                      </li>
                      <li className="nav-item lastItem">
                        <Link onClick={logout} className='nav-link'>Logout</Link>
                      </li>
                    </ul>
                  </li>
                </>
                :
                <></>
            }

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
          </div>

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

                </>

              }


            </ul>

          </div>



        </div>
      </nav>

    </div>
  )
}

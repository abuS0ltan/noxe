import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Movies from './components/Movies/Movies';
import People from './components/People/People';
import Rigster from './components/Rigster/Rigster';
import TvShows from './components/TvShows/TvShows';
import WeekTrend from './components/Home/HomeComponents/WeekTrend/WeekTrend';
import Footer from './components/Footer/Footer';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import { useEffect, useState } from 'react';
import Details from './components/Details/Details';


function App() {
  let [userData,setUserData]=useState();
  let navigate=useNavigate();
  useEffect(()=>{
    let users=[{
      first_name: 'admin',
      last_name: 'admin',
      age: '20',
      email: 'admin@admin.com',
      password: 'admin',
    }]
  if(localStorage.getItem("users")==null){
    localStorage.setItem('users',JSON.stringify(users));
  }
  },[]);
  useEffect(()=>{
  if(localStorage.getItem("loginData")){
    console.log(localStorage.getItem("loginData"))
    // if(userData==null){
      setLoginData();
      console.log(userData)
      console.log(userData)
    // }
    }
  },[])
  useEffect(()=>{
    if(localStorage.getItem("loginData")){
      console.log(localStorage.getItem("loginData"))
      // if(userData==null){
        setLoginData();
        console.log(userData)
        console.log(userData)
      // }
      }
    },[userData])
  let setLoginData=()=>{
    console.log(JSON.parse(localStorage.getItem("loginData")));

    if(userData==undefined){
      let data=JSON.parse(localStorage.getItem("loginData"));
          console.log(data);
        setUserData(data);
        console.log(userData);
    }
  }
  let logout=()=>{
    localStorage.removeItem('loginData');
    setUserData(undefined);
    return(<Navigate to='/login'/>)
  }
  return (
    <div className="positionRelative">
        <Navbar userData={userData} logout={logout}/>
        <Routes>
          <Route path='home' element={<Home/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='login' element={<Login setLoginData={setLoginData}/>}/>
          <Route path='Logout' element={<Logout/>}/>
          <Route path='movies' element={
          <ProtectedRoutes userData={userData}>
            <Movies/>
          </ProtectedRoutes>}/>
          <Route path='people' element={
            <ProtectedRoutes userData={userData}>
              <People/>
            </ProtectedRoutes>
          }/>
          <Route path='tvshows' element={
            <ProtectedRoutes userData={userData}>
              <TvShows/>
            </ProtectedRoutes>
          }/>
          <Route path='details' element={<Details/>}/>
          <Route path='rigster' element={<Rigster/>}/>
          <Route path='weektrend' element={<WeekTrend/>} />
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;

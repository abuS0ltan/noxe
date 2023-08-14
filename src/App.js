import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Navigate, Route, Routes, json, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Movies from './components/Movies/Movies';
import People from './components/People/People';
import Rigster from './components/Rigster/Rigster';
import TvShows from './components/TvShows/TvShows';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import { useEffect, useLayoutEffect, useState } from 'react';
import Details from './components/Details/Details';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/ProfileComponents/EditProfile';
import ChangePass from './components/Profile/ProfileComponents/ChangePass';
import Loding from './components/Loding/Loding';
import YourList from './components/YourList/YourList';


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
      list:[]
    }]
  if(localStorage.getItem("users")==null){
    localStorage.setItem('users',JSON.stringify(users));
  }
  if(localStorage.getItem("loginData")){
    let data=localStorage.getItem("loginData");
    data =JSON.parse( data);
    userData=data;
    // setUserData(data);
  }
  setUserData(userData);
  },[]);
  let setLoginData= async()=>{

    if(userData==undefined){
      let data=localStorage.getItem("loginData");
      data =await JSON.parse( data);
      userData=data;
      // setUserData(data);
    }
    setUserData(userData);
  }
  let logout=()=>{
    localStorage.removeItem('loginData');
    setUserData(undefined);
    return(<Navigate to='/login'/>)
  }
  const mySolveForProblem=()=>{

    if(localStorage.getItem("loginData")&&userData==undefined){
      let data=localStorage.getItem("loginData");
      data =JSON.parse( data);
      userData=data;
      // setUserData(data);
      setUserData(userData);
    }
  }
  mySolveForProblem();
  return (
    <div className="positionRelative App">
        <Navbar userData={userData} logout={logout}/>
        <Routes>
          {/* <Route path='editprofile' element={<EditProfile/>}/> */}
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
          <Route path='yourlist' element={
            <ProtectedRoutes userData={userData}>
              <YourList/>
            </ProtectedRoutes>
          }/>
          <Route path='profile' element={
            <ProtectedRoutes userData={userData}>
              {/* <Profile userData={userData} setLoginData={setLoginData}/> */}
              <Profile userData={userData} setLoginData={setLoginData}/>
              
            </ProtectedRoutes>}
            >
                <Route path='editprofile' element={<EditProfile userData={userData} setLoginData={setLoginData}/>} />
                <Route path='changepass' element={<ChangePass userData={userData} setLoginData={setLoginData} logout={logout}/>}/>
            </Route>
            {/* <Route path='profile' element={<Profile userData={userData} setLoginData={setLoginData}/>}>
              <Route path='editprofile' element={<EditProfile/>}/>
              <Route path='changepass' element={<ChangePass/>}/>

            </Route> */}
          <Route path='details' element={<Details/>}/>
          <Route path='rigster' element={<Rigster/>}/>
          <Route path='loding' element={<Loding/>}/>
        </Routes>
    </div>
  );
}

export default App;

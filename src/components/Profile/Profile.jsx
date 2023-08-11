import React, { useEffect, useState } from 'react'
import './profile.css';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import EditProfile from './ProfileComponents/EditProfile';
export default function Profile({userData,setLoginData}) {
    let [profileData,setProfileData]=useState({});
    useEffect(()=>{
        const data=userData;
        console.log(data)
        if(data==undefined){
          console.log('dontwork')
          setLoginData();
          console.log(userData)
          setProfileData(userData);

        }
        else{
          console.log('work')
          setProfileData(data);
        }
    },[])
    // useEffect(()=>{
    //   console.log('update');
    //   console.log(profileData)
    //   setProfileData(profileData);
    //   console.log(profileData);
    // },[profileData])
  return (
    <div className='profile'>
        <div className="container">
          <div className="profileContent">

            <h1 className="mainTitle">
              profile
            </h1>
            <div className="infoContent">
              <div className="row">
                <div className="col-sm-6 mb-sm-0 mb-5">
                  <div className="imgDiv">
                    <img src={require('./3135715.png')} alt="" />
                  </div>

                </div>
                <div className="col-sm-6">
                  {
                    profileData!=undefined?
                    <div className="info">
                    <span className="infoItem firstName">First Name: &nbsp; {profileData.first_name}</span>
                    <span className="infoItem">Last Name: &nbsp; {profileData.last_name}</span>
                    <span className="infoItem">Age: &nbsp; {profileData.age}</span>
                    <span className="infoItem">Email: &nbsp; {profileData.email}</span>
                    </div>
                    :
                    <>
                    </>

                  }
                  
                </div>
                <div className="col-12">
                  <div className="btnDiv">
                    <Link to='editprofile' className='edit btn'>Edit Profile</Link>
                    <Link to='changepass' className='pass btn'>Change Password</Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <Outlet/>
        </div>
    </div>
  )
}

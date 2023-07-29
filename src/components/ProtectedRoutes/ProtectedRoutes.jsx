import React, { Children } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

export default function ProtectedRoutes({userData,children}) {
    console.log(userData);
    if(userData==undefined){
      return <Navigate to='/login'/>
    }
    return children;
}

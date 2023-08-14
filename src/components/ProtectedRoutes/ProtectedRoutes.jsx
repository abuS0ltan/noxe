import React, { Children } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

export default function ProtectedRoutes({userData,children}) {
    if(userData==undefined){
      return <Navigate to='/login'/>
    }
    return children;
}

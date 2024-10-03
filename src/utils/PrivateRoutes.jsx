
// to check if user loged in or not5

import React from 'react'
import {useAuth} from '../context/authContext'
import {Navigate} from 'react-router-dom'
// add

const PrivateRoutes = ({children}) =>{
    const{user, loading} = useAuth()

    if(loading)  {
      return  <div>Loading....</div>
    }

    return user ? children :<Navigate to = "/login"/>
    }

export default PrivateRoutes
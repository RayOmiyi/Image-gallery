import React from 'react'
import {Navigate} from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'

const PublicRoutes = ({children}) => {
  const {user} = useAuth();
  console.log(user);
  if(user){
    return<Navigate to='/' replace={true}/>
  }
  return children
}

export default PublicRoutes

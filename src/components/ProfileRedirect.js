/* eslint-disable react/prop-types */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

// eslint-disable-next-line react/prop-types
function ProfileRedirect ({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          return <Component {...props} />
        } else {
          return <Redirect to="/profile" />
        }
      }}
    />
  )
}

export default ProfileRedirect

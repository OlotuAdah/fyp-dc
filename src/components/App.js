import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'

import SignUp from './SignUp'
import Login from './Login'
import Profile from './Profile'
import Reset from './Reset'
import UserUploads from './UserUploads'

import PrivateRoute from './PrivateRoute'
import ProfileRedirect from './ProfileRedirect'
import AuthProvider from '../context/AuthProvider'
import '../App.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#133E2C'
    },
    secondary: {
      main: '#1CA261'
    }
  }
})

function App () {
  // const size = useWindowSize();

  return (
    <>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Switch>
          <ProfileRedirect exact path="/" component={SignUp} />
          <ProfileRedirect exact path="/login" component={Login} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/home" component={UserUploads} />
          <PrivateRoute exact path="/profile" component={Profile} />
        </Switch>
        </AuthProvider>
      </ThemeProvider>
      </>
  )
}

export default App

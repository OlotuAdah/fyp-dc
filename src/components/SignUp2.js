import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ReactLoading from 'react-loading'
import { TextField, Button, Typography, Grid, InputAdornment, IconButton, Paper } from '@material-ui/core'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import EmailIcon from '@material-ui/icons/Email'
import styles from './styles2'
import useWindowResize from './useWindowResize'
import { useData } from '../context/DataProvider'
import { useAuth } from '../context/AuthProvider'

export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [visibility, setVisibility] = useState(false)
  const [err, setErr] = useState('')
  const [message, setMessage] = useState('')

  const screenWidth = useWindowResize().width

  const browserHistory = useHistory()
  const subjectsStr = useData()
  const { signUp, currentUser } = useAuth()

  async function handleSignUp (e) {
    e.preventDefault()
    if (email === '') {
      setMessage('')
      setErr('Email Must not be Empty')
      return
    }

    if (password === '') {
      setMessage('')
      setErr('Password Must not be Empty')
      return
    }
    if (password.length > 30) {
      setMessage('')
      setErr('Password too long')
      return
    }
    if (password.length < 6) {
      setMessage('')
      setErr('Password must be at least 6 charaters')
      return
    }
    if (password !== confirmPassword) {
      setMessage('')
      setErr('Passwords do not match')
      return
    }

    try {
      setErr('')
      setLoading(true)
      await signUp(email, password)
      setLoading(false)
      // setFirstName(''); setEmail(''); setPassword(''); setConfirmPassword('');
      // setMessage('Account Created Successfully')
      console.log(currentUser.uid)
      browserHistory.push('profile')
    } catch (err) {
      const errCode = err.code
      // let errMsg = err.message;
      if (errCode === 'auth/weak-password') {
        setErr('Pasword is too weak')
      }
      if (errCode === 'auth/email-already-in-use') {
        setErr('Email already in use')
      }

      if (errCode === 'auth/invalid-email') {
        setErr('Email is not valid, please use a valid email')
      }
    } finally {
      setLoading(false)
    }
  }

  const classes = styles()
  return (
        <React.Fragment>

        <form onSubmit={handleSignUp}>

         <Paper className={classes.bigPaper} style={{ width: screenWidth < 800 ? '96%' : '45%', marginTop: 50, borderRadius: '1.5em' }} elevation={20} >
             <Grid container className={classes.gridContainer}>
                 <Grid item>
                     <IconButton className={classes.iconButton} >
                        <AccountCircleRoundedIcon style={{ fontSize: 40 }}/>
                     </IconButton>

                 </Grid>
                 <Grid item>
                    <Typography variant="h5" className={classes.iconButton} >
                        Create Account
                    </Typography>
                 </Grid>
             </Grid>

                {err && <span style={{ marginBottom: 15 }}><Typography color="error">{err}</Typography></span>}
                {message && <span><Typography className={classes.successMsg}>{message}</Typography></span>}

            <Grid container className={classes.gridContainer}>
                <Grid item >
                    <TextField
                    style={{ width: '80%', margin: 15 }}
                    placeholder="sombody@gmail.com"
                    type="email"
                    variant="outlined"
                    label="Email"
                    required
                    color="secondary"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    InputProps={{
                      endAdornment: (
                            <InputAdornment position="end">
                                <IconButton >
                                     <EmailIcon/>
                                </IconButton>

                            </InputAdornment>
                      )
                      // className: classes.input
                    }}

                    />
                </Grid>
                <Grid item>

                        <TextField
                            type={visibility ? 'text' : 'password'}
                            variant="outlined"
                            label="Password"
                            color="secondary"
                            id="textField"
                            style={{ width: '80%', margin: 15 }}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            InputProps={{
                              endAdornment: (
                                    <InputAdornment position="end" >
                                        <IconButton onClick={tooggleVisibility} >
                                            {visibility ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                        </IconButton>
                                    </InputAdornment>
                              )
                            }}

                            />
                </Grid>
                <Grid item>

                                <TextField
                                    type="password"
                                    variant="outlined"
                                    label="Confirm Password"
                                    color="secondary"
                                    id="textField"
                                    style={{ width: '80%', margin: 15 }}
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}

                                    />
                        </Grid>

                <Grid item>
                    <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    disabled={loading}
                    style={{ width: '80%', backgroundColor: '#1CA261', color: '#f2f4fa', margin: 15 }}
                    >
                     {loading && <ReactLoading type="spokes" color="#FFF" height={20} width={20}/>} &nbsp; Sign up</Button>
                </Grid>
                <Grid item>
                        <Link to="/login" className={classes.link} >Have Account ? </Link>

                        <Link to="/login" className={classes.link} >&nbsp;Log In</Link>
                </Grid>

                <Grid item className={classes.miniFooter}>
                       <Typography variant="caption"> &copy; FUTMX 2020 </Typography>
                </Grid>

            </Grid>
            {subjectsStr && <div>{subjectsStr}</div>}

        </Paper>
    </form>
</React.Fragment>
  )

  function tooggleVisibility () {
    return setVisibility(!visibility)
  }
}
export default SignUp

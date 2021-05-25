import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'
import { TextField, Button, Typography, Box } from '@material-ui/core'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'
import { styles } from './styles'

import { useAuth } from '../context/AuthProvider'

export const Reset = () => {
  const [email, setEmail] = useState('')
  const [err, setErr] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { resetPassword } = useAuth()

  async function handleReset (e) {
    e.preventDefault()

    if (email === '') {
      setMessage('')
      setErr('Email can not be Empty!')
      return
    }

    try {
      setMessage('')
      setLoading(true)
      await resetPassword(email)
      setMessage(`Open the link sent to: ${email}`)
    } catch (error) {
      setErr('Could not reset password... try again!')
    }
    setLoading(false)
  }

  const classes = styles()
  return (
    <React.Fragment>
      <form onSubmit={handleReset}>
        <Box
          className={classes.bgPapper}
          display="flex"
          flexDirection="column"
          style={{ color: 'green' }}
        >
          <AccountCircleRoundedIcon className={classes.userIcon} />
          <Typography
            variant="h5"
            style={{ color: '#1CA261', marginBottom: 20 }}
          >
            Reset Your Password
          </Typography>
          {err && (
            <span style={{ marginBottom: 15 }}>
              <Typography color="error">{err}</Typography>
            </span>
          )}
          {message && (
            <span>
              <strong>
                <Typography className={classes.successResetMsg}>
                  {message}
                </Typography>
              </strong>
            </span>
          )}
          { loading
            ? (
            <ReactLoading
              type="spokes"
              color="#E61A5F"
              height={'10%'}
              width={'10%'}
            />
              )
            : ('')}

          <TextField
            style={{ width: '80%', margin: 15 }}
            placeholder="Enter your Resgistered email"
            type="email"
            variant="outlined"
            label="Email"
            color="secondary"
            value={email}
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            style={{
              width: '80%',
              backgroundColor: '#1CA261',
              color: '#FFF',
              marginTop: 20,
              marginBottom: 10
            }}
          >
            Reset
          </Button>

          <div style={{ color: '#B0BEC5', marginTop: 8 }}>
            <Link to="/login" className={classes.link}>
              Cancel
            </Link>
          </div>
        </Box>
      </form>
    </React.Fragment>
  )
}
export default Reset

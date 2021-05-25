/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase/firebase'
import axios from 'axios'
//import { createUserDocument } from '../firebase/user'

const AuthContext = React.createContext()
export const useAuth = () => {
  return useContext(AuthContext)
}

export function AuthProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploadsCount, setUploadsCount] = useState(0)
  const [createUser, setCreateUser] = useState(false)
  //const [count, setCount] = useState(0)
  
  //const [images, setImages] = useState([]);

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [matric, setMatric] = useState('')
  const [email, setEmail] = useState('')

  // const userDoc = { fname, lname, matric, email }

  const signUp = async (email, password) => {
    const resp = await auth.createUserWithEmailAndPassword(email, password)
    const user = resp.user
    const data = { last_name: lname, first_name: fname, matric: matric, email: email, uid: resp.user.uid}
      await axios.post('https://futmx-cpe-fyp.herokuapp.com/createUsers', data)
        .catch((err => console.log(err)));
    
    
    // await user.updateProfile({ displayName: `${fname} ${lname}`})
    // user.lastName = lname
    // user.firstName = fname
    // user.matric = matric
    // await createUserDocument(user)
    
    
    // console.log(user)

    return user
  }

  const login = async (email, password) => {
    return await auth.signInWithEmailAndPassword(email, password)
  }

  function logout () {
    return auth.signOut()
  }

  function resetPassword (email) {
    return auth.sendPasswordResetEmail(email)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe;
  }, [])

  const authContextValue = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword,
    createUser,

    // images
    images,
    setImages,
    // data
    fname,
    setFname,
    lname,
    setLname,
    matric,
    setMatric,
    email,
    setEmail,

    uploadsCount,
    setUploadsCount,

    

  }
  return <AuthContext.Provider value={authContextValue}>
            {!loading && children}
         </AuthContext.Provider>
}

export default AuthProvider

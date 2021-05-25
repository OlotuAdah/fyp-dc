import React, { useContext, useState } from 'react'
import tutorsInit from './tutorsStore'

const DataContext = React.createContext()
export const useData = () => {
  return useContext(DataContext)
}

// eslint-disable-next-line react/prop-types
export function DataProvider ({ children }) {
  const [subjects, setSubjects] = useState(null)
  const [isTutor, setIsTutor] = useState(null)
  const [err, setErr] = useState('')
  const [selectErr, setSelectErr] = useState('')
  const [fetching, setFetching] = useState(true)

  const confirmedSubs = []
  let subjectsString = ''

  if (subjects) {
    subjects.map((subject, index) => {
      // console.log(subject.value)
      return confirmedSubs.push(subject.value)
    })
    subjectsString = confirmedSubs.join(' and ')
    console.log('Subjects string: ' + subjectsString)
  }

  const [firstName, setFirstName] = useState('')
  const [otherNames, setOtherNames] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [mobileNum, setMobileNum] = useState('')
  const [qualification, setQualification] = useState('')
  const [bio, setBio] = useState('')
  const [profilePix, setProfilePix] = useState('')

  // location service
  const [locationService, setLocationService] = useState(false)

  const userData = {
    firstName: firstName,
    otherNames: otherNames,
    address: address,
    mobileNum: mobileNum,
    email: email,
    qualification: qualification,
    bio: bio,
    subjectsString: subjectsString,
    isTutor: isTutor

  }

  const [userDocument, setUserDocument] = useState('')

  const dataContextValue = {
    tutorsInit,
    err,
    setErr,
    selectErr,
    setSelectErr,
    subjects,
    setSubjects,
    subjectsString,

    isTutor,
    setIsTutor,

    setUserDocument,
    userDocument,
    firstName,
    setFirstName,
    otherNames,
    setOtherNames,
    email,
    setEmail,
    address,
    setAddress,
    mobileNum,
    setMobileNum,
    qualification,
    setQualification,
    bio,
    setBio,

    // userData is used to create user document on cloud after a succesfull signup
    userData,
    // profile pix
    profilePix,
    setProfilePix,

    // fetching Tutors to display on homepage
    fetching,
    setFetching,
    // location service
    locationService,
    setLocationService

  }
  return <DataContext.Provider value={dataContextValue}>
            { children}
         </DataContext.Provider>
}

export default DataProvider

// contains all the functions that relates to updating user data
// import { firestore } from '../firebase/firebase'
import { firestore } from '../firebase/firebase'

export const createUserDocument = (user) => {
  // create reference to user docuent
  const docRef = firestore.doc(`/users/${user.uid}`)

  // construct user object
  const userDoc = {
    userId: user.uid,
    firstNname: user.firstName,
    lastName: user.lastName,
    email: user.email,
    matric: user.matric
  }

  // Now, write user object to cloud firestore
 // console.log(userDoc)
  return docRef.set(userDoc)
}

export const createUpload = async (deatails) => {
  const docRef = await firestore.doc(`/uploads/${deatails.userId}`)
  return await docRef.set(deatails)
}

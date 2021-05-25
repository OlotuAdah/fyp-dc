
import React, { useEffect, useState } from 'react'
import { Ripple } from 'react-load-animations'
import { useAuth } from '../context/AuthProvider'
import axios from 'axios'



function UserUploads () {
  const [loadPage, setLoadPage] = useState(true);
  //const [images, setImages] = useState([]);

  const {uploadsCount,setUploadsCount, images, setImages, currentUser} = useAuth();

  useEffect(async()=>{
    await axios.get(`https://futmx-cpe-fyp.herokuapp.com/uploads?uid=${currentUser.uid}`)
      .then(res => {
        //console.log(res)
        setImages(res.data.data)
      })
      //.then(result => console.log(result))
      //.then(setLoadPage(false))
     // .catch(err => console.log(err))
    //return () => resp;

  }, []);

  useEffect(()=>{
    //console.log(images.length)
    setUploadsCount(images.length)
    //setLoadPage(false)
  })

  useEffect(async() => {
    await setTimeout(() => {
      setLoadPage(false)
    }, 4000)


  })


  return (
        <>
      
        {loadPage ?
         <>
            <div className='loadAnimation'>
                    <Ripple />
            </div>
        </>
            :
            <>
          <div className='uploads_btn_container'>
          
         <div className='uploads_btn'>Uploads: <span style={{color:'red'}}> {uploadsCount && uploadsCount}</span> </div> <br></br>
         </div>
        
        <div className='image-container'>
         
              {images.length > 0 && images.map((image, index) => ( 

              
              <img
              className="imauploadedges" 
              key={index.toString(8)}
              src={image.secure_url}
              width="200"
              height="200"
              
              />
              
                
              ))}
        </div>
        </>
}
        
        </>
  )
}

export default UserUploads

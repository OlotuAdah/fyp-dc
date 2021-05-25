import React, { useRef, useState, useEffect } from 'react'
import { Ripple } from 'react-load-animations'
import Resizer from 'react-image-file-resizer'
// import axios from 'axios'
// import {Image} from 'cloudinary-react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
// import axios from 'axios'
import {
  Button,
  Typography,
  Grid,
  IconButton,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import SupervisedUserCircleSharpIcon from '@material-ui/icons/SupervisedUserCircleSharp'

// import HomeIcon from '@material-ui/icons/Home'
import WebIcon from '@material-ui/icons/Web'
// import MessageIcon from '@material-ui/icons/Message'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'
import LoadingOverlay from 'react-loading-overlay'
import { cloudinary } from '../utils/cloudinary'

// import Alert from './Alert'
import styles from './styles2'
import useWindowResize from './useWindowResize'

import { useAuth } from '../context/AuthProvider'
//import { createUpload } from '../firebase/user'
import axios from 'axios'
// import {useHistory } from 'react-router-dom'

function Profile () {
  const [loadPage, setLoadPage] = useState(true);
  const [previewSourece, setPreviewSource] = useState()
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false) // for overlay
  // const [openAlert, setOpenAlert] = useState(false) // for alert
  const inputRef = useRef(null)
  //const [images, setImages] = useState([]);
  const { logout, currentUser, uploadsCount, setUploadsCount, images ,setImages
  } = useAuth()
  const screenWidth = useWindowResize().width


  useEffect(async()=>{
    await axios.get(`https://futmx-cpe-fyp.herokuapp.com/uploads?uid=${currentUser.uid}`)
      .then(res => {
        //console.log(res)
        setImages(res.data.data)
      })
      //.then(result => console.log(result))
      .then(setLoadPage(false))
     // .catch(err => console.log(err))
    //return () => resp;

  }, []);

  useEffect(()=>{
    //console.log(images.length)
    setUploadsCount(images.length)
    //setLoadPage(false)
  })

  const uploadFile = async (files) => {
    // if (files[0].length > 1 *1024 * 1024 ){
    // setErr('File must be less than 1MB')
    // return
    // }
    

    Resizer.imageFileResizer(
      files[0], // the file from input
      480, // width
      480, // height
      "JPEG", // compress format WEBP, JPEG, PNG
      70, // quality
      0, // rotation
      async(uri) => {
        //const img = uri;
        try{
          setActive(true)
          //console.log('Cloudinary call ..')
          const uploadresponse = await cloudinary.v2.uploader.upload(uri, { upload_preset: 'adah-olotu' })
         // console.log(uploadresponse)
          setActive(false)

          //data to upload

          const data = { uid: currentUser.uid, public_id: uploadresponse.public_id, secure_url: uploadresponse.secure_url }

          await axios.post('https://futmx-cpe-fyp.herokuapp.com/createUploads', data).then(async(res)=>{
            await axios.get(`https://futmx-cpe-fyp.herokuapp.com/uploads?uid=${currentUser.uid}`)
            .then(res => {
              //console.log(res)
              setImages(res.data.data)})
            //console.log(res)
            setUploadsCount(images.length)
          })
          .then(Swal.fire('Image uploded successfully!'))
          
          .catch(err => {
            Swal.fire('Oops...', 'Something went wrong!', 'error')
            //console.log(err)
          });
        }
        catch(err){
          //console.log(err)
          Swal.fire('Oops...', 'Something went wrong!', 'error')

        }
        //console.log(imgString);
        // You upload logic goes here
      },
      "base64" // blob or base64 default base64
    );

    
      //console.log(files[0].name)
      // var image = new Image();
      // image.src = 'data:image/png;base64,iVBORw0K...'

      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onloadend = async () => {
        setPreviewSource(reader.result)
      
      }
    
  }


  const classes = styles()

  return (
    <React.Fragment>
        {loadPage ?
         <>
            <div className='loadAnimation'>
                    <Ripple />
            </div>
        </>
            : 
      <LoadingOverlay
        active={active}
        spinner
        text="Uploading image... Please wait."
        styles={{
          wrapper: { width: '100%', height: '100%' }
        }}
      >
        <div style={{ width: '100%' }}>
          <IconButton onClick={() => setOpen(!open)}>
            <MenuIcon
              style={{
                color: '#1CA261',
                fontSize: screenWidth < 800 ? 25 : 35
              }}
            />
          </IconButton>
        </div>

        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          style={{ width: 100 }}
        >
          <List>
            <ListItem
              component={Link}
              to="/profile"
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>
                <VerifiedUserIcon style={{ color: '#1CA261' }} />
              </ListItemIcon>
              <ListItemText style={{ color: '#1CA261' }}>
                &nbsp;profile
              </ListItemText>
            </ListItem>

            <ListItem
              component={Link}
              to="/home"
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>
                <WebIcon style={{ color: '#1CA261' }} />
              </ListItemIcon>
              <ListItemText style={{ color: '#1CA261' }}>
                &nbsp;uploads
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <SupervisedUserCircleSharpIcon style={{ color: '#1CA261' }} />
              </ListItemIcon>
              <Button
                variant="text"
                size="small"
                color="secondary"
                onClick={() => logout()}
              >
                logout
              </Button>
            </ListItem>
            <br />
            <Divider />
            <ListItem onClick={() => setOpen(false)}>
              <ListItemIcon>
                {open ? <ArrowBackIosIcon style={{ color: '#E61A5F' }} /> : ''}
              </ListItemIcon>
            </ListItem>
          </List>
        </Drawer>

        <Paper
          className={classes.bigPaper}
          style={{
            width: screenWidth < 800 ? '98%' : '55%',
            marginTop: 30,
            borderRadius: '1.5em'
          }}
          elevation={20}
        >
          <Grid container className={classes.gridContainer}>
            <Grid item>
              <IconButton className={classes.iconButton}>
                <AccountCircleRoundedIcon style={{ fontSize: 40 }} />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" className={classes.iconButton}>
                Upload 5 Images containing your face
              </Typography>
              <span className={classes.iconButton}>
                ( You have uploaded  <span style={{color:'red'}}>{ uploadsCount}</span> )
              </span>
            </Grid>
          </Grid>

          <Grid container className={classes.gridContainer}>
            <Grid item></Grid>
          </Grid>
          <div
            style={{
              width: '260px',
              height: '210px',
              marginBottom: '5px',
              marginTop: '20px',
              marginRight: 'auto',
              marginLeft: 'auto'
            }}
          >
            {previewSourece && (
              <img
                className='imagePreview'
                src={previewSourece}
                width="200px"
                style={{ maxHeight: '200px' }}
                alt=" "
              />
            )}

          </div>
          {/* <Button  variant="contained" style={{width:'30%', marginBottom:'200px', marginTop: '10px'}} color="secondary" onClick={()=>logout()}>Log out</Button> */}

          <Grid item>
            <Grid item>
              <input
                type="file"
                onChange={(e) => uploadFile(e.target.files)}
                style={{ display: 'none' }}
                accept=".png,.jpg"
                ref={inputRef}
              />
              <br />
              <Button
                disabled={images.length > 8 ? true: false }
                variant="contained"
                color="secondary"
                onClick={() => inputRef.current.click()}
              >
                Upload Image
              </Button>
            </Grid>

            <Grid item className={classes.miniFooter}>
              <Typography variant="caption"> &copy; FUTMX 2021 </Typography>
            </Grid>
          </Grid>
        </Paper>
      </LoadingOverlay>
      }
    </React.Fragment>
  )
}

export default Profile

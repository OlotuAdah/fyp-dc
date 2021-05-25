// const cloudinary = require('cloudinary').v2
// import cloudinary from 'cloudinary'

const cloudinary = require('cloudinary/lib/cloudinary');
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET

})

//console.log(process.env.REACT_APP_CLOUDINARY_NAME)

module.exports = { cloudinary }

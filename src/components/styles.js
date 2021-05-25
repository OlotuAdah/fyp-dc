import { makeStyles } from '@material-ui/core/styles'
// import backgroundWallpaper from '../images/wallpaper.jpg'

export const styles = makeStyles({
  bgPapper: {
    // background:'linear-gradient(45deg , #011627, #D24726 )',
    backgroundColor: '#FFFFFF',
    margin: 'auto',
    marginTop: 50,
    marginBottom: 50,
    color: '#fff',
    paddingTop: 5,
    paddingBottom: 30,
    // paddingRight:2,
    // paddingLeft:2,
    alignItems: 'center',
    borderRadius: 10,
    // minWidth: 300,
    maxWidth: 500,
    maxHeight: 600

  },
  successMsg: {
    color: '#008A00',
    marginBottom: 15
  },
  successResetMsg: {
    color: '#008A00',
    marginBottom: 15
    // backgroundColor: '#652D26'
  },
  spinner: {
    color: '#2e7d32'
  },
  link: {
    textDecoration: 'none',
    color: '#6EDA78'
  },
  userIcon: {
    width: '10%',
    height: '10%',
    color: '#1CA261'
  },
  root: {
    // backgroundColor: 'black',
    height: '100vh',
    maxWidth: 1000

  },
  gridItem: {
    backgroundColor: 'white',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // margin: 'auto',
    border: '5px solid white',
    width: '100%',
    minHeight: 600

  },

  slideContainer: {
    margin: 'auto',
    width: '60%'
    // color: 'black'
  },
  card: {
    width: '100%',
    height: '60vh'
  },
  media: {
    width: '100%',
    height: '60vh'
  },
  header: {
    position: 'absolute',
    color: 'white',
    bottom: 5,
    margin: 'auto'
  }
})

// // const SmallPaper = (props)=> <Paper {...props} className={classes.smPaper}></Paper>
// // const BigPaper = (props) =><Box {...props}  className={classes.bgPapper} />
// const CustomTextFied =(props)=> <TextField {...props} style={{width: '80%', margin: 15}} />

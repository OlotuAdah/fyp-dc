import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles({

  spinner: {
    color: '#2e7d32'
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'

  },
  appBar: {
    display: 'flex',
    justifySelf: 'center'
  },
  navGridItem: {
    display: 'flex',
    alignItems: 'center'
  },

  serachBarAndTypographyContainer: {
    width: '65%',
    height: '75vh',
    // backgroundColor: '#8DA4CD',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'

  },
  searchBarContainer: {
    width: '70%',
    height: '20%',
    // backgroundColor: 'greenyellow',
    textAlign: 'center'
    // alignItems: 'center'

  },
  typograpyContainer: {
    // backgroundColor: 'darkred',
    height: '80%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  /// // Login page styless
  gridItem: {
    width: '100%'
  },
  gridContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'

  },
  bigPaper: {
    // width: '45%',
    height: 'auto',
    backgroundColor: '#f2f4fa',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    paddingBottom: 10

  },
  link: {
    textDecoration: 'none',
    color: '#008A00',
    marginBottom: 10
  },
  miniFooter: {
    marginBottom: 8,
    marginTop: 18,
    textAlign: 'center'
  },

  /// //mobile view styles //////////

  radioContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 65,
    width: '100%'

  },
  radioItems: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-even',
    width: '100%'

  },
  input: {
    color: '#008A00'

  },
  iconButton: {
    color: '#1CA261'
  },

  theRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  fabButton: {

    top: 'auto',
    left: 'auto',
    right: 100,
    bottom: 20,
    position: 'fixed',
    color: '#F1F3F4',
    background: 'linear-gradient(90deg ,  #51AF33, #2B7CD3)',
    zIndex: 1
  }

})

export default styles

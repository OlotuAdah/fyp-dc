import React from 'react'
import {Dialog, DialogContent, DialogContentText, DialogActions, Button} from '@material-ui/core'


function Alert({openAlert}) {
    //const [alert, setAlert] = useState(openAlert)
    return (
        <>
        <Dialog open={openAlert}>
            <DialogContent>
                <DialogContentText>
                    Image Uploaded successfully..
                </DialogContentText>
            </DialogContent>
        <DialogActions>
        <Button
            variant="contained"
            //onClick={() => setAlert(false)}
            color="primary"
        >
        Okay
        </Button>
        </DialogActions>
        </Dialog>

            
        </>
    )
}

export default Alert;

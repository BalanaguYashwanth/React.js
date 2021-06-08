import React from 'react'
import {TextField, Button, Typography, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    input:{
        marginTop:10,
        marginBottom:10,
    }
})

export default function listenlinks(){

    const styles=useStyles()

    return(
        <div>
            <TextField  fullWidth label="Apple Podcasts" className={styles.input} />
            <TextField  fullWidth label="Google Podcasts" className={styles.input} />
            <TextField  fullWidth label="Spotify"  className={styles.input}  />
        </div>
    )
}


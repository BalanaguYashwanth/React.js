import React,{useState, useEffect} from 'react'
import { TextField, Typography, Button, makeStyles } from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles({

    input: {
        marginTop: 10,
        marginBottom: 10,
    }

})

export default function listeninputs() {

    const [episodenumber, setEpisodenumber] = useState('')
    const [episodetitle, setEpisodetitle] = useState('')
    const [timestamp, setTimestamp] = useState('')
    const [episodedescription, setEpisodedescription] = useState('')
    const [episodebanner, setEpisodebanner] = useState('')
    const [episodesponsor, setEpisodesponsor] = useState('')
    const [guestname, setGuestname] = useState('')
    const [guestimage, setGuestimage] = useState('')
    const [guestdesignation, setGuestdesignation] = useState('')
    const [guestlinkedin, setGuestlinkedin] = useState('')
    const [guesttwitter, setGuesttwitter] = useState('')
    const [otherlinks, setOtherlinks] = useState('')


    function send() {
        axios.post('http://127.0.0.1:8000/api/post/episode'+'/'+episodenumber, {
            Episode: episodenumber,
            Details: {
                Episode_number: episodenumber,
                Episode_title: episodetitle,
                Release_timestamp: timestamp,
                Episode_desc: episodedescription,
                Episode_banner: episodebanner,
                Episode_sponsor: episodesponsor,
                guest: {
                    Guest_Name: guestname,
                    Guest_Image: guestimage,
                    Guest_Designation: guestdesignation,
                    Guest_LinkedIn: guestlinkedin,
                    Guest_Twitter: guesttwitter,
                    Guest_Introduction: otherlinks
                }
            }

        }).then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const styles = useStyles()

    return (
        <div>
            <TextField label="Episode Number" className={styles.input} fullWidth onChange={(e) => setEpisodenumber(e.target.value)} />
            <TextField label="Episode Title" className={styles.input} fullWidth onChange={(e) => setEpisodetitle(e.target.value)} />
            <TextField type="datetime-local" style={{marginTop:15, marginBottom:10}} fullWidth onChange={(e) => setTimestamp(e.target.value)} />
            <TextField label="Episode Description" className={styles.input} fullWidth onChange={(e) => setEpisodedescription(e.target.value)} />
            <TextField label="Episode Banner" className={styles.input} fullWidth onChange={(e) => setEpisodebanner(e.target.value)} />
            <TextField label="Episode Sponsor" className={styles.input} fullWidth onChange={(e) => setEpisodesponsor(e.target.value)} />
            <TextField label="Guest Name" className={styles.input} fullWidth onChange={(e) => setGuestname(e.target.value)} />
            <TextField label="Guest Image" className={styles.input} fullWidth onChange={(e) => setGuestimage(e.target.value)} />
            <TextField label="Guest Designation" className={styles.input} fullWidth onChange={(e) => setGuestdesignation(e.target.value)} />
            <TextField label="Guest LinkedIn" className={styles.input} fullWidth onChange={(e) => setGuestlinkedin(e.target.value)} />
            <TextField label="Guest Twitter" className={styles.input} fullWidth onChange={(e) => setGuesttwitter(e.target.value)} />
            <TextField label="other links" className={styles.input} fullWidth onChange={(e) => setOtherlinks(e.target.value)} />
            <Button onClick={send} variant="contained" > submit </Button>
        </div>
    )
}

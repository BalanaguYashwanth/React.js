import React,{useEffect,useState} from 'react'
import axios from 'axios'
import fb from '../firebase'
import {useHistory} from 'react-router-dom'

export default function login(){
    const history = useHistory()

    const [login,setLogin] = useState({email:'',password:''})
    const [response,setResponse] = useState()

    function submitting(){
        fb.auth().signInWithEmailAndPassword(login.email,login.password)
        .then(res=>{
            //console.log('res',res.user.uid)
            localStorage.setItem('useruid',res.user.uid)
            history.push('/')
            location.reload()
        })
        .catch(err=>{
            console.log(err.message)
            setResponse(err.message)
        })

        // axios.post('https://alarm-a709f.firebaseio.com/app.json',{
        //    email:login.email,
        //    password:login.password,
        // })
        // .then(res=>{
        //     console.log(res.data)
        // })
        // .catch(err=>{
        //     console.log(err.message)
        // })
    }

    return(
        <div>
            <p>  Login </p>
            <input type="email" onChange={ (e) => ( setLogin({...login,email:e.target.value}) )} />
            <br />
            <input type="password" onChange={ (e) => ( setLogin({...login,password:e.target.value}) )}  />
            <br />
            <button onClick={submitting} > submit </button>
            <br />
            {response}
        </div>

    )
}

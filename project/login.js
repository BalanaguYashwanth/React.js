import React,{useEffect,useState} from 'react'
import axios from 'axios'
import fb from '../firebase'
import {useHistory} from 'react-router-dom'

export default function login(){
    const history = useHistory()

    const [login,setLogin] = useState({username:'',password:''})
    const [response,setResponse] = useState()

    function submitting(){
        axios.post('http://127.0.0.1:8000/login',{
           username:login.username,
           password:login.password,
        })
        .then(res=>{
            console.log(res.data)
            localStorage.setItem('token',res.data.token)
            history.push('/profile')
        })
        .catch(err=>{
            console.log(err.message)
        })
    }

    return(
        <div>
            <p>  Login </p>
            <input type="text" placeholder="enter the username" onChange={ (e) => ( setLogin({...login,username:e.target.value}) )} />
            <br />
            <input type="password" placeholder="enter the password" onChange={ (e) => ( setLogin({...login,password:e.target.value}) )}  />
            <br />
            <button onClick={submitting} > submit </button>
            <br />
            {response}
        </div>

    )
}

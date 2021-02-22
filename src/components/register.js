import React,{useEffect,useState} from 'react'
import axios from 'axios'
import fb from '../firebase'
import {useHistory} from 'react-router-dom'

export default function Register(){
    const history = useHistory();

    const [register,setRegister] = useState({email:'',password:''})
    const [response,setResponse] = useState()

    function submitting(){
        fb.auth().createUserWithEmailAndPassword(register.email,register.password)
        .then(res=>{
            console.log(res)
            
            history.push('/login')
        })
        .catch(err=>{
            console.log(err.message)
            setResponse(err.message)
        })
    }

    return(
        <div>
            <p>  Register </p>
            <input type="email" onChange={ (e) => ( setRegister({...register,email:e.target.value}) )} />
            <br />
            <input type="password" onChange={ (e) => ( setRegister({...register,password:e.target.value}) )}  />
            <br />
            <button onClick={submitting} > submit </button>
            <br />
            {response}
        </div>
    )
}

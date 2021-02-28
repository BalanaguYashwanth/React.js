import React,{useEffect,useState} from 'react'
import axios from 'axios'
import fb from '../firebase'
import {useHistory} from 'react-router-dom'

export default function Register(){
    const history = useHistory();

    const [register,setRegister] = useState({username:'',email:'',password:'',first_name:'',last_name:''})
    const [response,setResponse] = useState()

    function submitting(){
        console.log(register)
       axios.post('http://127.0.0.1:8000/register',{
           username:register.username,
           first_name:register.first_name,
           last_name:register.last_name,
           password:register.password,
           username:register.username,
           email:register.email,
       })
       .then(res=>{
           console.log(res)
            history.push('/login')
        })
       .catch(err=>console.log(err.response))
    }

    return(
        <div>
            <p>  Register </p>
            <input type="text" placeholder="enter the first name" onChange={ (e) => ( setRegister({...register,first_name:e.target.value}) )} />
            <br />
            <input type="text" placeholder="enter the last name" onChange={ (e) => ( setRegister({...register,last_name:e.target.value}) )} />
            <br />
            <input type="text" placeholder="enter the username" onChange={ (e) => ( setRegister({...register,username:e.target.value}) )} />
            <br />
            <input type="email" placeholder="enter the email" onChange={ (e) => ( setRegister({...register,email:e.target.value}) )} />
            <br />
            <input type="password"  placeholder="enter the password" onChange={ (e) => ( setRegister({...register,password:e.target.value}) )}  />
            <br />
            <button onClick={submitting} > submit </button>
            <br />
            {response}
        </div>
    )
}

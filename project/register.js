import React, { useEffect, useState } from 'react'
import axios from 'axios'
import fb from '../firebase'
import { useHistory } from 'react-router-dom'

export default function Register() {
    const history = useHistory();

    const [register, setRegister] = useState({ username: '', email: '', password: '', first_name: '', last_name: '' })
    const [response, setResponse] = useState()

    function submitting() {
        console.log(register)
        axios.post('http://127.0.0.1:8000/register', {
            username: register.username,
            first_name: register.first_name,
            last_name: register.last_name,
            password: register.password,
            username: register.username,
            email: register.email,
        })
            .then(res => {
                console.log(res)
                history.push('/login')
            })
            .catch(err => console.log(err.response))
    }

    return (
        <div>
            <div id="section" >
                <div id="body">
                    <div id="form" className="justify-content-center">
                        <div id="profilenamelogin" className="mx-auto " >
                            <i className="fa fa-users mx-auto my-2" style={{ fontSize: 80, textAlign: 'center' }}> <p style={{ fontStyle: 'oblique' }} > Register </p> </i>
                        </div>
                        <div className="form-row"  >
                            <div className="form-group  col-md " >
                                <input type="text" placeholder="enter the first name" className="form-control my-3"  onChange={(e) => (setRegister({ ...register, first_name: e.target.value }))} />
                                <input type="text" placeholder="enter the last name" className="form-control my-3" onChange={(e) => (setRegister({ ...register, last_name: e.target.value }))} />
                                <input type="text" placeholder="enter the username" className="form-control my-3" onChange={(e) => (setRegister({ ...register, username: e.target.value }))} />
                                <input type="email" placeholder="enter the email" className="form-control my-3" onChange={(e) => (setRegister({ ...register, email: e.target.value }))} />
                                <input type="password" placeholder="enter the password" className="form-control my-3" onChange={(e) => (setRegister({ ...register, password: e.target.value }))} />
                                <button onClick={submitting} className="mx-auto btn btn-light my-2"  id="button" > submit </button>
                                {response}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

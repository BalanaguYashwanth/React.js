import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function login() {
    const history = useHistory()

    const [login, setLogin] = useState({ username: '', password: '' })
    const [response, setResponse] = useState()

    function submitting() {
        if(login.username!='' && login.password!='')
        {
            axios.post('http://127.0.0.1:8000/login', {
                username: login.username,
                password: login.password,
            })
                .then(res => {
                    console.log(res.data)
                    localStorage.setItem('token', res.data.token)
                    history.push('/profile')
                })
                .catch(err => {
                    setResponse(err.response.data.user)
                    console.log(err.response.data)
                })
        }else{
            setResponse('please enter the valid details')
        }
       
    }

    return (
        <div>
            <div id="section" >
                <div id="body">
                    <div id="form" className="justify-content-center">
                        <div id="profilenamelogin" className="mx-auto" >
                        
                        <i className="fa fa-users mx-auto my-2" style={{ fontSize: 80, textAlign: 'center' }}> <p style={{ fontStyle: 'oblique' }} > Login </p> </i>
                        </div>
                        <div className="form-row"  >
                            <div className="form-group  col-md " >
                                <input type="text" placeholder="enter the Username" className="form-control my-3"  onChange={(e) => (setLogin({ ...login, username: e.target.value }))} />
                                <input type="password" placeholder="enter the Password" className="form-control my-3" onChange={(e) => (setLogin({ ...login, password: e.target.value }))} />
                                <button className="mx-auto btn btn-light" onClick={submitting} id="button"  > submit </button>
                                <div style={{ textAlign: 'center', alignItems: 'center' }}>
                                {response}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

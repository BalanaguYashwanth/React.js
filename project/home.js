import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function home() {

    const [option, setOption] = useState()
    const [message, setMessage] = useState()
    const [allhouses, setAllhouses] = useState()
    const [mainresult, setmainResult] = useState()
    const [loading, setLoading] = useState()

    function requesting() {
        axios.post('http://127.0.0.1:8000/api/transaction/', {
            option: option,
            message: message,
        })
            .then(res => {
                localStorage.setItem('loading', 'requesting')
                setLoading('requesting')
                console.log(res.data)
                localStorage.setItem('id', res.data.id)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => (

        axios.get('http://127.0.0.1:8000/api/member/')
            .then(res => {
                let array = []
                let result = res.data
                for (let obj in result) {
                    array.push(result[obj])
                }
                setAllhouses(array)
                //console.log(array)
            })
            .catch(err => console.log(err)),


        axios.get('http://127.0.0.1:8000/api/opinion/')
            .then(res => {
                setmainResult('')
                let result = res.data
                for (let obj in result) {
                    if (result[obj].new_id == localStorage.getItem('id')) {
                        localStorage.setItem('loading', 'successfully received')
                        setLoading('successully received')
                        setmainResult(result[obj])
                    }
                }

                //console.log(mainresult)
            })
            .catch(err => console.log(err)),

        setTimeout(function () {

            setLoading('');
            localStorage.setItem('loading', ' ');
            setmainResult('')

        }, 3000)


    ), [])

    return (
        <div>
            <div id="section" >
                <div id="body">
                    <div id="form" className="justify-content-center">
                        <div id="profilenamelogin" className="mx-auto" >

                            <i className="fa fa-home mx-auto my-2" style={{ fontSize: 80, textAlign: 'center' }}> <p style={{ fontStyle: 'oblique' }} > Home </p> </i>
                        </div>
                        <div className="form-row"  >
                            <div className="form-group  col-md " >
                                <select  style={{textAlign:'center',alignItems:'center', justifyContent:'center'}} onChange={(e) => setOption(e.target.value)} className="form-control " >
                                    <option value="" > Select the house no. </option>
                                    {
                                        allhouses && allhouses.map((house, index) => (
                                            <option key={index} value={house.flat + '-' + house.name} > {house.flat} </option>
                                        ))
                                    }
                                </select>
                                <br />
                                <input placeholder="enter the message"  style={{textAlign:'left',alignItems:'left', justifyContent:'left'}}  className="form-control" onChange={(e) => setMessage(e.target.value)} />
                                <br />

                                <button className="mx-auto btn btn-light" id="button" onClick={requesting} > request </button>
                                <br />
                                <div style={{textAlign:'center',alignItems:'center'}}>
                               <mark> {localStorage.getItem('loading')}
                                {
                                    mainresult && <p> {mainresult.user + "   " + mainresult.response + 'the delivery'} </p>
                                }
                                </mark>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

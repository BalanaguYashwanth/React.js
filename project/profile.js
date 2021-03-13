import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';

export default function member() {
    const history = useHistory()
    const [name, setName] = useState()
    const [house, setHouse] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [alldetails, setAlldetails] = useState([])
    const [requests, setRequests] = useState([])
    const [flat, setFlat] = useState()
    const [flag, setFlag] = useState(false)
    const [firstname, setFirstname] = useState()
    const [popupflag, setPopupflag] = useState(false)
    const [message, setMessage] = useState('No Requests')
    const [option, setOption] = useState()
    const [id, setId] = useState()
    const [response, setResponse] = useState()

    useEffect(() => {
        let axiosConfig = {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token')
            }
        }

        axios.get('http://127.0.0.1:8000/userdetails', axiosConfig)
            .then(res => {
                //console.log(res.data)
                let result = res.data
                for (let obj in result) {
                    var person = result[obj].username
                    //console.log(result[obj].username)
                    setName(result[obj].username)
                    getrequests(result[obj].username)
                }
            })
            .catch(err => console.log(err))

        axios.get('http://127.0.0.1:8000/api/member/')
            .then(res => {
                let array = []
                let result = res.data
                for (let obj in result) {
                    array.push(result[obj])
                }
                //console.log(array)
                setAlldetails(array)

            })
            .catch(err => console.log(err))


        function getrequests(data) {
            var all = []
            axios.get('http://127.0.0.1:8000/api/opinion/')
                .then(async res => {
                    let result = await res.data
                    for (let objx in result) {
                        await all.push(parseInt(result[objx].new_id))
                    }
                })
                .catch(err => console.log(err.response))

            axios.get('http://127.0.0.1:8000/api/transaction/')
                .then(async res => {
                    let mainresult = await res.data
                    for (let obj in mainresult) {
                        if ((mainresult[obj].option).split('-')[1] == data) {
                            console.log("id", mainresult[obj].id, all)
                            let n = await all.includes(mainresult[obj].id)

                            if (n) {
                                console.log('done')
                            }
                            else {
                                if (all != '') {
                                    let txt;
                                    setMessage(mainresult[obj].message)
                                    setOption(mainresult[obj].option)
                                    setId(mainresult[obj].id)
                                    setPopupflag(true)
                                    // if (confirm(mainresult[obj].message)) {
                                    //     axios.post('http://127.0.0.1:8000/api/opinion/', {
                                    //         response: 'accepted',
                                    //         new_id: mainresult[obj].id,
                                    //         user: mainresult[obj].option
                                    //     })
                                    // }
                                    // else {
                                    //     axios.post('http://127.0.0.1:8000/api/opinion/', {
                                    //         response: 'rejected',
                                    //         new_id: mainresult[obj].id,
                                    //         user: mainresult[obj].option
                                    //     })
                                    // }
                                }
                            }

                        }
                    }
                })
                .catch(err => console.log(err.response))
        }
    }, [])

    function logout() {
        localStorage.removeItem('token')
        history.push('/login')
    }

    function posting() {
        if(phonenumber!="" && flat!="" )
        {   
        if(phonenumber.length==10)
        {
            axios.post('http://127.0.0.1:8000/api/member/', {
                flat: house,
                name: name,
                phonenumber: phonenumber

            }).then(res => {
                console.log(res.data)
                location.reload()
            })
                .catch(err => console.log(err))
        }
        else{
            setResponse('phonenumber must be 10 digits')
        }
        
    }
    else{
        setResponse('please enter valid details')
    }
    }

    function specific(data) {

        let arrs = []
        let flatno = ''
        if (data.name == name) {

            flatno = data.flat
            arrs.push(data)
        }


        return (
            <div>
                {
                    arrs.map((arr, index) => (
                        <p key={index}  >  Registered user :-   {arr.flat} {arr.name} {arr.phonenumber} </p>
                    ))
                }
            </div>
        )
    }

    async function acceptrequest()
    {
        await axios.post('http://127.0.0.1:8000/api/opinion/', {
            response: 'accepted',
            new_id: id,
            user: option,
            
        })
        setPopupflag(false)
    }

    async function declinerequest()
    {  
        await axios.post('http://127.0.0.1:8000/api/opinion/', {
            response: 'rejected',
            new_id: id,
            user: option
        })
        setPopupflag(false)
    }

    function popuptoggle() {
        setPopupflag(!popupflag)
    }

    return (
        <div>
            {/* <button onClick={popuptoggle} > press me </button> */}
            {popupflag && <div >
                <div id="popup">
                    <div id="header" style={{ fontSize: 30 }}> Confirmation </div>

                    <span > {message} </span>
                    <br />
                    <button id="custombutton"  onClick={acceptrequest} > Accept </button>
                    <button id="custombutton" onClick={declinerequest} > Decline </button>
                </div>
            </div>
            }
            <div id="section" >

                <div id="body">
                    {/* <h4 className="display-4" id="profile"> Profile </h4>
            <input placeholder="enter the name" />
            <br />
            <input placeholder="enter the phonenumber no." onChange={(e) => setPhonenumber(e.target.value)} />
            <br />
            <input placeholder="enter the house ex:-LH1,LH3 etc" onChange={(e) => setHouse(e.target.value)} />
            <br />
            <button onClick={posting} > submit </button>
            <button onClick={logout} > logout   </button>
            <br />
            <br />
            {
                alldetails.map((detail, index) => (
                    <div key={index} > {specific(detail)} </div>
                ))
            } */}
                    
                    <div id="form" className="justify-content-center">
                        
                        <div className="form-row"  >
                            <div id="profilename" className="mx-auto" >
                                <i className="fa fa-user-circle-o mx-auto" style={{ fontSize: 80, textAlign: 'center', textDecorationLine: 'underline', textDecorationColor: 'green' }}> <p style={{ fontStyle: 'oblique' }} > profile <button className="mx-auto btn btn-light my-2" style={{border:0, backgroundColor:'green'}} id="buttonprofile" onClick={logout}> <i className="fa fa-sign-out" style={{fontSize:36}}></i>  </button>   </p> </i>
                            </div>
                            
                            <div className="form-group  col-md " >
                            <div style={{ textAlign: 'center', alignItems: 'center' }}>
                                     My Profile   
                                    
                                </div>
                                {/* <input type="text"  placeholder="enter the name" className="form-control my-3 " />    */}
                                <input type="number" placeholder="enter the phonenumber" className="form-control my-3" onChange={(e) => setPhonenumber(e.target.value)} />
                                <input type="text" placeholder="enter the flat no. ex:-LH1,LH3 etc" className="form-control my-3" onChange={(e) => setHouse(e.target.value)} />
                                <button className="mx-auto btn btn-light my-2" id="buttonprofile" onClick={posting} > submit </button>
                                <div style={{ textAlign: 'center', alignItems: 'center' }}>
                                {response && response}
                                    {
                                        
                                        alldetails.map((detail, index) => (
                                            <div key={index} > {specific(detail)} </div>
                                        ))
                                    }
                                </div>
                                    
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function member() {
    const history = useHistory()

    const [name, setName] = useState()
    const [house, setHouse] = useState()
    const [phonenumber, setPhonenumber] = useState()
    const [alldetails, setAlldetails] = useState([])
    const [requests, setRequests] = useState([])
    const [flat, setFlat] = useState()

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

                                    if (confirm(mainresult[obj].message)) {
                                        axios.post('http://127.0.0.1:8000/api/opinion/', {
                                            response: 'accepted',
                                            new_id: mainresult[obj].id,
                                            user: mainresult[obj].option
                                        })
                                    }
                                    else {
                                        axios.post('http://127.0.0.1:8000/api/opinion/', {
                                            response: 'rejected',
                                            new_id: mainresult[obj].id,
                                            user: mainresult[obj].option
                                        })
                                    }
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
        axios.post('http://127.0.0.1:8000/api/member/', {
            flat: house,
            name: name,
            phonenumber: phonenumber
        }).then(res =>{
             console.log(res.data)
            location.reload()
            })
            .catch(err => console.log(err))
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
                        <p key={index}  >  Registered address :-   {arr.flat} {arr.name} {arr.phonenumber} </p>
                    ))
                }
            </div>
        )
    }




    return (
        <div>
            <h4 className="display-4"  > Profile </h4>
            <input placeholder="enter the house ex:-LH1,LH3 etc" onChange={(e) => setHouse(e.target.value)} />
            <br />
            <input placeholder="enter the phonenumber no." onChange={(e) => setPhonenumber(e.target.value)} />
            <br />
            <button onClick={posting} > submit </button>
            <button onClick={logout} > logout   </button>

            <br />
            <br />

            {
                alldetails.map((detail, index) => (
                    <div key={index} > {specific(detail)} </div>
                ))
            }

        </div>
    )
}

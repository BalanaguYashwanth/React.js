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
                localStorage.setItem('loading','requesting')
                setLoading('requesting')
                console.log(res.data)
                localStorage.setItem('id',res.data.id)
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
                if(result[obj].new_id == localStorage.getItem('id'))
                {
                    localStorage.setItem('loading','successfully received')
                    setLoading('successully received')
                    setmainResult(result[obj])
                }
            }

            //console.log(mainresult)
        })
        .catch(err => console.log(err)),

        setTimeout(function(){ 
        
        setLoading('');
        localStorage.setItem('loading',' ');
        setmainResult('')
        
        }, 3000)


    ),[])

    return (
        <div>
            <p className="display-4 "> Home </p>
            <select onChange={(e) => setOption(e.target.value)} >
                <option value="" > Select the house no. </option>
                {
                    allhouses && allhouses.map((house, index) => (

                        <option key={index} value={house.flat + '-' + house.name} > {house.flat} </option>

                    ))
                }
            </select>
            <br />
            <input placeholder="enter the message" onChange={(e) => setMessage(e.target.value)} />
            <br />

            <button onClick={requesting} > request </button>
            <br />
            {localStorage.getItem('loading')}
            {
                mainresult && <p> {mainresult.user+"   "+ mainresult.response+'the delivery'} </p>
            }
        </div>
    )
}

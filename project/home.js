import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function home(){

    const [option,setOption] = useState()
    const [message,setMessage] = useState()
    const [allhouses,setAllhouses] = useState()

    function requesting(){
            axios.post('http://127.0.0.1:8000/api/transaction/',{
                option:option,
                message:message,
            })
            .then(res=>console.log(res))
            .catch(err=>console.log(err)) 
    }

    useEffect( () => (
        axios.get('http://127.0.0.1:8000/api/member/')
        .then(res=>{
            let array=[]
            let result = res.data
            for(let obj in result)
            {
                array.push(result[obj])
            }
            setAllhouses(array)
            //console.log(array)
        })
        .catch(err=>console.log(err))
    ),[])

    return(
        <div>
            <p className="display-4 "> Home </p>
            <select onChange={(e) => setOption(e.target.value) } >
                <option value="" > Select the house no. </option>
                {
                    allhouses && allhouses.map( (house,index) => (
                    
                        <option key={index} value={house.flat+'-'+house.name} > {house.flat} </option>
                        
                    ))
                }
            </select>
            <br />
            <input placeholder="enter the message" onChange={(e) => setMessage(e.target.value) } />
            <br />
            <button onClick={requesting} > request </button>
        </div>
    )
}

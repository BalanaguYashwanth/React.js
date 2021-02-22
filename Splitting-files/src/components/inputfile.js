import React,{useEffect,useState} from 'react'
import axios from 'axios'
import fb from '../firebase'
import {useHistory} from 'react-router-dom'
import FileViewer from 'react-file-viewer';


export default function inputfile() {
    const history = useHistory()
    const [name,setName]=useState()
    const [url,setUrl] = useState() 
    const[response,setResponse]=useState()
    const[user,setUser]=useState()
    const[loading,setLoading]=useState()
    const[array,setArray]=useState(['data is loading....'])
    const [buffer,setBuffer] = useState()

    useEffect(() =>{
        var user=fb.auth().currentUser;
        if(user!=null)
        {
            setUser(user.email);
            localStorage.setItem('useruid',user.uid)
        }

        axios.get('https://alarm-a709f.firebaseio.com/images.json')
        .then(res=>{
            let result=res.data
            let array=[]
            for(let obj in result)
            {
                if(localStorage.getItem('useruid')==result[obj].useruid)
                {
                    array.push(result[obj])                  
                }
            }
            setArray(array)
        })
        .catch(err=>console.log(err))
    },[array])

    function filechange(file){
        setLoading('please wait file is loading')
        const data = new FormData()
        data.append('img',file)
        axios.post('http://127.0.0.1:5000/imagecompressor',data)
        .then(res=>{
            console.log(res.data)
            //setUrl(res.data.url)
            setName(res.data.name)
            setLoading('successfully uploaded')
        })
        .catch(err=>console.log(err.message))
    }

  
    function submitting(){
        var d=new Date();
        if(name!='' && name!=null)
        {
        axios.post('https://alarm-a709f.firebaseio.com/images.json',{
            name:name,
            time:d.getHours()+'/'+d.getMinutes()+'/'+d.getSeconds()+'---'+(d.getMonth()+1)+'/'+d.getFullYear(),
            useruid:localStorage.getItem('useruid'),
        })
        .then(res=>{
            setResponse('successfully submitted')
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err.message)
            setResponse('something went wrong please check')
        })
    }else{
        setResponse('please insert the file for futher process')
    }
    }

    function logout(){
        fb.auth().signOut()
        localStorage.removeItem('useruid')
        history.push('/login')
    }

    function send(data){
        axios.post('http://127.0.0.1:5000/getfolder',{
            name:data
        }).then(res=>{
            console.log(res.headers)
            //res.data="data:image/jpeg;base64,"+btoa(unescape(encodeURIComponent(res.data)))
            //res.data=window.URL.createObjectURL(res.data)
            res.data="data:image/jpeg;base64,"+Buffer.from(res.data).toString("base64");
            console.log(res.data)
            setBuffer(res.data)
            alert(' successfully received')
        })
        .catch(err=>console.log(err))
    }

    return(
        <div>
           <input type="file"  onChange={ (event) => (filechange(event.target.files[0])) }  />
           <br />
           <button onClick={submitting} > submit </button>
           <br /> 
           <button onClick={logout} > logout </button> 
           <br />
           <p> {loading} </p>
          {response}
          <br />
            {'-------------------------'}
            <div>
              { 
                array.map( (link,index) => (
                <p key={index} >   

                    {index+1})  {link.name} {'->'} ({link.time} )   
                    <button onClick={ () => send(link.name) } > preview </button>

                </p>
                ))
              }
            </div>

        { 
          
          buffer && <img src={buffer} type="image/jpeg"   height="500px" width="500" />
           
        }



        </div>
    )
}

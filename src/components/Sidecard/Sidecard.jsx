import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {setA,setC} from '../../store/ASlice'
import ids from '../../ids/ids.js';

function Sidecard(props){
    const [items,setItem] = useState([]);
    const [loading,setLoading] = useState([true]);

    useEffect(()=>{

        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        const d= `${month}/${date}/${year}`;
        const s=props.file;
        const options = {
            method: 'POST',
            url: 'https://newsnow.p.rapidapi.com/',
            headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '5364c010admsh6038e5c61297852p176776jsnf8192e3fa605',
            'X-RapidAPI-Host': 'newsnow.p.rapidapi.com'
            },
            data: {
            text: s,
            region: 'wt-wt',
            max_results: 3
            }
        };
        axios.request(options)
        .then((response)=>{
            console.log("kkk",response.data.news);
            setItem(response.data.news);
        })
        .catch((error)=>{
            console.error(error);
            })
    },[])
    useEffect(()=>{
        console.log(items);
        setLoading(false);
    },[items])
    return (
            !loading?
            <div className=' w-full h-full p-1 bg-sky-300 bg-opacity-70 rounded-md'>
                <Link to={`/cardc/${props.file}`}>
                    <div className=' w-full m-1'>
                        <h2 className=' align-middle '>{props.file}</h2>
                    </div>
                </Link>
                <div className='flex flex-row w-full h-auto md:flex-col'>
                    {items.map((file)=>{
                        return(
                            <div onClick={()=>{props.upd(file);props.updc(file.content)}} className=' w-full  p-1 md:w-full lg:w-full h-auto'>
                            <Link  to={`/article/${file.title}`}>
                            <div key={file.title} className=' p-0 text-zinc-100 align-middle w-24 md:w-full justify-items-center h-32 md:h-auto'>
                                    <div className="flex h-full md:h-auto flex-col justify-between p-1 leading-normal">
                                        <h5 className="mb-2 h-32 md:h-auto hover:bg-sky-200 bg-sky-100 rounded-md p-1 text-xs font-bold tracking-tight text-gray-900">{file.title}</h5>
                                    </div>
                            </div>
                            </Link>
                            </div>
                        )
                        })
                    }
                </div>
            </div>:<h1>loading</h1>
    )
}

const mapStateToProps = (state)=>{
    return{
        f:state.log.file,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        upd:(file)=>{dispatch(setA(file))},
        updc:(c)=>{dispatch(setC(c))},
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Sidecard)

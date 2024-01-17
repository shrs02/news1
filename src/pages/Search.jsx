import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Card from '../components/Card/Card.jsx'
import { Link, useNavigate, useParams } from "react-router-dom";
import ids from '../ids/ids.js';
import { connect } from 'react-redux';
import {setA,setC} from '../store/ASlice'

function Search(props){
    const [items,setItem] = useState([]);
    const [loading,setLoading] = useState([true]);
    const { slug } = useParams();

    useEffect(()=>{

        let options = {
            method: 'POST',
            url: 'https://newsnow.p.rapidapi.com/',
            headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'd31d97453emshb056178a4e06a3ap181c9ajsn2a2176f3dad3',
            'X-RapidAPI-Host': 'newsnow.p.rapidapi.com'
            },
            data: {
            text: slug,
            region: 'wt-wt',
            max_results: 50,
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
    },[slug])
    useEffect(()=>{
        console.log(items);
        setLoading(false);
    },[items])
    return (
            !loading?
            <div className=' md:fixed 40-40 overflow-y-scroll overflow-x-hidden scrollbar-none md:top-42 md:left-40 lg:left-48 w-full h-full md:right-40 lg:right-48 md:w-auto  m-2 flex flex-wrap'>
                {items.map((file)=>{
                    return(
                        <div onClick={()=>{props.upd(file);props.updc(file.content)}} className=' w-full  p-1 md:w-1/2 lg:w-1/4 h-auto'>
                        <Link  to={`/article/${file.title}`}>
                        <div key={file.title} >
                            <Card  {...file}/>
                        </div>
                        </Link>
                        </div>
                    )
                    })
                }
            </div>
            :<h1>loading</h1>
    )
}

const mapStateToProps = (state)=>{
    return{
        f:state.log.file,
        c:state.log.content,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        updatel:(curr)=>{dispatch(setLoad(curr))},
        upd:(file)=>{dispatch(setA(file))},
        updc:(c)=>{dispatch(setC(c))},
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Search)

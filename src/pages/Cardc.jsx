import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Card from '../components/Card/Card.jsx'
import {useSelector} from 'react-redux'
import { connect } from 'react-redux';
import { setLoad} from '../store/ASlice.js'
import { Link, useNavigate, useParams } from "react-router-dom";
import ids from '../ids/ids.js';
import {setA,setC} from '../store/ASlice'

function Cardc(props){
    const [items,setItem] = useState([]);
    const loading=props.load;
    const count=useSelector((state) => state.log.userCount);
    const log=useSelector((state) => state.log.logged);
    const {slug} = useParams();

    useEffect(()=>{
        let options = {
            method: 'POST',
            url: 'https://newsnow.p.rapidapi.com/',
            headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '82be637fcbmshd9f7cd092179420p1eb0f7jsnfafd7016c7b5',
            'X-RapidAPI-Host': 'newsnow.p.rapidapi.com'
            },
            data: {
            text: slug,
            region: 'wt-wt',
            max_results: 16,
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
        props.updatel(false);
    },[items])
    return (
            !loading?
            <div className=' md:fixed pb-40 scroll-y-scroll overflow-x-hidden scrollbar-none md:top-40 md:left-40 lg:left-48 w-full h-full md:right-40 lg:right-48 md:w-auto  m-2 flex flex-wrap'>
                {items.map((file)=>{
                    return(
                        <div onClick={()=>{props.upd(file);props.updc(file.content)}} className=' w-full  p-1 md:full-1/2 lg:w-1/4 h-auto'>
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
        load:state.log.loading,
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
export default connect(mapStateToProps,mapDispatchToProps)(Cardc)
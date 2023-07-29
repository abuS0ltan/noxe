import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Head from '../Head/Head';
import DataShow from '../DataShow/DataShow';
export default function People() {
  let [data, setdata] = useState([]);
  let [mainTitle,setMainTilte]=useState('People');
  let [people, setPeople] = useState([]);
  let getData=async (url,collback)=>{
    let { data }=await axios.get(url);
    collback(data.results);
    console.log(data.results);
  };
  useEffect(()=>{
    getData('https://api.themoviedb.org/3/trending/person/day?api_key=085e63afd0a9d4557f1d96bbe7101ffa',setPeople)
  },[]);
  useEffect(()=>{
    makeData();
  },[people])
      // ==================================make array of data to send to data Show===========================================
      let makeData=async ()=>{
        let dataToSent= people.map((ele)=>{
          let info = {
            id:ele.id,
            title:ele.original_name,
            image:ele.profile_path,
            rating:ele.popularity.toFixed(1),
          }
          return info;
        });
        console.log(dataToSent);
        setdata(dataToSent);
    }
    // ==================================end make array of data to send to data Show===========================================
  return (
    <div className='people'>
      <Head mainTitle={mainTitle}/>
      <DataShow data ={data} type={'person'}/>
    </div>
  )
}

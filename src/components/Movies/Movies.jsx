import React, { useEffect, useState } from 'react'
import './movies.css'
import axios from 'axios';
import Head from '../Head/Head';
import DataShow from '../DataShow/DataShow';
import Loding from '../Loding/Loding';
export default function Movies() {
  let [lodindScrren,setLodingScrren]=useState(true);
  let [data, setdata] = useState([]);
  let [movies,setMovies]=useState([]);
  let [mainTitle,setMainTilte]=useState('Movies');
  let getTreand = async (url,collback) => {
    let { data } = await axios.get(url);
    setLodingScrren(false);
    collback(data.results);
  }
    useEffect(() => {
     getTreand(`https://api.themoviedb.org/3/discover/movie?api_key=085e63afd0a9d4557f1d96bbe7101ffa`,setMovies);
  }, []);
  useEffect(()=>{
    makeData();
  },[movies])
  //===================================stop loding screen========================
  
  // ==================================make array of data to send to data Show===========================================
  let makeData=async ()=>{
      let dataToSent= movies.map((ele)=>{
        let info = {
          id:ele.id,
          title:ele.title,
          image:ele.poster_path,
          rating:ele.vote_average.toFixed(1),
        }
        return info;
      });
      setdata(dataToSent);
  }
  // ==================================end make array of data to send to data Show===========================================

  return (
    <div className='movies'>
      {
        lodindScrren?
        <>
          <Loding/>
        </>
        :
        <></>
      }
      <Head mainTitle={mainTitle}/>
      <DataShow data={data} type={'movie'}/>
    </div>
  )
}

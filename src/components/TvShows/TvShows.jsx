import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Head from '../Head/Head';
import DataShow from '../DataShow/DataShow';
import Loding from '../Loding/Loding';
export default function TvShows() {
  let [lodindScrren,setLodingScrren]=useState(true);
  let [data, setdata] = useState([]);
  let [tvShows, setTvShows] = useState([]);
  let [mainTitle,setMainTilte]=useState('Tv Shows');
  let getTreand = async (url,collback) => {
    let { data } = await axios.get(url);
    setLodingScrren(false);
    collback(data.results);
    console.log(data.results);
  }
    useEffect(() => {
    getTreand(`https://api.themoviedb.org/3/discover/tv?api_key=085e63afd0a9d4557f1d96bbe7101ffa`,setTvShows);
  }, []); 
  useEffect(()=>{
    makeData();
  },[tvShows])
    // ==================================make array of data to send to data Show===========================================
    let makeData=async ()=>{
      let dataToSent= tvShows.map((ele)=>{
        let info = {
          id:ele.id,
          title:ele.original_name,
          image:ele.poster_path,
          rating:ele.vote_average.toFixed(1),
        }
        return info;
      });
      console.log(dataToSent);
      setdata(dataToSent);
  }
  // ==================================end make array of data to send to data Show===========================================
  return (
    <div className='tvShows'>
      {
        lodindScrren?
        <>
          <Loding/>
        </>
        :
        <></>
      }
      <Head mainTitle={mainTitle}/>
      <DataShow data={data} type={'tv'}/>
    </div>
  )
}

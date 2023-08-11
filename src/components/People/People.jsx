import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Head from '../Head/Head';
import DataShow from '../DataShow/DataShow';
import Loding from '../Loding/Loding';
import './people.css';
export default function People() {
  let [data, setdata] = useState([]);
  let [lodindScrren,setLodingScrren]=useState(true);
  let [mainTitle,setMainTilte]=useState('People');
  let [people, setPeople] = useState([]);
  let getData=async (url,collback)=>{
    setLodingScrren(true);
    let { data }=await axios.get(url);
    setLodingScrren(false);
    collback(data.results);
    console.log(data.results);
  };
  useEffect(()=>{
    getData('https://api.themoviedb.org/3/trending/person/day?api_key=085e63afd0a9d4557f1d96bbe7101ffa',setPeople);
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
    //===================================search==========================================
    let search=()=>{
      let searchInput=document.querySelector('.searchInput');
      console.log(searchInput.value);
      let name=searchInput.value;
      getData(`https://api.themoviedb.org/3/search/person?query=${name}&api_key=085e63afd0a9d4557f1d96bbe7101ffa`,setPeople);
    };
    //==========================================reset======================================
    let reset=()=>{
      let searchInput=document.querySelector('.searchInput');
      searchInput.value='';
      getData('https://api.themoviedb.org/3/trending/person/day?api_key=085e63afd0a9d4557f1d96bbe7101ffa',setPeople);
    }
    return (
    <div className='people'>
      {
        lodindScrren?
        <>
          <Loding/>
        </>
        :
        <></>
      }
      <Head mainTitle={mainTitle}/>
      <div className="row justify-content-center my-5">
          <div className="col-md-10 col-xl-8">
            <div className="searchDiv container">
              <div className="input-group ">
                <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
                <input type="text" className="form-control searchInput" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                <button className='input-group-text btn searchBtn' onClick={()=>search()}>search</button>
                <button className='input-group-text btn resetBtn' onClick={()=>reset()}>Reset</button>
              </div>
            </div>
          </div>

        </div>
      <DataShow data ={data} type={'person'}/>
    </div>
  )
}

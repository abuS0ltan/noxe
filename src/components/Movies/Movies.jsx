import React, { useEffect, useState } from 'react'
import './movies.css'
import axios from 'axios';
import Head from '../Head/Head';
import DataShow from '../DataShow/DataShow';
import Loding from '../Loding/Loding';
export default function Movies() {
  let [lodindScrren, setLodingScrren] = useState(true);
  let [data, setdata] = useState([]);
  let [movies, setMovies] = useState([]);
  let [mainTitle, setMainTilte] = useState('Movies');
  let [prefixImage] = useState('https://image.tmdb.org/t/p/w500/');
  let getTreand = async (url, collback) => {
    setLodingScrren(true);
    let { data } = await axios.get(url);
    setLodingScrren(false);
    collback(data.results);
  }
  useEffect(() => {
    document.title=`Noxe: Movies`;
    getTreand(`https://api.themoviedb.org/3/discover/movie?api_key=085e63afd0a9d4557f1d96bbe7101ffa`, setMovies);
  }, []);
  useEffect(() => {
    makeData();
  }, [movies])
  //===================================stop loding screen========================

  // ==================================make array of data to send to data Show===========================================
  let makeData = async () => {
    let dataToSent = movies.map((ele) => {
      let info = {
        id: ele.id,
        title: ele.title,
        image: ele.poster_path!=null ? prefixImage+ele.poster_path:'/default-image.jpg',
        rating: ele.vote_average.toFixed(1),
      }
      return info;
    });
    setdata(dataToSent);
  }
  // ==================================end make array of data to send to data Show===========================================
  //===================================search==========================================
  let search = () => {
    let searchInput = document.querySelector('.searchInput');
    let name = searchInput.value;
    getTreand(`https://api.themoviedb.org/3/search/movie?query=${name}&api_key=085e63afd0a9d4557f1d96bbe7101ffa`, setMovies);
  };
  //==========================================reset======================================
  let reset = () => {
    let searchInput = document.querySelector('.searchInput');
    searchInput.value = '';
    getTreand(`https://api.themoviedb.org/3/discover/movie?api_key=085e63afd0a9d4557f1d96bbe7101ffa`, setMovies);
  }
  return (
    <div className='movies'>
      {
        lodindScrren ?
          <>
            <Loding />
          </>
          :
          <></>
      }
      <Head mainTitle={mainTitle} />
      <div className="row justify-content-center my-5">
        <div className="col-md-10 col-xl-8">
          <div className="searchDiv container">
            <div className="input-group">
              <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
              <input type="text" className="form-control searchInput" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
              <button className='input-group-text btn searchBtn' onClick={() => search()}>search</button>
              <button className='input-group-text btn resetBtn' onClick={() => reset()}>Reset</button>
            </div>
          </div>
        </div>

      </div>
      <DataShow data={data} type={'movie'} />
    </div>
  )
}

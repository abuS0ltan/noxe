import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loding from '../Loding/Loding';
import './home.css';
import './homeMq.css'
import WeekTrend from './HomeComponents/WeekTrend/WeekTrend';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
export default function Home() {
  let [lodindScrren,setLodingScrren]=useState(true);
  let [trendMoviesDay, setTrendMoviesDay] = useState([]);
  let [trendTv, setTrendTv] = useState([]);
  let navigate=useNavigate();
  useEffect(() => {
    document.title=`Noxe: Home`;
    getTreand(`https://api.themoviedb.org/3/trending/movie/day?api_key=085e63afd0a9d4557f1d96bbe7101ffa`, setTrendMoviesDay);
    getTreand(`https://api.themoviedb.org/3/trending/tv/day?api_key=085e63afd0a9d4557f1d96bbe7101ffa`, setTrendTv);
  }, []);
  let [prefixImage] = useState('https://image.tmdb.org/t/p/w500/');
  let getTreand = async (url, collback) => {
    setLodingScrren(true);
    let { data } = await axios.get(url);
    setLodingScrren(false);
    collback(data.results);
  }
    //=======================made go to details================================
    let goToDetails=(id,type)=>{
      navigate({
        pathname:'/details',
        search:`?id=${id}&type=${type}`,
      }
      );
    }
    //=======================end made details================================
  return (
    <div className='home'>
      {
        lodindScrren?
        <>
          <Loding/>
        </>
        :
        <></>
      }
      <header className='header'>
        <div className="container">
          <p className="wlecome">Welcome.</p>
          <h1 className="headTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </h1>
        
        </div>
      </header>
      <div className="container">
        <WeekTrend />
        <div className="treanding">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="infoContent">
                <h2 className="mainTitle">
                  Trending TV Shows to Watch Now
                </h2>
                <p className="info">
                  Most watched TV Shows this day
                </p>
              </div>
            </div>
            {
              trendTv.map((ele, index) => {
                return (
                  <div className="col-lg-2 col-md-3 col-6 ele" key={index} >
                    <div className="moviesInfo">
                      <div className="overlay">
                        <button className='btn' onClick={()=>goToDetails(ele.id,'tv')}>Watch Now</button>
                      </div>
                      <img src={prefixImage + ele.poster_path} alt="" className='movieImage' />
                      <div className="titleDiv">
                        <h3 className="moveTitle">{ele.original_name}</h3>
                      </div>
                      <span className='rating'>{ele.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                );
              })
            }

          </div>
        </div>
      </div>

    </div>
  )
}

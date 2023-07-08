import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function WeekTrend() {
    let getTreand = async (url,collback) => {
        let { data } = await axios.get(url);
        collback(data.results);
        console.log(data.results);
      }
      let [trendMoviesWeek, setTrendMoviesWeek] = useState([]);
      useEffect(() => {
        getTreand(`https://api.themoviedb.org/3/trending/movie/day?api_key=085e63afd0a9d4557f1d96bbe7101ffa`,setTrendMoviesWeek);
      }, []);
      let [prefixImage]=useState('https://image.tmdb.org/t/p/w500/');
    return (
        <div>
            <div className="treanding">
                <div className="row">
                    <div className="col-lg-4 col-sm-6">
                        <div className="infoContent">
                            <h2 className="mainTitle">
                                Trending Movies to Watch Now
                            </h2>
                            <p className="info">
                                Most watched movies this day
                            </p>
                        </div>
                    </div>
                    {
                        trendMoviesWeek.map((ele, index) => {
                            return (
                                <div className="col-lg-2 col-md-3 col-sm-6" key={index}>
                                    <div className="moviesInfo">
                                        <img src={prefixImage + ele.poster_path} alt="" className='movieImage' />
                                        <div className="titleDiv">
                                            <h3 className="moveTitle">{ele.title}</h3>
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
    )
}

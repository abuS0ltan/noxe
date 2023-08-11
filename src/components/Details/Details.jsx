import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Loding from '../Loding/Loding';
import './details.css';
export default function Details() {
  let [prefixImage] = useState('https://image.tmdb.org/t/p/w500/');
  let [lodindScrren,setLodingScrren]=useState(true);
  //======================get data from url====================================
  let [searchParams, setSearchParams] = useSearchParams();
  let type = searchParams.get('type');
  let id = searchParams.get('id');
  //======================end get data from url====================================

  //=====================get data for the ele from api==============================
  let [eleData, setEleData] = useState({ genres: [] });
  let getData = async () => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=085e63afd0a9d4557f1d96bbe7101ffa`)
    setLodingScrren(false);
    console.log(data)
    makeData(data);
  }
  //=====================get data for the ele from api==============================

  //=====================make Data==================================
  let makeData = (data) => {
    let info = {};
    if (type == 'movie') {
      info = {
        title: data.original_title,
        tagline: data.tagline,
        genres: data.genres,
        voteAverage: data.vote_average.toFixed(1),
        voteCount: data.vote_count,
        popularity: data.popularity,
        releaseDate: data.release_date,
        overview: data.overview,
        posterPath: data.poster_path,
        homepage: data.homepage,
      }
    }
    else if (type == 'tv') {
      info = {
        title: data.name,
        tagline: data.tagline,
        genres: data.genres,
        voteAverage: data.vote_average.toFixed(1),
        voteCount: data.vote_count,
        popularity: data.popularity,
        releaseDate: data.first_air_date,
        overview: data.overview,
        posterPath: data.poster_path,
        homepage: data.homepage,
      }
    }
    else if (type == 'person') {
      info = {
        title: data.name,
        tagline: 'Also Known As:',
        genres: data.also_known_as,
        popularity: data.popularity,
        birthday: data.birthday,
        overview: data.biography,
        posterPath: data.profile_path,
        homepage: data.homepage,
      }
    }
    setEleData(info);
  }
  //=====================end make Data=================================
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className='details'>
      {
        lodindScrren?
        <>
          <Loding/>
        </>
        :
        <></>
      }
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="poster">
              <img src={prefixImage + eleData.posterPath} alt={eleData.title + ' poster'} />
            </div>
          </div>
          <div className="col-md-8">
            <div className="info">
              <h1 className="title">
                {eleData.title}
              </h1>
              <h2 className="subTitle">
                {eleData.tagline}
              </h2>
              {
                eleData.genres.map((ele, index) => {

                  return (type == 'person' ?
                    <>
                      <span className='genre' key={index}>{ele}</span>
                    </>
                    :
                    <>
                      <span className='genre' key={index}>{ele.name}</span>
                    </>

                  )
                })
              }
              {
                type != 'person' ? <>
                  <p className='vote'>Vote: {eleData.voteAverage}</p>
                  <p className='voteCount'>Vote Count: {eleData.voteCount}</p>
                  <p className='releaseDate'>{
                    type == 'movie' ? 'Release Date' : 'First Air Date'
                  } {eleData.releaseDate}
                  </p>
                </> :
                  <>
                    <p className='voteCount'>Birth of Date: {eleData.birthday}</p>
                  </>
              }

              <p className='popularity'>Popularity: {eleData.popularity}</p>

              <p className="overview">
                {
                  eleData.overview
                }
              </p>

              <a href={eleData.homepage} target='blank' className='homepage'><i class="fa-solid fa-link"></i> Visit Homepage</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

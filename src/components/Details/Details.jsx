import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loding from '../Loding/Loding';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './details.css';

export default function Details() {
  let [prefixImage,setPrefix] = useState('https://image.tmdb.org/t/p/w500/');
  let [lodindScrren,setLodingScrren]=useState(true);
  let [currentUser,setCurrentUser]=useState();
  let [users,setUsers]=useState([]);
  let [isSave,setIsSave]=useState(false);
  let navigate=useNavigate();
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
  //======================make save====================================
  let save=()=>{
    if(localStorage.getItem("loginData")){
      currentUser=JSON.parse(localStorage.getItem("loginData"));
      users=JSON.parse(localStorage.getItem("users"));
      let item={
        id:id,
        type:type
      }
      currentUser.list.push(item);
      let sameEmail;
      let index = 0;
      for ( ;index < users.length; index++) {
        if(currentUser.email==users[index].email){
          sameEmail= index;
        }
      }
      users[sameEmail]=currentUser;
      localStorage.setItem('users',JSON.stringify(users));
      localStorage.setItem("loginData",JSON.stringify(currentUser));
      setIsSave(true);
    }
    else{
      navigate('/login')
    }
  }
  //==============================remove=======================================
  const remove=()=>{
    currentUser=JSON.parse(localStorage.getItem("loginData"));
    users=JSON.parse(localStorage.getItem("users"));
    let list=[...currentUser.list];
      let item;
      list.forEach((ele,index)=>{
        if(ele.id==id&&ele.type==type){
          item=index;
        }
      })
      list.splice(item,1);
      currentUser.list=[...list];
      let sameEmail;
      let index = 0;
      for ( ;index < users.length; index++) {
        if(currentUser.email==users[index].email){
          sameEmail= index;
        }
      }
      users[sameEmail]=currentUser;
      localStorage.setItem('users',JSON.stringify(users));
      localStorage.setItem("loginData",JSON.stringify(currentUser));
      setIsSave(false);
  }
  useEffect(() => {
    document.title=`Noxe: Details`;
    getData();
    if(localStorage.getItem("loginData")){
      currentUser=JSON.parse(localStorage.getItem("loginData"));
      users=JSON.parse(localStorage.getItem("users"));
      let list=[...currentUser.list];
      let itemExist=false;
      list.forEach((ele)=>{
        if(ele.id==id&&ele.type==type){
          itemExist=true;
        }
        if(itemExist){
          setIsSave(true);
        }
      })
    }
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
                eleData.genres.map((ele,index) => {
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
              {isSave?
                <>
                  <button className='saveBtn' onClick={()=>remove()}><FontAwesomeIcon icon="fa-solid fa-bookmark" /></button>                
                </>
                :
                <>
                  <button className='saveBtn' onClick={()=>save()}><FontAwesomeIcon icon="fa-regular fa-bookmark" /></button>
                </>
              }
              <p className="overview">
                {
                  eleData.overview
                }
              </p>

              <a href={eleData.homepage} target='blank' className='homepage'><FontAwesomeIcon icon="fa-solid fa-link" /> Visit Homepage</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataShow from '../DataShow/DataShow';
import Head from '../Head/Head';
import './yourList.css';
export default function YourList() {
  let [list,setList]=useState([]);
  let [moviesList,setMoviesList]=useState([]);
  let [tvList,setTvList]=useState([]);
  let [peopleList,setPeopleList]=useState([]);
  let [moviesData,setMoviesData]=useState([]);
  let [tvData,setTvData]=useState([]);
  let [peopleData,setPeopleData]=useState([]);
  let [mainTitle,setMainTilte]=useState('Your List');
  useEffect(()=>{
    let currentUser=JSON.parse(localStorage.getItem("loginData"));
    list=[...currentUser.list];
    console.log(list);
    list.forEach((ele)=>{
      if(ele.type=='movie'){
        moviesList.push(ele);
      }
      else if(ele.type=='tv'){
        tvList.push(ele);
      }
      else{
        peopleList.push(ele);
      }
    })
    console.log(moviesList);
    //==========================make moveis data ============================================
    let moviesCount=0;
    let moviesItems=[];
    moviesList.forEach(async (ele)=>{
      let { data } = await axios.get(`https://api.themoviedb.org/3/${ele.type}/${ele.id}?api_key=085e63afd0a9d4557f1d96bbe7101ffa`);
      let item={
        id: data.id,
        title: data.title,
        image: data.poster_path,
        rating: data.vote_average.toFixed(1),
      }
      moviesItems.push(item);
      console.log(moviesData);
      moviesCount++;
      if(moviesCount==moviesList.length){
        setMoviesData(moviesItems);
        console.log(moviesCount);
        console.log(moviesItems);
        moviesItems=[];
      }
    })
    //==========================make tv data ============================================
    let tvCount=0;
    let tvItems=[];
    tvList.forEach(async (ele)=>{
      let { data } = await axios.get(`https://api.themoviedb.org/3/${ele.type}/${ele.id}?api_key=085e63afd0a9d4557f1d96bbe7101ffa`);
      let item={
        id: data.id,
        title: data.original_name,
        image: data.poster_path,
        rating: data.vote_average.toFixed(1),
      }
      tvItems.push(item);
      tvCount++;
      if(tvCount==tvList.length){
        setTvData(tvItems);
        tvItems=[];
      }
      console.log(tvData);
    })
    //==========================make people data ============================================
    let peopleCount=0;
    let peopleItems=[];
    peopleList.forEach(async (ele)=>{
      let { data } = await axios.get(`https://api.themoviedb.org/3/${ele.type}/${ele.id}?api_key=085e63afd0a9d4557f1d96bbe7101ffa`);
      let item={
            id:data.id,
            title:data.name,
            image:data.profile_path,
            rating:data.popularity.toFixed(1),
      }
      peopleItems.push(item);
      peopleCount++;
      if(peopleCount==peopleList.length){
        setPeopleData(peopleItems);
        peopleItems=[];
      }
      console.log(peopleData);
    })
  },[])
  return (
    <div className='yourList'>
      <Head mainTitle={mainTitle}/>
      <h2 className='title'>Movies</h2>
      <DataShow data ={moviesData} type={'movie'}/>
      <h2 className='title'>Tv Shows</h2>
      <DataShow data ={tvData} type={'tv'}/>
      <h2 className='title'>People</h2>
      <DataShow data ={peopleData} type={'person'}/>
    </div>
  )
}

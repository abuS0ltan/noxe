import React, { useEffect, useState } from 'react'
import './dataShow.css';
import { useNavigate } from 'react-router-dom';
import Loding from '../Loding/Loding';
export default function DataShow({data,type}) {
  let [dataToShow,setDataToShow]=useState([]);
  let [test,setTest]=useState('test');
  let navigate=useNavigate();
    useEffect(()=>{
      setDataToShow(data);
    })
  //=======================made Srarch================================
    let search=()=>{
      let searchInput=document.querySelector('.searchInput');
      let newData =[];
      // searchInput.addEventListener('keyup',()=>{
      //   console.log(searchInput.value);
      //   newData = dataToShow.filter ((ele)=>{
      //     if(ele.title.toLowerCase().includes(searchInput.value.toLowerCase()))
      //       return ele;
      //   })
      //   // console.log(newData);
      //   console.log(test)
      //   setTest('test2');
      //   console.log(test)
      //   setDataToShow(newData);
      //   console.log(newData);
      //   console.log(dataToShow);
      //   // if(newData.length){
      //   //   setDataToShow(newData);
      //   //   console.log('hiiiii')
      //   // }
      //   // else{
      //   //   setDataToShow(data.data);
      //   //   console.log('hi33')
      //   // }
      //   // console.log(dataToShow);
      // })
        newData = dataToShow.filter ((ele)=>{
          if(ele.title.toLowerCase().includes(searchInput.value.toLowerCase()))
            return ele;
        })
        setDataToShow(newData);
        setTest('test2');
    };
  //=======================end made Srarch============================


  //=======================made go to details================================
  let goToDetails=(id)=>{
    navigate({
      pathname:'/details',
      search:`?id=${id}&type=${type}`,
    }
    );
  }
  //=======================end made details================================
  return (
    
    <div className='dataShow'>
      <div className="container">
        {
          data.length==0?
          <>
            <p className='noData'>Sorry, there is no data to display:(</p>
          </>
          :
          <>
          </>
        }
        {/* <div className="row justify-content-center my-5">
          <div className="col-md-10 col-xl-8">
          <div className="input-group ">
            <span className="input-group-text" id="inputGroup-sizing-default">Search By Name</span>
            <input type="text" className="form-control searchInput" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
            <button onClick={()=>search()}>search</button>
          </div>
          </div>

        </div> */}


        <div className="row">
          
          {
            
            dataToShow.map((ele, index) => {
              return (
                <div className="col-lg-2 col-md-3 col-6 mb-3 ele" key={index} >
                  
                  <div className="moviesInfo">
                    <div className="overlay">
                      <button className='btn' onClick={()=>goToDetails(ele.id)}>
                        {
                          type=='person'?
                          `Go to details`
                          :
                          `Watch Now`
                        }
                      </button>
                    </div>
                    <img src={ele.image} alt={ele.title} className='movieImage' />
                    <div className="titleDiv">
                      <h3 className="moveTitle">{ele.title}</h3>
                    </div>
                    <span className='rating'>{ele.rating}</span>
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

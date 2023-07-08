import React, { useEffect, useState } from 'react'
import './dataShow.css';
export default function DataShow(data) {
  let [prefixImage] = useState('https://image.tmdb.org/t/p/w500/');
  let [dataToShow,setDataToShow]=useState([]);
  let [test,setTest]=useState('test');
  //=======================made Srarch================================
    useEffect(()=>{
      setDataToShow(data.data);
    })
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
      console.log(searchInput.value)
        newData = dataToShow.filter ((ele)=>{
          if(ele.title.toLowerCase().includes(searchInput.value.toLowerCase()))
            return ele;
        })
        console.log(newData);
        setDataToShow(newData);
        console.log(dataToShow);
        console.log(test)
        setTest('test2');
        console.log(test)
    };
  //=======================end made Srarch============================

  return (
    <div className='dataShow'>
      <div className="container">
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
                <div className="col-lg-2 col-md-3 col-sm-6 mb-3" key={index}>
                  <div className="moviesInfo">
                    <img src={prefixImage + ele.image} alt="" className='movieImage' />
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

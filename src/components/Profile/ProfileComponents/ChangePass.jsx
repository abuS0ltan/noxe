import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';

export default function ChangePass({userData,setLoginData,logout}) {
  let navigate=useNavigate();
  let [errorList, setErrorList] = useState([]);
  let users=[];
  let newusers=[];
  let [data,setData]=useState({
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    password: '',
    list:[],
  }
  );
  useEffect(()=>{
    setData(userData);
    users=JSON.parse(localStorage.getItem("users"));
    newusers=[...users];
  },[]);
  //==============================submit===================================================
  const submitData=(e)=>{
    e.preventDefault()
    validate();
  }
    //=============================validate===========================================================
    const validate=()=>{
      let validateResult=validateForm();
      if(validateResult!=undefined)
      {
        // let registerBtn =document.querySelector('.registerBtn ');
        setErrorList(errorList);
        //the correct code is this but i make it comment b i need to test the loading in rigster btn
        // setLoading(false);
        // registerBtn.classList.remove('disabled');
        // setTimeout(() => { 
        //     setLoading(false);
        //     registerBtn.classList.remove('disabled');
        //     registerBtn.innerHTML=`<span className='d-flex'>register</span>`;
        //  }, 2000);
      }
      else{
        let newp=document.getElementById('newp').value;
        data.password=newp;
        let sameEmail;
        let index = 0;
        for ( ;index < users.length; index++) {
          if(data.email==users[index].email){
            sameEmail= index;
          }
        }
        newusers[index]=data;
        users=[...newusers];
        // if(sameEmail.length!=0){
        //   console.log(sameEmail);
        //   console.log(55)
        //   let registerBtn =document.querySelector('.registerBtn ');
        //   setErrorList([{message:'email is already exist'}])
        //   // setLoading(false);
        //   // registerBtn.classList.remove('disabled');
        //   // registerBtn.innerHTML=`<span className='d-flex'>register</span>`;
        // }
          // users[sameEmail]=data;
          localStorage.setItem("users",JSON.stringify(users));
          localStorage.setItem("loginData",JSON.stringify(data));
          setLoginData();
          window.location.reload(false);
          logout();
      }
    }
    //============================validate form==============================================
    const validateForm=()=>{
      let old=document.getElementById('old').value;
      let newp=document.getElementById('newp').value;
      let confirm=document.getElementById('confirm').value;
      let error=undefined;
      errorList=undefined;
      if(old!=userData.password){
        errorList=[];
        error={
          message:'Old password does not match!'
        }
        errorList.push(error);
      }
      if(newp!=confirm){
        errorList=[];
        error={
          message:'The two passwords are not the same!'
        }
        errorList.push(error);
      }
      return errorList;
    }
    //=======================================render====================================
  return (
    <div className='editProfile'>
      <div className="modal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <Link to='/profile' className="btn-close" />
            </div>
            {
                      errorList.map((ele,index)=>{
                        return(
                          <div className="alert alert-danger" role="alert" key={index}>
                            {ele.message}
                            </div>
                        );
                      })
            }
              <form onSubmit={submitData}>
                
                <div className="modal-body">
                  <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Old Password</span>
                    <input required type="password" id='old' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                  </div>
                  <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">New Password</span>
                    <input required type="password" id='newp' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                  </div>
                  <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Password Confirmation</span>
                    <input required type="password" id='confirm' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  />
                  </div>
                </div>
                <div className="modal-footer">
                  <Link to='/profile' className="btn btn-secondary" >Close</Link>
                  <button type="submit" className="btn btn-primary">Save changes</button>
                </div>
              </form>
          </div>
        </div>
      </div>

    </div>
  )
}

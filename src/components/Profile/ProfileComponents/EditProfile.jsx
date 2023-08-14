import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';
export default function EditProfile({userData,setLoginData}) {
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
    document.getElementById('first_name').value=userData.first_name;
    document.getElementById('last_name').value=userData.last_name;
    document.getElementById('age').value=userData.age;
    setData(userData);
    users=JSON.parse(localStorage.getItem("users"));
    newusers=[...users];
  },[]);
  //==============================submit===================================================
  const submitData=(e)=>{
    e.preventDefault()
    validate();
  }
  //=============================change value===============================================
  const changeFormValue=(e)=>{
    const newData={...data};
    newData[e.target.id]=e.target.value;
    setData(newData);
  }
  //=============================validate===========================================================
  const validate=()=>{
    let validateResult=validateForm();
    if(validateResult.error!=undefined)
    {
      // let registerBtn =document.querySelector('.registerBtn ');
      setErrorList(validateResult.error.details);
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
        navigate('/profile');
        window.location.reload(false);
    }
  }
  //============================validate form==============================================
  const validateForm=()=>{
    const schema=Joi.object({
      first_name: Joi.string().required().alphanum().min(2).max(20),
      last_name: Joi.string().required().alphanum().min(2).max(20),
      age: Joi.number().min(12).max(150).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      list:Joi.required(),
      password: Joi.string().required()
    })
    return schema.validate(data,{abortEarly:false});
  }
  //=============================return=========================================
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
                    <span className="input-group-text" id="inputGroup-sizing-sm">First Name</span>
                    <input type="text" id='first_name' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  onChange={changeFormValue}/>
                  </div>
                  <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Last Name</span>
                    <input type="text" id='last_name' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={changeFormValue}/>
                  </div>
                  <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Age</span>
                    <input type="number" id='age' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  onChange={changeFormValue}/>
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

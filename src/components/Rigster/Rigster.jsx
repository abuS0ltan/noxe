import React, { useEffect, useState } from 'react';
import Joi from 'joi';
import './rigster.css';
import './rigsterMq.css';
import { useNavigate } from 'react-router-dom';
export default function Rigster() {
  let [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    password: '',
  }
  );
  let [errorList, setErrorList] = useState([]);
  let submitData = async (e) => {
    e.preventDefault();
    await runValidate();
    await alertApper();
  };
  let changeFormValue = (e) => {
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
    // console.log(newUser);
  }
  let runValidate=async ()=>{
    let validateResult = validateForm();
    console.log(validateResult.error.details)
    setErrorList(validateResult.error.details);
  };
  let validateForm = () => {
    const schema = Joi.object({
      first_name: Joi.string().required().alphanum().min(2).max(20),
      last_name: Joi.string().required().alphanum().min(2).max(20),
      age: Joi.number().min(12).max(150).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      // password: '',
    });
    return schema.validate(user,{abortEarly:false});
  }
  let alertApper =async ()=>{
    let alert=document.querySelector('.alert-danger');
    if(errorList==[]){
      alert.style.display='none';
      console.log(errorList)
    }
    else
    {
      alert.style.display='block';
      console.log('no empty')
      alert.innerHTML=' ';
      for (let index = 0; index < errorList.length; index++) {
        alert.innerHTML=alert.innerHTML+`
          <p>
            ${errorList[index].message}
          </p>
        `;
      }
    }

  };
  useEffect(()=>{
    let alert=document.querySelector('.alert-danger');
    if(alert.innerHTML=' ')
      alert.style.display='none';
    else{
      alert.style.display='block';
    }

  });
  return (
    <div className='rigster'>
      <div className="container">
        <h1 className='mainTitle'>Registeration Form</h1>
        <form className='form' onSubmit={submitData}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">firstName</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" onChange={changeFormValue} name='first_name' />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">lastName</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" onChange={changeFormValue} name='last_name' />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Age</label>
            <input type="number" className="form-control" id="exampleFormControlInput1" onChange={changeFormValue} name='age' />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" onChange={changeFormValue} name='email' />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleFormControlInput1" onChange={changeFormValue} name='password' />
          </div>
            {
              
                  <div className="alert alert-danger" role="alert" >
                    {
                      errorList.map((ele,index)=>{
                        return(
                          <p key={index}>
                            {ele.message}
                          </p>
                        );
                      })
                    }
                  </div>
                
            }
          

          <input type="submit" value='register' className='btn btn-primary' />
        </form>

      </div>

    </div>
  )
}

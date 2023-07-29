import React, { useEffect, useState } from 'react';
import Joi from 'joi';
import './rigster.css';
import './rigsterMq.css';
import { Navigate, useNavigate } from 'react-router-dom';
export default function Rigster() {
  let navigate=useNavigate();
  let [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    password: '',
  }
  );
  let [loading,setLoading]=useState(false);
  let [errorList, setErrorList] = useState([]);
  let users=[];
  let submitData = async (e) => {
    setLoading(true);
    let registerBtn =document.querySelector('.registerBtn ');
    registerBtn.classList.add('disabled');
    registerBtn.innerHTML=`<svg class="svg-inline--fa fa-spinner fa-spin" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"></path></svg>`;
    e.preventDefault();
    await runValidate();
    // await alertApper();
  };
  let changeFormValue = (e) => {
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
    // console.log(newUser);
  }
  let runValidate=async ()=>{
    let validateResult = validateForm();
    console.log(validateResult.error)
    if(validateResult.error!=undefined)
    {
      let registerBtn =document.querySelector('.registerBtn ');
      setErrorList(validateResult.error.details);
      console.log(validateResult.error.details);
      //the correct code is this but i make it comment b i need to test the loading in rigster btn
      // setLoading(false);
      // registerBtn.classList.remove('disabled');
      setTimeout(() => { 
          setLoading(false);
          registerBtn.classList.remove('disabled');
          registerBtn.innerHTML=`<span className='d-flex'>register</span>`;
       }, 2000);
    }
    else{
      let sameEmail=users.filter((ele)=>{
        if(user.email==ele.email){
          console.log('hi555');
          return ele;
        }
      })
      console.log(sameEmail);
      if(sameEmail.length!=0){
        console.log(sameEmail);
        console.log(55)
        let registerBtn =document.querySelector('.registerBtn ');
        setErrorList([{message:'email is already exist'}])
        setLoading(false);
        registerBtn.classList.remove('disabled');
        registerBtn.innerHTML=`<span className='d-flex'>register</span>`;
      }
      else{
        users.push(user);
        console.log(users)
        localStorage.setItem("users",JSON.stringify(users));
        console.log(JSON.parse(localStorage.getItem("users")))
        navigate('/login');
      }
    }
  };
  let validateForm = () => {
    const schema = Joi.object({
      first_name: Joi.string().required().alphanum().min(2).max(20),
      last_name: Joi.string().required().alphanum().min(2).max(20),
      age: Joi.number().min(12).max(150).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().required(),
    });
    return schema.validate(user,{abortEarly:false});
  }
  // let alertApper =async ()=>{
  //   let alert=document.querySelector('.alert-danger');
  //   if(errorList==[]){
  //     alert.style.display='none';
  //     console.log(errorList)
  //   }
  //   else
  //   {
  //     alert.style.display='block';
  //     console.log('no empty')
  //     alert.innerHTML=' ';
  //     for (let index = 0; index < errorList.length; index++) {
  //       alert.innerHTML=alert.innerHTML+`
  //         <p>
  //           ${errorList[index].message}
  //         </p>
  //       `;
  //     }
  //   }

  // };
  useEffect(()=>{
    // let alert=document.querySelector('.alert-danger');
    // if(alert.innerHTML=' ')
    //   alert.style.display='none';
    // else{
    //   alert.style.display='block';
    // }
    users=JSON.parse(localStorage.getItem("users"));
    console.log(users);
    console.log('hi')
  });

  return (
    <div className='rigster'>
      <div className="container">
        <h1 className='mainTitle'>Registeration Form</h1>
        {
                      errorList.map((ele,index)=>{
                        return(
                          <div className="alert alert-danger" role="alert" key={index}>
                            {ele.message}
                            </div>
                        );
                      })
        }
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
          <button type='submit' className='btn btn-primary registerBtn'>
           <span className='d-flex'>register</span>
          </button>
        </form>

      </div>
            

    </div>
  )
}

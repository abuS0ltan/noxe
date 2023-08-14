import React, { useEffect, useState } from 'react';
import Joi from 'joi';
import './login.css';
import './loginMq.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
export default function Login({setLoginData}) {
  let users=[];
  let navigate=useNavigate();
  let [user, setUser] = useState({
    email: '',
    password: '',
  }
  );
  let [loading,setLoading]=useState(false);
  let [errorList, setErrorList] = useState([]);
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
    if(validateResult.error!=undefined)
    {
      let registerBtn =document.querySelector('.registerBtn ');
      setErrorList(validateResult.error.details);
      //the correct code is this but i make it comment b i need to test the loading in rigster btn
      // setLoading(false);
      // registerBtn.classList.remove('disabled');
      setTimeout(() => { 
          setLoading(false);
          registerBtn.classList.remove('disabled');
          registerBtn.innerHTML=`<span className='d-flex'>Login</span>`;
       }, 2000);

    }
    else{

      let registerBtn =document.querySelector('.registerBtn ');
      let sameEmail=users.find((ele)=>{
        if(user.email==ele.email){
          return ele;
        }
      })
      if(sameEmail==undefined){
        setErrorList([{message:'email not exist'}])
        setLoading(false);
        registerBtn.classList.remove('disabled');
        registerBtn.innerHTML=`<span className='d-flex'>Login</span>`;
      }
      else{
        if(sameEmail.password!=user.password){
          setErrorList([{message:'The password is incorrect'}])
          setLoading(false);
          registerBtn.classList.remove('disabled');
          registerBtn.innerHTML=`<span className='d-flex'>Login</span>`;
        }
        else{
          localStorage.setItem("loginData",JSON.stringify(sameEmail));
          setLoginData()
          navigate('/home');
        }
      }
    }
  };
  let validateForm = () => {
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().required(),
    });
    return schema.validate(user,{abortEarly:false});
  }
  useEffect(()=>{
    users=JSON.parse(localStorage.getItem("users"));
    document.title=`Noxe: Login`;
  });
  return (
    // i give class rigster becouse the same style and dont have tiem to eidit it :(
    <div className='rigster login'>
      <div className="container">
        <h1 className='mainTitle'>Sing In</h1>
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
            <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" onChange={changeFormValue} name='email' />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleFormControlInput1" onChange={changeFormValue} name='password' />
          </div>
          <p className='signUp'>Do not have an account, <Link to='/rigster' className='link'> Sign up</Link> </p>
          <button type='submit' className='btn btn-primary registerBtn'>
           <span className='d-flex'>Login</span>
          </button>
        </form>

      </div>
            

    </div>
  )
}

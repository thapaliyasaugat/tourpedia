import { MDBBtn, MDBCard, MDBCardBody, MDBFooter, MDBIcon, MDBInput, MDBSpinner, MDBValidation } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch , useSelector} from "react-redux"
import { toast } from 'react-toastify';
import { register } from '../redux/features/authSlice';

const initialState = {
  firstName : "",
  lastName : "",
  email :"",
  password:"",
  confirmPassword:""
}

const Register = () => {
  const [formValue , setFormValue] = useState(initialState);
  const {firstName,lastName,email,password,confirmPassword} = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {loading , error} = useSelector(state => ({...state.auth}))
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(firstName && lastName && email && password && confirmPassword){
      if(password === confirmPassword){
        dispatch(register({formValue , navigate , toast}))
      }
      else{
        toast.error("passwords doesn't match.")
      }
    }
  }
  const onInputChange = (e) =>{
  let {name,value} = e.target;
setFormValue({...formValue,[name]:value})

  }
  return (
    <div style={{margin:"auto",
    padding:"15px" ,
    maxWidth:"450px",
    alignContent:"center",
    marginTop:"120px"
    }}>
      <MDBCard alignment='center'>
        <MDBIcon fas icon='user'size='2x'/>
<h5>Sign UP</h5>
<MDBCardBody >
<MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
<div className="col-md-6">
      <MDBInput
      label="Last Name"
      type="text"
      value={lastName}
      name="lastName"
      onChange={onInputChange}
      required
      invalid 
      validation = "please provide last name"
      />
    </div>
<div className="col-md-6">
      <MDBInput
      label="First Name"
      type="text"
      value={firstName}
      name="firstName"
      onChange={onInputChange}
      required
      invalid 
      validation = "please provide first name"
      />
    </div>
    <div className="col-md-12">
      <MDBInput
      label="Email"
      type="email"
      value={email}
      name="email"
      onChange={onInputChange}
      required
      invalid 
      validation = "please provide correct email"
      />
    </div>
    <div className="col-md-12">
      <MDBInput
      label="Password"
      type="password"
      value={password}
      name="password"
      onChange={onInputChange}
      required
      invalid 
      validation = "please provide password"
      />
    </div>
    <div className="col-md-12">
      <MDBInput
      label="Confirm Password"
      type="password"
      value={confirmPassword}
      name="confirmPassword"
      onChange={onInputChange}
      required
      invalid 
      validation = "Confirm your password"
      />
    </div>
    <div className='col-12'>
      <MDBBtn style={{width:"100%"}} className="mt-2">
      {loading && 
      <MDBSpinner
      size='sm'
      role="status"
      tag="span"
     className='me-2'
      />}
        Register</MDBBtn>
    </div>
    </MDBValidation>
</MDBCardBody>
<MDBFooter>
      <Link to="/login">
       <p> Already have account? Sign In</p>
      </Link>
    </MDBFooter>
      </MDBCard>

    </div>
  )
}

export default Register
import React, { useState } from 'react'
import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./Auth.css"
import Logo from "../../img/logo.png"
import Logo1 from "../../img/logo2.png"
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";
import { logIn,signUp } from '../../Actions/AuthAction'


const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get("postId");

  const loading=useSelector((state)=>state.authReducer.loading)


  const handleSubmit = (values, { resetForm })=>{
    
    if(isSignUp)
    {
      if(values.password===values.confirmPass)dispatch(signUp(values,postId))
    }
    else{
      dispatch(logIn(values,postId))
    }
    resetForm({})
  }
  const validationSchema= Yup.object().shape({
    firstname:isSignUp?Yup.string().required('First name is required'):null,
    lastname:isSignUp?Yup.string().required('Last name is required'):null,
    username:Yup.string().required('Username is required'),
    password:Yup.string().required('Password is required'),
    confirmPass:isSignUp?Yup.string().oneOf([Yup.ref('password'),null],'Password must match').required('Confirm Password is required'):null
  })

  const initialValues={
    firstname:"",
    lastname:"",
    username:"",
    password:"",
    confirmPass:"",
  }

  return (
    <div className="Auth">
      {/* Left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className='"WebName'>
          <h1 className="Transparent">SocialConnect</h1>
          <h6>Explore the ideas through the Social World</h6>
        </div>
      </div>
      {/* Right Side */}
      <div className="a-right">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({resetForm,errors,touched}) => (
            
            <Form className="infoForm authForm">
              <h3>{isSignUp ? "Sign up" : "Log In"}</h3>
              {isSignUp && (
                <div className='infoFromDiv'>
                  <div>
                    <Field className={`infoInputAuth ${touched.firstname && errors.firstname?"inputErrorColor":"inputColor"} `} type="text" placeholder='First Name' name="firstname" />
                    <ErrorMessage name="firstname" >   
                    {
                      (errorMsg)=> (<div className='error' >{errorMsg}</div>  )
                    } 
                    </ErrorMessage>
                  </div>
                  <div>
                    <Field className={`infoInputAuth ${touched.lastname && errors.lastname?"inputErrorColor":"inputColor"}`} type="text" placeholder='Last Name' name="lastname" />
                    <ErrorMessage name='lastname' component={TextError} />   

                  </div>
                </div>
              )}

              {/* </div> */}
              <div  style={{width:"100%",}}>
                
                  <Field type="text" name="username" style={{width:isSignUp?"93%":"86%",}} placeholder="Usernames" className={`infoInputAuth ${touched.username && errors.username?"inputErrorColor":"inputColor"}`} />
                  <ErrorMessage name='username'  component={TextError} />   

              </div>

              <div className='infoFromDiv'>
                <div>

                  <Field type="password" name="password" placeholder="Password" className={`infoInputAuth ${touched.password && errors.password?"inputErrorColor":"inputColor"}`} />
                  <ErrorMessage name='password' component={TextError} />   
                </div>
                {
                  isSignUp && (<div> <Field type="password" name="confirmPass" placeholder="Confirm Password" className={`infoInputAuth ${touched.confirmPass && errors.confirmPass?"inputErrorColor":"inputColor"}`} />
                              <ErrorMessage name='confirmPass' component={TextError} />   

                              </div>)
                }

              </div>
              <div >
                <span style={{fontSize:"12px",margin:"auto",cursor:"pointer"}} onClick={() => { setIsSignUp((prev) => (!prev)); resetForm({})}}>
                  {isSignUp ? "Already have an account. Login!" : "Don't have an account? Sign Up"}
                </span>
              </div>
              <button type="submit" className="button infoButton" disabled={loading}>
                {loading?"Loading...":isSignUp ? "Signup" : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>


    </div>
  )
}

export default Auth

const TextError=({children})=>{
  return (
    <div className="error">
    {children}
    </div>
  )
}
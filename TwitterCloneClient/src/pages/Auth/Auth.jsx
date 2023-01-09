import React, { useState } from 'react'
import "./Auth.css"
import Logo from "../../img/logo.png"
import { useDispatch,useSelector } from 'react-redux'
import { logIn,signUp } from '../../Actions/AuthAction'


const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const dispatch=useDispatch()
  const [data, setData] = useState({ firstname: "", lastname: "", password: "", confirmpass: "", username: "" })
  const [confirmPass, setConfirmPass] = useState(true)

  const loading=useSelector((state)=>state.authReducer.loading)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(isSignUp)
    {
      data.password===data.confirmpass?dispatch(signUp(data)):setConfirmPass(false)
    }
    else{
      dispatch(logIn(data))
    }
  }
  const resetForm=()=>
  {
    setConfirmPass(true)
    setData({ firstname: "", lastname: "", password: "", confirmpass: "", username: "" })
  }
  return (
    <div className="Auth">
      {/* Left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className='"WebName'>
          <h1 className="Transparent">Twitter Clone</h1>
          <h6>Explore the ideas through the World</h6>
        </div>
      </div>
      {/* Right Side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>
          {/* <div> */}
          {isSignUp && (
            <div>
              <input className='infoInput' value={data.firstname} type="text" placeholder='First Name' name="firstname" onChange={handleChange} />
              <input className='infoInput' value={data.lastname} type="text" placeholder='Last Name' name="lastname" onChange={handleChange} />
            </div>
          )

          }

          {/* </div> */}

          <div>
            <input type="text" name="username" value={data.username} placeholder="Usernames" className="infoInput" onChange={handleChange} />
          </div>

          <div >
            <input type="password" name="password" value={data.password} placeholder="Password" className="infoInput" onChange={handleChange} />
            {
              isSignUp && <input type="password" value={data.confirmpass} name="confirmpass" placeholder="Confirm Password" className="infoInput" onChange={handleChange} />

            }

          </div>
          <span style={{ display: confirmPass ? "none" : "block", color: "red", fontSize: "12px", alignSelf: "flex-end", marginRight: "5px" }}> 
            *Confirm Password is not same
          </span>
          <div >
            <span style={{fontSize:"12px",margin:"auto",cursor:"pointer"}} onClick={() => { setIsSignUp((prev) => (!prev));resetForm() }}>
              {isSignUp ? "Already have an account. Login!" : "Don't have an account? Sign Up"}
            </span>
          </div>
          <button type="submit" className="button infoButton" disabled={loading}>
            {loading?"Loading...":isSignUp ? "Signup" : "Login"}
          </button>
        </form>

      </div>


    </div>
  )
}

// function SignUp() {
//   return (
//     <div className="a-right">
//       <form className="infoForm authForm">
//         <h3>Sign up</h3>
//         <div>
//           <input className='infoInput' type="text" placeholder='First Name' name="firstname" />
//           <input className='infoInput' type="text" placeholder='Last Name' name="lastname" />
//         </div>

//         <div>
//           <input type="text" name="username" placeholder="Usernames" className="infoInput" />
//         </div>

//         <div >
//           <input type="text" name="password" placeholder="Password" className="infoInput" />
//           <input type="text" name="Confirmpas" placeholder="Confirm Password" className="infoInput" />

//         </div>

//         <div >
//           <span style={{fontSize:"12px",margin:"auto"}}>Already have an account. Login!</span>
//         </div>
//         <button type="submit" className="button infoButton">Signup</button>
//       </form>

//     </div>
//   )
// }

export default Auth
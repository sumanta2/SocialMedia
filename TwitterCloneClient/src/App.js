import "./App.css"
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import Page404 from "./pages/Page404/Page404";
import {Routes,Route,Navigate} from "react-router-dom"
import Chat from "./pages/Chat/Chat";
import { useSelector } from "react-redux";
import { Toaster } from 'react-hot-toast';




function App() {
    const user=useSelector((state)=>state.authReducer.authData)

  return (
    <div className="App">
        <div className="blur" style={{top:"-18%",right:'0'}}></div>
        <div className="blur" style={{top:"36%",left:"-8rem"}}></div>
        <Routes>         
          <Route path="/" element={user?<Navigate to="home"/>:<Navigate to="auth"/>} />
          <Route path="/home" element={user?<Home/>:<Navigate to="../auth"/>} />
          <Route path="/auth" element={user?<Navigate to="../home"/>:<Auth/>}/>
          <Route path="/profile/:id" element={user? <Profile/> : <Navigate to="../auth"/>}/>
          <Route path="/chat" element={user? <Chat/> : <Navigate to="../auth"/>}/>
          <Route path="*" element={user? <Page404/> : <Navigate to="../auth"/>} />
        </Routes>
        <Toaster position="bottom-center" reverseOrder={true}/>
    </div>

  );
}

export default App;

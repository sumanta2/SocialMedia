import React, { Suspense, lazy } from 'react';
import "./App.css"
//import Auth from "./pages/Auth/Auth";
//import Home from "./pages/home/Home";
//import Profile from "./pages/Profile/Profile";
//import Page404 from "./pages/Page404/Page404";
//import Settings from "./pages/Settings/Settings";
//import Notification from "./pages/Notification/Notification";
import { Routes, Route, Navigate,useParams,generatePath } from "react-router-dom"
//import Chat from "./pages/Chat/Chat";
import { useSelector } from "react-redux";
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from "react"
import RouteFallBack from './components/Fallbacks/RouteFallBack';
const Home = lazy(() => import("./pages/home/Home"));
const Auth = lazy(() => import("./pages/Auth/Auth"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Page404 = lazy(() => import("./pages/Page404/Page404"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Notification = lazy(() => import("./pages/Notification/Notification"));
const Chat = lazy(() => import("./pages/Chat/Chat"));




function App() {
  const user = useSelector((state) => state.authReducer.authData)
  const [getNotificationDirection, setNotificationDirection] = useState("top-center")
  const { notificationDirection } = useSelector((state) => state.settingsReducer.Notification)

  useEffect(() => {
    setNotificationDirection(notificationDirection)
  }, [notificationDirection])

  const PostAuth = () => {
    const { postId } = useParams();
    const authUrl = generatePath("/auth?postId=:postId", { postId });
    return <Navigate to={authUrl} />; 
  }
  

  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: '0' }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

       <Suspense fallback={<RouteFallBack/>}> 
        <Routes>
          <Route path="/" element={user ? <Navigate to="home" /> : <Navigate to="auth" />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="../auth" />} />
          <Route path="/home/:postId" element={user ? <Home /> : <PostAuth/> } />
          <Route path="/auth" element={user ? <Navigate to="../home" /> : <Auth />} />
          <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="../auth" />} />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="../auth" />} />
          <Route path="/settings" element={user ? <Settings /> : <Navigate to="../auth" />} />
          <Route path="/notification" element={user ? <Notification /> : <Navigate to="../auth" />} />
          <Route path="*" element={user ? <Page404 /> : <Navigate to="../auth" />} />
        </Routes>
       </Suspense> 

      <Toaster position={getNotificationDirection} reverseOrder={true} />
    </div>

  );
}

export default App;

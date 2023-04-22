import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import { logOut } from "../../Actions/AuthAction"
import "./Settings.css"
import LogoSearch from "../../components/LogoSearch/LogoSearch"
import NavIcons from "../../components/NavIcons/NavIcons"
import NotificationSetting from "../../components/SettingsPart/NotificationSetting"
import AnimationSetting from "../../components/SettingsPart/AnimationSetting"

const Settings = () => {

    const [trackSetting, setTrackSetting] = useState(1)
    const dispatch = useDispatch()
    
    const handleLogOut = () => {
        dispatch(logOut())
    }

    return (
        <div className="Setting">
            <div className="Navbar">
                <LogoSearch />
                <div className="rightIcons">
                    <NavIcons />
                </div>
            </div>
            <div className="Settings">
                <div className="Left-side-setting">
                    <h2 className="settingText">Settings</h2>
                    <div className="Setting-list">
                        <div>
                            <span className="setting-text" onClick={() => setTrackSetting(1)}>Notification</span>
                            <hr className="divider" />
                        </div>
                        <div>
                            <span className="setting-text" onClick={() => setTrackSetting(2)}>Animation</span>
                            <hr className="divider" />
                        </div>
                    </div>
                    <span className="logoutOption" onClick={handleLogOut}>Logout</span>
                </div>
                <div className="Right-side-setting">
                    {trackSetting === 1 ? <NotificationSetting /> :
                        trackSetting === 2 ? <AnimationSetting /> : ""}
                </div>
            </div>
        </div>
    )
}

export default Settings
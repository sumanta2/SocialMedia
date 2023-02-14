import React from "react"
import "./Settings.css"
import LogoSearch from "../../components/LogoSearch/LogoSearch"
import NavIcons from "../../components/NavIcons/NavIcons"

const Settings= ()=>{

    return (
        <div>
            <div className="Navbar">
                <LogoSearch/>
                <div className="rightSideIcons">
                  <NavIcons/>
                </div>
                
            </div>
            Settings Page
        </div>
    )
}

export default Settings
import React from "react"
import "./Notification.css"
import LogoSearch from "../../components/LogoSearch/LogoSearch"
import NavIcons from "../../components/NavIcons/NavIcons"




const Notification= ()=>{

    return(
        <div>
            <div className="Navbar">
                <LogoSearch/>
                <div className="rightSideIcons">
                  <NavIcons/>
                </div>
            </div>
            Notification Page
        </div>
    )
}

export default Notification
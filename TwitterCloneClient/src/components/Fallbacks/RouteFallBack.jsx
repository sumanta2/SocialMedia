import React from 'react'
import LogoPng from "../../img/logo.png"

const RouteFallBack = () => {
    const loadingStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap:"1rem",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
    }
    return (
        <div style={loadingStyle}>
            <img src={LogoPng} alt=" Logo" />
            <span>Loading...</span>
        </div>
    )
}

export default RouteFallBack
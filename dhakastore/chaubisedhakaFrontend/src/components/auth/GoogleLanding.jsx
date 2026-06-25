import React from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom'

const GoogleLanding = () => {

    const navigate = useNavigate();

    function handleLogout() {
        googleLogout();
    }

    return (
        <GoogleLogin
            onSuccess={(credentialsResponse) => {
                console.log(jwtDecode(credentialsResponse.credential))
                navigate("/home")
            }}

            onError={() => console.log("Login failed !!!")}
            auto_select={true}
        >

        </GoogleLogin>
    )
}

export default GoogleLanding
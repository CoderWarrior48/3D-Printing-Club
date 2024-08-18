import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = ({ className }) => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <button class={`btn btn-primary ${className}`} onClick={() => loginWithRedirect()}>Log In</button>
        )
    )
}

export default LoginButton;
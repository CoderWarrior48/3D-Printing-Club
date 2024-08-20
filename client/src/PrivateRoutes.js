import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoutes = () => {

    const { user, isAuthenticated, isLoading } = useAuth0();
  
    if (isLoading) {
      return <div>Loading ...</div>;
    }
    if (isAuthenticated) {
        const roles = user.user_roles || [];

        if (!roles.includes('Admin')) {
            return <div>Access Denied</div>;
        }
        else {
            return  <Outlet/>;
        }    
    }
    else {
        return <h1>Please sign in to access this page.</h1>
    }
    
}

export default PrivateRoutes;
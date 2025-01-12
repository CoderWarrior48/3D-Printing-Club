import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

function parseJwt(token: any) {
    // Split the JWT into three parts (header, payload, signature)
    const base64Url = token.split('.')[1];

    // Base64Url decode the payload
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Decode the base64 string
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    // Return the payload as a JSON object
    return JSON.parse(jsonPayload);
}

interface AuthProps {
    authState?: {token: string | null; authenticated: boolean | null };
    userState?: {firstName: string | null; lastName: string | null; role: string | null};
    onRegister?: (email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'https://dawson.hamera.com/api'
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    });
    const [userState, setUserState] = useState<{
        firstName: string | null,
        lastName: string | null,
        role: string | null
    }>({
        firstName: null,
        lastName: null,
        role: null
    });

    // If token is still there from past session, automatically use it
    useEffect(() => {
        const loadToken = async () => {
            try{
                const token = await SecureStore.getItemAsync(TOKEN_KEY);
                console.log("Stored:",token)

                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const tokenPayload = parseJwt(token)
                
                    setAuthState({
                        token: token,
                        authenticated: true
                    });
                    
                    setUserState({
                        firstName: tokenPayload.first_name,
                        lastName:  tokenPayload.last_name,
                        role: tokenPayload.role
                    });
                }
            } catch (e) {
                console.log("Error loading token", e)
            }
        };
        if (authState.token === null){
            loadToken()
        }
    })

    const register = async (email: string, password: string) => {
        console.log("Registered")
        try {
            const result = await axios.post(`${API_URL}/login.php`, {email,password});
            if (result.data.error != null) {
                console.log("Register error:", result.data.error)
                return {error: true, msg: result.data.error}
            }
            return await axios.post(`${API_URL}/register.php`, {email,password});

        } catch (e) {
            return {error: true, msg: (e as any).response.data}
        }
    }; 

    const login = async (email: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/login.php`, {email,password});
            if (result.data.error != null) {
                console.log("Sign-in error:", result.data.error)
                return {error: true, msg: result.data.error}
            }
            const tokenPayload = parseJwt(result.data.jwt)
            setAuthState({
                token: result.data.jwt,
                authenticated: true
            });
            setUserState({
                firstName: tokenPayload.first_name,
                lastName:  tokenPayload.last_name,
                role: tokenPayload.role
            });
            console.log("Role:", userState)
            
            //All future requests will have token now
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.jwt}`;
            
            //Store token securly
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.jwt);


        } catch (e) {
            console.log("ERROR:",e)
            return {error: true, msg: (e as any)}
        }
    };

    const logout = async () => {
        // Delete token from storage
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        // Update HTTP Headers
        axios.defaults.headers.common['Authorization'] = '';

        // Reset auth state
        setAuthState({
            token: null,
            authenticated: false
        });
    };
    
    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
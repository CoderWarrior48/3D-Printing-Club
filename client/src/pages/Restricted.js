import { Link } from "react-router-dom";

const Restricted = () => {
    return (
        <div class="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
            <div style={{width: "80%", height: "min-content"}}>
                <h1>Access Denied</h1>
                <p>Your request has been logged to the adminsitrator</p>
                <p>If you're here by accident, continue back to <Link to="/">Home</Link> </p>
                <p>If you're a administrator, logout and log back in with your administrative account to gain access.</p>
            </div>
        </div>
    )
}

export default Restricted;
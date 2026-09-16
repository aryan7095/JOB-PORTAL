import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Wrapper component that restricts access to recruiter-only routes (e.g. all /admin/* pages),
// redirecting anyone who isn't a logged-in recruiter back to the home page
const ProtectedRoute = ({children}) => {
    // Logged-in user from Redux auth state (note: this app uses Redux for auth,
    // unlike the earlier Context-based examples)
    const {user} = useSelector(store=>store.auth);

    const navigate = useNavigate();

    // On mount, check auth/role and redirect if the user isn't a recruiter
    useEffect(()=>{
        if(user === null || user.role !== 'recruiter'){
            navigate("/");
        }
    },[]);

    return (
        <>
        {children}
        </>
    )
};
export default ProtectedRoute;

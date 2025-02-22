import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../stores';
import { getLoggedIn } from '../stores/auth/authThunks';

const AuthenticatorGaurd = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state : RootState) => state.auth.isAuthenticated);
    useEffect(() => {
        const verifyAuth = async () => {
          if(isAuthenticated) await dispatch(getLoggedIn()).unwrap();
        };
    
        verifyAuth();
      }, [location, dispatch, navigate,isAuthenticated]);
    
    return null
}

export default AuthenticatorGaurd
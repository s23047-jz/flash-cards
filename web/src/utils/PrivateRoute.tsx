import {Outlet, Navigate} from 'react-router-dom'
import {ActiveUser} from '../services/user';

const PrivateRoutes = () => {

    let isAuthorized = false
    if (ActiveUser.getAccessToken() !== undefined) {
        isAuthorized = true
    }

    return (
        isAuthorized ? <Outlet/> : <Navigate to="/signin"/>
    )
}

export default PrivateRoutes
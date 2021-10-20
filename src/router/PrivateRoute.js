import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({
    isAuthenticated,
    component : Component,
    ...rest
}) => {

   
// Esto es para proteger las rutas, esta bueno, porque si haces un auth de un login,
//si no podes llegar a confirmar que estas logeado, no te deja ingresar.
    return (
        <Route {...rest}
            component={(props) =>(
                (isAuthenticated)
                ? (<Component {...props}/>)
                : (<Redirect to='/login' />)
            )     
            }
        />

        
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
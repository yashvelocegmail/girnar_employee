import React, { Component,useEffect } from "react";
import { Route, Redirect } from "react-router";

export const ProtectedRoute=({component:Component,...rest})=>{
    //console.log("=================================="+JSON.stringify(Auth))
    const authenticated = localStorage.getItem("authenticated")
   
       return (
    <Route
    {...rest}
    render={props=>{
        // console.log("Success")
        // console.log("=================================="+auth)
        // auth ? return (<Component {...props} />) : return(
        //     <Redirect
        //     to={{
        //         pathname:"/",
        //         state:{
        //             from:props.location
        //         }
        //     }} />
        // )
            
        if (authenticated==="true"){
            console.log("Login")
            return <Component {...props} />
        }
        else
        {
            console.log("logout");
            return(
                <Redirect
                to={{
                    pathname:"/",
                    state:{
                        from:props.location
                    }
                }} />
            )
        }
    }} />
   )
}

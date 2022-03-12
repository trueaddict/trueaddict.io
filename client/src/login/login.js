import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";

const Login = () => {
    const { state, dispatch } = useContext(AuthContext);
    const [data, setData] = useState({ errorMessage: "", isLoading: false });

    const { client_id, redirect_uri } = state;

    useEffect(() => {
        const url = window.location.href;
        const hasCode = url.includes('?code=');

        if (hasCode) {
            const newUrl = url.split('?code=');
            window.history.pushState({}, null, newUrl[0]);
            setData({ ...data, isLoading: true });

            const requestData = {
                code: newUrl[1]
            };

            const proxy_url = state.proxy_url;

            console.log(proxy_url + `?code=${requestData.code}`);
            console.log(requestData);
            fetch(proxy_url + `?code=${requestData.code}`, {
                method: "GET",
            })
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: "LOGIN",
                    payload: { user: data, isLoggedIn: true }
                });
            })
            .catch(error => {
                console.log(error);
                setData({
                    isLoading: false,
                    errorMessage: "Login failed"
                });
            });
        }
    }, [state, dispatch, data]);

    if (state.isLoggedIn) {
        return <Navigate to="/"/>;
    }

    return (
        <div className="container">
            {data.isLoading ? (
                 <div className="center">
                    <div class="preloader-wrapper active">
                        <div class="spinner-layer spinner">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div><div class="gap-patch">
                            <div class="circle"></div>
                        </div><div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col s12 m8 offset-m2">
                        <div className="z-depth-4 center-align" style={{marginTop: "1rem", paddingTop: "0.5rem", paddingBottom: "1.5rem", borderRadius: "10px"}}>
                            <h5>Login</h5>
                            <p style={{color: "red"}}>{data.errorMessage}</p>
                            <a className="waves-effect waves-light btn grey darken-1"
                                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                                onClick={() => {
                                    setData({ ...data, errorMessage: "" });
                                }}
                                >
                                
                                <span>Login with GitHub</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login;
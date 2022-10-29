import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import injectContext from "./store/appContext";
import { SignIn } from "./pages/sign-in";
import { Profile } from "./pages/profile";
import { Register } from "./pages/register";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Routes>
                    <Route element={<SignIn />} path="/" />
                    <Route element={<Register />} path="/signup" />
                    <Route element={<Profile />} path="/profile" />
                    <Route element={<h1>Not found!</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

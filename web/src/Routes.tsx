import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoginView } from "./modules/user/loginView";
import { MeView } from "./modules/user/MeView";
import { RegisterView } from "./modules/user/registerView";



export class Ways extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginView />}>
                    </Route>
                    <Route path="/register" element={<RegisterView />}>
                    </Route>
                    <Route path="/me" element={<MeView />}>
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}
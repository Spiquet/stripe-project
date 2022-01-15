import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoginView } from "./modules/user/loginView";
import { RegisterView } from "./modules/user/registerView";
import { Account } from "./modules/account/Account";
import PaidUsers from "./modules/account/PaidUsers";


export class Ways extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginView />}>
                    </Route>
                    <Route path="/register" element={<RegisterView />}>
                    </Route>
                    <Route path="/account" element={<Account />}>
                    </Route>
                    <Route path="/paid-users" element={<PaidUsers />}>
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}
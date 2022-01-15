import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoginView } from "./modules/user/loginView";
import { RegisterView } from "./modules/user/registerView";
import { Account } from "./modules/account/Account";
import PaidUsers from "./modules/account/PaidUsers";
import HomePage from "./HomePage";
import Header from "./shared/Header";


export class Ways extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Header />
                    <div>
                        <Routes>
                            <Route path="/login" element={<LoginView />} />
                            <Route path="/register" element={<RegisterView />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/paid-users" element={<PaidUsers />} />
                            <Route path="/" element={<HomePage />} />
                        </Routes>
                    </div>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}
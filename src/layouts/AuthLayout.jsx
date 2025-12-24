import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
;

const AuthLayout = () => {
    return (
        <div>
            {/* <Helmet>
                <title>AuthLayout | Subscription Box</title>
            </Helmet> */}
            <header>
                <Navbar></Navbar>
            </header>
            <main className="min-h-[calc(100vh-280px)] pt-20">
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default AuthLayout;
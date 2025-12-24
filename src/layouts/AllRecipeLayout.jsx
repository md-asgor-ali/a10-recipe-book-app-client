import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const AllRecipeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='pt-20'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            
        </div>
    );
};

export default AllRecipeLayout;
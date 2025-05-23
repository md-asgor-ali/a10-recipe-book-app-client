import React from 'react';
import Slider from './Slider';
import { useLoaderData } from 'react-router';
import TopRecipes from './TopRecipes';
import ExtraSection1 from './ExtraSection1';
import ExtraSection2 from './ExtraSection2';

const Home = () => {
    const recipes = useLoaderData();
    console.log(recipes)
    return (
        <div>
            <Slider></Slider>
            <TopRecipes recipes={recipes}></TopRecipes>
            <ExtraSection1></ExtraSection1>
            <ExtraSection2></ExtraSection2>
        </div>
    );
};

export default Home;
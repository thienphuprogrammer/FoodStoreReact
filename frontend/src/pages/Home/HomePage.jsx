import React, {useEffect, useReducer} from "react";
import Thumbnails from "../../components/Thumbnails/Thumbnails.jsx";
import {getAll, getAllByTag, getAllTags, search} from "../../services/foodService.jsx";
import {useParams} from "react-router-dom";
import Search from "../../components/Search/Search.jsx";
import Tags from "../../components/Tags/Tags.jsx";
import NotFound from "../../components/NotFound/NotFound.jsx";

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
    switch (action.type) {
        case "FOODS_LOADED":
            return { ...state, foods: action.payload };
        case "TAGS_LOADED":
            return { ...state, tags: action.payload };
        default:
            return state;
    }
};

const HomePage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { foods, tags } = state;
    const {searchTerm, tag } = useParams();

    useEffect(() => {
        getAllTags().then((tags) => { dispatch({ type: "TAGS_LOADED", payload: tags }); });

        const loadedFoods = tag
            ? getAllByTag(tag)
            : searchTerm
                ? search(searchTerm)
                : getAll();

        loadedFoods.then((foods) => { dispatch({ type: "FOODS_LOADED", payload: foods });} );
    }, [searchTerm, tag]);

    return (
        <>
            <Search />
            <Tags tags={tags}/>
            {foods.length === 0 && <NotFound linkText={"Reset search..."}/>}
            <Thumbnails foods={foods} />
        </>
    );
}

export default HomePage;
import React, {useEffect, useState} from "react";
import classes from "./foodPage.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {getById} from "../../services/foodService.jsx";
import StarRating from "../../components/StarRating/StarRating.jsx";
import Tags from "../../components/Tags/Tags.jsx";
import Price from "../../components/Price/Price.jsx";
import {useCart} from "../../hooks/useCart.jsx";
import NotFound from "../../components/NotFound/NotFound.jsx";

const FoodPage = () => {
    const [food, setFood] = useState({});
    const { foodId } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addToCart(food);
        navigate('/cart');
    };

    useEffect(() => {
        getById(foodId).then(setFood)
    }, [foodId]);

    return (
        <>
            {!food? (
                <NotFound message={"Food Not Found!!"} linkText={"Back to Homepage"}/>
                ) : (
                    <div className={classes.container}>
                    <img
                        className={classes.image}
                        src={food.imageUrl}
                        alt={food.name}
                    />
                    <div className={classes.details}>
                        <div className={classes.header}>
                            <span className={classes.name}>{food.name}</span>
                            <span className={`${classes.favorite} ${food.favorite ? '' : classes.not}`}>♥️</span>
                        </div>
                        <div className={classes.rating}>
                            <StarRating stars={food.stars} size={25} />
                        </div>
                        <div className={classes.origins}>
                            {
                                food.origins && food.origins.map((origin, index) => (
                                    <span key={index} className={classes.origin}>{origin}</span>
                                ))
                            }
                        </div>

                        <div className={classes.tags}>
                            {
                                food.tags && <Tags
                                    tags={food.tags.map(tag => ({ name: tag}))}
                                    forFoodPage={true}
                                />
                            }
                        </div>

                        <div className={classes.cook_time}>
                            <span className={classes.label}>Cook time: </span>
                            <span className={classes.value}>{food.cookTime}</span>
                        </div>

                        <div className={classes.price}>
                            <Price price={food.price} />
                        </div>

                        <button
                            className={classes.button}
                            onClick={handleAddToCart}
                        >Add to cart</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default FoodPage;
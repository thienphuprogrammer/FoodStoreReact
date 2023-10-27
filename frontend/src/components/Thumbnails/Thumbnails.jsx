import classes from "./thumbnails.module.css";
import {Link} from "react-router-dom";
import StarRating from "../StarRating/StarRating.jsx";
import Price from "../Price/Price.jsx";

const Thumbnails = ({foods}) => {

    return (
        <ul className={classes.list}>
            {
                foods.map((food) => {
                    return (
                        <li key={food.id} className={classes.item}>
                            <Link to={`/food/${food.id}`}>
                                <img src={food.imageUrl} alt={food.name} className={classes.image}/>
                                <div className={classes.content}>
                                    <div className={classes.name}>
                                        {food.name}
                                    </div>
                                    <span className={`${classes.favorite} ${food.favorite ? ' ' : classes.not}`}>
                                    ♥️
                                </span>

                                    <div className={classes.stars}>
                                        <StarRating stars={food.stars}/>
                                    </div>

                                    <div className={classes.product_item_footer}>
                                        <div className={classes.origins}>
                                            {
                                                food.origins.map((origin) => {
                                                    return (
                                                        <span key={origin} className={classes.origin}>
                                                        {origin}
                                                    </span>
                                                    );
                                                })
                                            }
                                        </div>

                                        <div className={classes.cook_time}>
                                        <span className={classes.cook_time_label}>
                                            ⏱
                                        </span>
                                            {food.cookTime}
                                        </div>
                                    </div>

                                    <div className={classes.price}>
                                        <Price price={food.price}/>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default Thumbnails;
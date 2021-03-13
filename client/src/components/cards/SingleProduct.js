import React, {useState} from 'react';
import {Card, Tabs, Tooltip} from "antd";
import {HeartOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {Link, useHistory} from "react-router-dom";
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultImage from '../../images/defaultImage.png';
import ProductListItems from "./ProductListItems";
import StarRatings from 'react-star-ratings';
import RatingModal from "../modal/RatingModal";
import {showAverage} from "../../functions/rating";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {addToWishlist} from "../../functions/user";
import {toast} from "react-toastify";

const {TabPane} = Tabs;

const SingleProduct = ({product, onStarClick, star}) => {
    const [tooltip, setTooltip] = useState('Click to add');

    // redux
    const {user, cart} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();

    const history = useHistory();

    const {_id, title, images, description} = product;

    const handleAddToCart = () => {
        // create cart array
        let cart = [];
        if (typeof window !== "undefined") {
            // if cart is in localstorage GET it
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            // push new product to cart
            cart.push({
                ...product,
                count: 1,
            });
            // remove duplicates
            let unique = _.uniqWith(cart, _.isEqual);
            //save to localStorage
            console.log('unique', unique);
            localStorage.setItem('cart', JSON.stringify(unique));
            // show tooltip
            setTooltip("Added");

            // add to redux state
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });

            //show cart items in side drawer
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            });
        }
    }

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishlist(product._id, user.token).then((res) => {
            console.log("ADDED TO WISHLIST", res.data);
            toast.success("Added to wishlist");
            history.push("/user/wishlist");
        });
    };

    return (
        <>
            <div className="col-md-7">
                {images && images.length ?
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                        {images && images.map((image) =>
                            <img src={image.url} key={image.public_id}/>)
                        }
                    </Carousel>
                    : <Card cover={<img src={defaultImage} className="mb-3 card-image"/>}/>
                }

                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Call use on xxx xxx xxx to learn more about this product.
                    </TabPane>
                </Tabs>
            </div>

            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>

                {product && product.ratings && product.ratings.length > 0 ?
                    showAverage(product)
                    : (<div className="text-center pt-1 pb-3">No rating yet</div>)
                }

                <Card
                    actions={[
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart}>
                                <ShoppingCartOutlined className="text-success"/> <br/> Add to Cart
                            </a>
                        </Tooltip>,
                        <a onClick={handleAddToWishlist}>
                            <HeartOutlined className="text-info"/> <br/> Add to Wishlist
                        </a>,
                        <RatingModal>
                            <StarRatings
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>
                    ]}
                >
                    <ProductListItems product={product}/>
                </Card>
            </div>
        </>
    );
}

export default SingleProduct
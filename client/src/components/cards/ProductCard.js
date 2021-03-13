import React, {useState} from "react";
import {Card, Tooltip} from "antd";
import defaultImage from '../../images/defaultImage.png';
import {Link} from "react-router-dom";
import {ShoppingCartOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import {showAverage} from "../../functions/rating";
import _ from 'lodash';
import {useDispatch, useSelector} from "react-redux";

const {Meta} = Card;

const ProductCard = ({product}) => {
    const [tooltip, setTooltip] = useState('Click to add');

    // redux
    const {user, cart} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();

    const {title, description, images, slug, price} = product

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

    return (
        <>
            {product && product.ratings && product.ratings.length > 0 ?
                showAverage(product)
                : (<div className="text-center pt-1 pb-3">No rating yet</div>)
            }

            <Card
                cover={
                    <img
                        src={
                            images && images.length ?
                                images[0].url
                                : defaultImage
                        }
                        style={{height: "150px", objectFit: "cover"}}
                        alt={title}
                    />
                }

                actions={[
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-warning"/> <br/> View Product
                    </Link>,
                    <Tooltip title={tooltip}>
                        <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                            <ShoppingCartOutlined className="text-danger"/> <br/>
                            {product.quantity < 1 ? 'Out of stock' : 'Add to Cart'}
                        </a>
                    </Tooltip>
                ]}
            >
                <Meta
                    title={`${title} - $${price}`}
                    description={`${description && description.substring(0, 30)}...`}
                />
            </Card>
        </>
    );
}

export default ProductCard;
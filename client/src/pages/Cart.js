import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import ProductCartInCheckout from "../components/cards/ProductCartInCheckout";
import {userCart} from "../functions/user";

const Cart = ({history}) => {
    const {cart, user} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    };

    const saveOrderToDb = () => {
        userCart(cart, user.token)
            .then((res) => {
                console.log('CART POST RES', res);
                if (res.data.ok) history.push("/checkout");
            })
            .catch(err => console.log("cart save err", err));
    };

    // saveCashOrderToDb
    const saveCashOrderToDb = () => {
        dispatch({
            type: 'COD',
            payload: true
        });

        userCart(cart, user.token)
            .then((res) => {
                console.log('CART POST RES', res);
                if (res.data.ok) history.push("/checkout");
            })
            .catch(err => console.log("cart save err", err));
    }

    const showCartItems = () => (
        <table className="table table-bordered">
            <thead className="thead-light">
            <tr>
                <th className="col">Image</th>
                <th className="col">Title</th>
                <th className="col">Price</th>
                <th className="col">Brand</th>
                <th className="col">Color</th>
                <th className="col">Count</th>
                <th className="col">Shipping</th>
                <th className="col">Remove</th>
            </tr>
            </thead>

            {cart.map((p) =>
                <ProductCartInCheckout key={p._id} p={p}/>
            )}
        </table>
    )

    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <div className="col-md-8">
                    <h4>Cart / {cart.length} Product</h4>

                    {!cart.length ?
                        (<p>
                            No products in cart. <Link to='/shop'>Continue shopping.</Link>
                        </p>)
                        : (showCartItems())
                    }
                </div>
                <div className="col-md-4">
                    <h4>Order Summary</h4>
                    <hr/>
                    <p>Products</p>
                    {cart.map((c, i) => (
                        <div key={i}>
                            <p>
                                {c.title} x {c.count} = ${c.price * c.count}
                            </p>
                        </div>
                    ))}
                    <hr/>
                    Total: <b>${getTotal()}</b>
                    <hr/>
                    {
                        user ? (
                                <>
                                    <button
                                        onClick={saveOrderToDb}
                                        className="btn btn-sm btn-primary mt-2"
                                        disabled={!cart.length}
                                    >
                                        Proceed to checkout
                                    </button>
                                    <br/>
                                    <button
                                        onClick={saveCashOrderToDb}
                                        className="btn btn-sm btn-warning mt-2"
                                        disabled={!cart.length}
                                    >
                                        Pay Cash on Delivery
                                    </button>
                                </>
                            )
                            : (
                                <button className="btn btn-sm btn-primary mt-2">
                                    <Link to={{
                                        pathname: "/login",
                                        state: {from: "cart"},
                                    }}
                                    >
                                        Login to checkout
                                    </Link>
                                </button>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default Cart;
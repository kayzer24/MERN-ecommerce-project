import React from 'react';
import defaultImage from '../../images/defaultImage.png';
import {useDispatch, useSelector} from "react-redux";
import {Drawer} from "antd";
import {Link} from "react-router-dom";

const SideDrawer = () => {
    //redux
    const dispatch = useDispatch();
    const {drawer, cart} = useSelector((state) => ({...state}));

    const imageStyle = {
        width: '100%',
        height: '50px',
        objectFit: 'cover',
    }

    return (
        <Drawer
            className="text-center"
            title={`Cart / ${cart.length} Product`}
            placement="right"
            closable={false}
            visible={drawer}
            onClose={() => {
                dispatch({
                    type: "SET_VISIBLE",
                    payload: false,
                });
            }}>
            {cart.map((p) => (
                <div className="row" key={p._id}>
                    <div className="col">
                        {p.images[0] ? (
                            <>
                                <img src={p.images[0].url} alt={p.images[0].url} style={imageStyle}/>
                                <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                            </>
                        ) : (
                            <>
                                <img src={defaultImage} alt={defaultImage} style={imageStyle}/>
                                <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                            </>
                        )}
                    </div>
                </div>
            ))}

            <Link to="/cart">
                <button
                    onClick={() =>
                        dispatch({
                            type: "SET_VISIBLE",
                            payload: false,
                        })
                    }
                    className="text-center btn btn-primary btn-raised btn-block">
                    Go to Cart
                </button>
            </Link>
        </Drawer>
    );
}

export default SideDrawer;
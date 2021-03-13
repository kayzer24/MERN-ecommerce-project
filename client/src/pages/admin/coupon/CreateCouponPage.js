import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.min.css";
import AdminNav from "../../../components/nav/AdminNav";
import {createCoupon, getCoupons, removeCoupon} from "../../../functions/coupon";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {DeleteOutlined} from "@ant-design/icons";

const CreateCouponPage = () => {
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState(new Date());
    const [discount, setDiscount] = useState('');
    const [loading, setLoading] = useState(false);
    const [coupons, setCoupons] = useState([]);

    //redux
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        loadAllCoupons();
    }, []);

    const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        createCoupon({name, expiry, discount}, user.token)
            .then((res) => {
                setLoading(false);
                loadAllCoupons();
                setName('');
                setDiscount('');
                setExpiry('');
                toast.success(`"${res.data.name}" was created successfully`);
            })
            .catch((err) => {
                console.log(err.response);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    }

    const handleRemove = (couponId) => {
        if (window.confirm("Delete?")) {
            setLoading(true);

            removeCoupon(couponId, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`Coupon "${res.data.name}" deleted successfully.`);
                    loadAllCoupons();
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                    if (err.response.status === 400) toast.error(err.response.data);
                })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>

                <div className="col-md-10">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4>Coupon</h4>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="text-muted">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                autoFocus
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Discount %</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Expiry</label>
                            <br/>
                            <DatePicker
                                className="form-control"
                                selected={expiry}
                                onChange={(date) => setExpiry(date)}
                                required
                            />
                        </div>

                        <button className="btn btn-outline-primary">Save</button>
                    </form>

                    <br/>
                    <h4>{coupons.length} Coupons</h4>
                    <table className="table table-bordered">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Expiry</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {coupons.map((c) => (
                            <tr key={c._id}>
                                <th>{c.name}</th>
                                <th>{new Date(c.expiry).toLocaleDateString()}</th>
                                <th>{c.discount}</th>
                                <th>
                                    <span
                                        onClick={() => handleRemove(c.slug)}
                                        className="btn btn-sm float-right"
                                    >
                                        <DeleteOutlined className="text-danger pointer"/>
                                    </span>
                                </th>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CreateCouponPage;
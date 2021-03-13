import React, {useEffect, useState} from 'react';
import AdminNav from "../../components/nav/AdminNav";
import {useSelector} from "react-redux";
import {changeStatus, getOrders} from "../../functions/admin";
import {toast} from "react-toastify";
import Orders from "../../components/order/Orders";

const AdminDashboard = () => {
	const [orders, setOrders] = useState([]);
	const {user} = useSelector((state) => ({...state}));

	useEffect(() => {
		loadOrders();
	}, []);

	const loadOrders = () =>
		getOrders(user.token)
			.then((res) => {
				// console.log(JSON.stringify(res.data, null, 4));
				setOrders(res.data);
			});

	const handleStatusChange = (orderId, orderStatus) => {
		return changeStatus(orderId, orderStatus, user.token)
			.then((res) => {
				toast.success('Status updated');
				loadOrders();
			});
	}


	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col-md-10">
					<h4>Admin Dashboard</h4>
					<Orders orders={orders} handleStatusChange={handleStatusChange}/>
				</div>
			</div>
		</div>
	);
}

export default AdminDashboard;
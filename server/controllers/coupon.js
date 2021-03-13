const Coupon = require('../models/coupon');

exports.create = async (req, res) => {
    try {
        const {name, expiry, discount} = req.body.coupon;
        res.json(await new Coupon({name, expiry, discount}).save());
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
}

exports.remove = async (req, res) => {
    try {
        res.json(await Coupon.findOneAndDelete(req.params.couponId).exec());
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
}

exports.list = async (req, res) => {
    try {
        res.json(
            await Coupon.find({})
                .sort({createdAt: -1})
                .exec()
        );
    } catch (err) {
        console.log(err);
    }
}

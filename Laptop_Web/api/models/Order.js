const main = require('../config/db/connection').main;
const { default: mongoose } = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const mongooseDelete = require('mongoose-delete');
const moment = require('moment');


const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, required: true },
    gender: { type: String },
    products: [{ _id: false, productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Laptop', required: true }, purchasedQuantity: { type: Number, required: true } }],
    date: { type: Date, default: moment(new Date()).format('YYYY-MM-DD') },
    deliverWay: { type: String, enum: ["shipping", "direct"], require: true },
    deliverAddress: { type: Object },
    otherRequirements: { type: String },
    coupon: { type: String },
    status: { type: Number, required: true, default: 0 },
}, { timestamps: true })

orderSchema.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
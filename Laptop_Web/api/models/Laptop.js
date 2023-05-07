const main = require('../config/db/connection').main;
const { ObjectId } = require('mongodb');
const { default: mongoose } = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const laptopSchema = new mongoose.Schema({
    laptopName: { type: String, required: true, unique: true },
    shortName: { type: String, required: true, unique: true },
    thumnail: { type: Array, required: true },
    policy: { type: Object },
    price: { type: Number, get: getPrice },
    installment: { type: String },
    configuration: { type: Object, required: true },
    onlinePrice: { type: Number, required: true, get: getPrice },
    gift: { type: Object },
    laptopDetail: { type: Object, required: true },
    rate: { type: Object },
    plugin: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plugin', default: [] }],
    relateProduct: { type: Array, default: [] },
    laptopType: { type: String },
    brand: { type: String, require: true },
    isBusiness: { type: Boolean, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    quantity: { type: Number, required: true, min: 0 },
    slug: { type: String, slug: 'shortName', unique: true },
}, { timestamps: true })



laptopSchema.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})
const Laptop = mongoose.model('Laptop', laptopSchema);




module.exports = Laptop;

function getPrice(money) {
    return (Math.round(money * 100) / 100).toLocaleString().replace(/,/g, '.');
}

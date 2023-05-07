const main = require('../config/db/connection').main;
const { default: mongoose } = require('mongoose');


const pluginSchema = new mongoose.Schema({
    name: { type: String, required:true, unique: true },
    image: { type: String },
    onlyOnline: { type: Boolean, get: getPrice },
    oldPrice: { type: Number  },
    onlinePrice: { type: Number, required: true, get: getPrice },
    stars: { type: Number, default: 0 },
    rateNumber: { type: Number, default: 0 },
    laptops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Laptop', default: [] }],
}, { timestamps: true })

const Plugin = mongoose.model('Plugin', pluginSchema);

// Plugin.find({}, (err, docs) => {
//     if(err)console.log(err);
//     else if(docs) {
//         docs.forEach(doc => {
//             if(!doc.image) {
//                 doc.image = "https://cdn.tgdd.vn/Products/Images/9499/139756/bo-adapter-sac-2-cong-3a-kem-cap-micro-50cm-sony-11-600x600-600x600.jpg";
//                 doc.save();
//             }
//         })
//     }
// })

module.exports = Plugin;

function getPrice(money) {
    return (money).toString().replace(/\d(?=(\d{3})+$)/g, '$&,'); 
}
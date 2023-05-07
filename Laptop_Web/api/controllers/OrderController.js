const Order = require("../models/Order");
const bcrypt = require('bcrypt');
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { months } = require("moment");

class OrderController {
  // PUT [/api/admin/orders/:id]
  async updateOrder(req, res, next) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      next(err);
    }
  }
  // DELETE [/api/admin/orders/:id]
  async deleteOrder(req, res, next) {
    try {
      await Order.delete({ _id: req.params.id });
      res.status(200).json("Order is moved to trash");
    } catch (err) {
      next(err);
    }
  }

  // DELETE [/api/admin/orders/:id/force]
  async destroyOrder(req, res, next) {
    try {
      await Order.deleteOne({ _id: req.params.id });
      res.status(200).json("Order has been deleted");
    } catch (err) {
      next(err);
    }
  }

  // GET [/api/admin/orders/:id]
  async getOrder(req, res, next) {
    try {
      const order = await Order.findById(req.params.id);
      res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  }

  // GET [/api/admin/orders]
  async getOrders(req, res, next) {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  }

  // GET [/api/admin/orders/revenue]
  async getRevenue(req, res, next) {
    try {
      const today = {
        startDay: moment().startOf('day').toDate(),
        endDay: moment().endOf('day').toDate(),
        revenue: 0
      }
      const lastWeek = {
        startDay: moment().subtract(1, 'weeks').startOf('week'),
        endDay: moment().subtract(1, 'weeks').endOf('week'),
        revenue: 0
      }
      const lastMonth = {
        startDay: moment().subtract(1, 'months').startOf('month'),
        endDay: moment().subtract(1, 'months').endOf('month'),
        revenue: 0
      }
      const todayRevenue = await getRevenueByDate(new Date(today.startDay), new Date(today.endDay));
      const lastWeekRevenue = await getRevenueByDate(new Date(lastWeek.startDay), new Date(lastWeek.endDay));
      const lastMonthRevenue = await getRevenueByDate(new Date(lastMonth.startDay), new Date(lastMonth.endDay));
      if (todayRevenue.length > 0) {
        today.revenue = todayRevenue[0].total;
      }
      if (lastWeekRevenue.length) {
        lastWeek.revenue = lastWeekRevenue[0].total;
      }
      if (lastMonthRevenue.length) {
        lastMonth.revenue = lastMonthRevenue[0].total;
      }

      res.status(200).json({ today, lastWeek, lastMonth });

    } catch (err) {
      next(err);
    }

  }

  // GET [/api/admin/orders/revenue/6-months]
  async getSixMonthRevenue(req, res, next) {
    try {
      const numberOfMonth = 6;
      const dataRevenue = [];
      for (let i = numberOfMonth; i > 0; i--) {
        const day = moment().subtract(i, 'months');
        const startDay = moment().subtract(i, 'months').startOf('month');
        const endDay = moment().subtract(i, 'months').endOf('month');
        const revenue = await getRevenueByDate(new Date(startDay), new Date(endDay));
        dataRevenue.push({
          name: day.format("MMMM"),
          total: revenue.length > 0 ? revenue[0].total : 0
        })
      }

      res.status(200).json({ dataRevenue });

    } catch (err) {
      next(err);
    }

  }

  // GET [/api/admin/orders/latest]
  async getLatestTransaction(req, res, next) {
    try {
      const latestTransaction = await getOrderInfo();
      // await Order.find({}).populate("products").sort({ 'date': - 1 }).limit(5);
      res.status(200).json(latestTransaction);
    } catch (err) {
      next(err);
    }
  }

  // GET [/api/admin/orders/count]
  async countOrders(req, res, next) {
    try {
      const orderCount = await Order.countDocuments({});
      res.status(200).json({ type: "order", count: orderCount });
    } catch (err) {
      next(err);
    }
  }

  async getRevenueEarning(req, res, next) {
    try {
      const startDay = moment().subtract(1, 'months').startOf('month');
      const endDay = moment().subtract(1, 'months').endOf('month');
      const twoMonthStart = moment().subtract(2, 'months').startOf('month');
      const twoMonthEnd = moment().subtract(1, 'months').endOf('month');
      const twoMonthRevenue = getRevenueByDate(new Date(twoMonthStart), new Date(twoMonthRevenue));
      const revenue = getRevenueByDate(new Date(startDay), new Date(endDay));
      const diffs = 100 - revenue / twoMonthRevenue;
      res.status(200).json({ type: "earning", revenue, diffs });
    } catch (err) {
      next(err);
    }
  }


}




module.exports = new OrderController();

function getRevenueByDate(startDay, endDay) {
  const todayRevenue = Order.aggregate([
    {
      $match: { "date": { $gte: startDay, $lte: endDay } }
    },
    {
      $unwind: "$products"
    },
    {
      $lookup:
      {
        from: "laptops",
        localField: "products.productId",
        foreignField: "_id",
        as: "products.productDetail",
        pipeline: [
          {
            $project: {
              _id: 1,
              laptopName: 1,
              thumnail: { "$first": "$thumnail" },
              price: 1,
              onlinePrice: 1,
              policy: 1,
              slug: 1
            }
          }
        ]
      }
    },
    {
      $unwind: {
        path: "$products.productDetail"
      }
    },
    {
      $group: {
        "_id": "$_id",
        "products": { "$push": "$products" },
      }
    },

    {
      $project: {
        _id: 1,
        products: {
          $map: {
            input: "$products",
            as: "product",
            in: {
              "laptopId": "$$product.productId",
              "purchasedQuantity": "$$product.purchasedQuantity",
              "totalPrice": {
                "$cond": [{ "$and": [{ "$ne": ["$$product.productDetail.onlinePrice", undefined] }, { "$ne": ["$$product.productDetail.onlinePrice", 0] }] }, { "$multiply": ["$$product.productDetail.onlinePrice", "$$product.purchasedQuantity"] }, { "$multiply": ["$$product.productDetail.price", "$$product.purchasedQuantity"] }]
              }
            }
          }
        }
      }
    },
    {
      $addFields: {
        "total": { "$sum": "$products.totalPrice" }
      }
    }
  ])
  return todayRevenue;
}

function getOrderInfo() {
  const pineline = [
    {
      $limit: 5
    }
    ,
    {
      $sort: { date: -1 }
    },
    {
      $unwind: "$products"
    },
    {
      $lookup:
      {
        from: "laptops",
        localField: "products.productId",
        foreignField: "_id",
        as: "products.productDetail",
        pipeline: [
          {
            $project: {
              _id: 1,
              laptopName: 1,
              thumnail: { "$first": "$thumnail" },
              price: 1,
              onlinePrice: 1,
            }
          }
        ]
      }
    },
    {
      $unwind: {
        path: "$products.productDetail"
      }
    },
    {
      $group: {
        "_id": "$_id",
        "date": { "$first": "$date" },
        "userName": { "$first": "$userName" },
        "deliverWay": { "$first": "$deliverWay" },
        "products": { "$push": "$products" },
      }
    },

    {
      $project: {
        _id: 1,
        date: 1,
        userName: 1,
        deliverWay: 1,

        products: {
          $map: {
            input: "$products",
            as: "product",
            in: {
              "laptopDetail": "$$product.productDetail",
              "purchasedQuantity": "$$product.purchasedQuantity",
              "totalPrice": {
                "$cond": [{ "$and": [{ "$ne": ["$$product.productDetail.onlinePrice", undefined] }, { "$ne": ["$$product.productDetail.onlinePrice", 0] }] }, { "$multiply": ["$$product.productDetail.onlinePrice", "$$product.purchasedQuantity"] }, { "$multiply": ["$$product.productDetail.price", "$$product.purchasedQuantity"] }]
              }
            }
          }
        }
      }
    },
  ]
  return Order.aggregate(pineline);
}
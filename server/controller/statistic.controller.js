import Product from "../models/product.model.js";
import ProductCategory from "../models/category.model.js";
import Brand from "../models/brand.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

const statisticAll = async (req, res) => {
  try {
    const totalCustomer = await User.find({ role: "user" }).count();
    const totalProduct = await Product.count();
    const totalCategories = await ProductCategory.count();
    const totalBrand = await Brand.count();
    const totalOrder = await Order.count();

    const revenueOrder = await Order.aggregate([
      { $match: { paymentResult: true } },
      {
        $group: {
          _id: null,
          //  paymentResult: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      { $project: { _id: 0, totalRevenue: 1, } }
    ]);
    res.send({
      totalCustomer: totalCustomer,
      totalProduct: totalProduct,
      totalOrder: totalOrder,
      totalCategories,
      totalBrand,
      revenueOrder: revenueOrder,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }

}

const topCustomers = async (req, res) => {
  try {

    const customers = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: "$user",
          total: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
          // user: { $push: '$user' }
        },
      },
      {
        $lookup: {
          from: User.collection.name,
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        }
      },
      {
        $sort: {
          total: -1
        }
      },
      { $project: { _id: 0, total: 1, firstName: '$user.firstName', lastName: '$user.lastName', totalOrders: 1 } }
    ]).limit(10);

    res.json(customers)
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const selectBy = (by) => {
  const d = new Date()
  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  switch (by) {
    case "day":
      return { paidAt: { $gte: d } }
    case "week":
      d.setDate(d.getDate() - d.getDay());
      return { paidAt: { $gte: d } }
    case "month":
      d.setDate(1);
      return { paidAt: { $gte: d } }
    case "year":
      d.setDate(1);
      d.setMonth(1)
      return { paidAt: { $gte: d } }
    default:
      return {}
  }
}

const getRevenue = async (req, res) => {
  const by = req.params.by

  // let label = { $dayOfWeek: "$createdAt" }
  let label = { $dateToString: { format: "%Y-%m-%d", date: "$paidAt" } }
  let type = "week"
  switch (by) {
    case "day":
      type = "day"
      break;
    case "day-of-month":
      type = "month"
      break;
    case "month-of-year":
      label = { $dateToString: { format: "%Y-%m", date: "$paidAt" } }
      type = "year"
      break;
  }


  const query = selectBy(type)

  try {
    const Revenue = await Order.aggregate([
      { $match: { ...query, isPaid: true } },

      {
        $group: {
          _id: { label: { ...label } },
          value: { $sum: "$totalPrice" },
          orders: { $sum: 1 },
        },
      },
      { $project: { _id: 0, label: "$_id.label", value: 1, orders: 1 } }

    ]);
    res.send(Revenue);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export const statisticController = {
  statisticAll,
  topCustomers,
  getRevenue,
};


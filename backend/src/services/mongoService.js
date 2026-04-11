const NumberModel = require('../models/numberModel');
const mongoose = require('mongoose');

class MongoService {
  isConnected() {
    return mongoose.connection.readyState === 1;
  }

  async queryRange(l, r) {
    if (!this.isConnected()) {
      return { success: false, error: 'MongoDB is not connected' };
    }

    const result = await NumberModel.aggregate([
      {
        $match: {
          index: { $gte: l, $lte: r }
        }
      },
      {
        $sort: { index: 1 }
      },
      {
        $group: {
          _id: null,
          sum: { $sum: '$value' },
          min: { $min: '$value' },
          max: { $max: '$value' },
          count: { $sum: 1 }
        }
      }
    ]);

    return {
      success: true,
      ...(result[0] || { sum: 0, min: 0, max: 0, count: 0 })
    };
  }

  async setArray(arr) {
    if (!this.isConnected()) {
      return { success: false, error: 'MongoDB is not connected' };
    }

    await NumberModel.deleteMany({});

    const docs = arr.map((value, index) => ({
      value,
      index
    }));

    await NumberModel.insertMany(docs);
    return { success: true, count: docs.length };
  }

  async updateRange(l, r, val) {
    if (!this.isConnected()) {
      return { success: false, error: 'MongoDB is not connected' };
    }

    const result = await NumberModel.updateMany(
      { index: { $gte: l, $lte: r } },
      { $inc: { value: val } }
    );

    return {
      success: true,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    };
  }

  async getAll() {
    if (!this.isConnected()) {
      return [];
    }

    const docs = await NumberModel.find().sort({ index: 1 });
    return docs.map(doc => doc.value);
  }

  async getCount() {
    if (!this.isConnected()) {
      return 0;
    }

    return await NumberModel.countDocuments();
  }

  async reset() {
    const defaultArray = [2, 5, 1, 4, 9, 3];
    return await this.setArray(defaultArray);
  }
}

module.exports = new MongoService();

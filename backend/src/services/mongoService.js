const NumberModel = require('../models/numberModel');
const mongoose = require('mongoose');

class MongoService {
  isConnected() {
    return mongoose.connection.readyState === 1;
  }

  async ensureConnected() {
    if (this.isConnected()) {
      return true;
    }

    try {
      const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
      if (!mongoUri) {
        return false;
      }

      await mongoose.connect(mongoUri, {
        connectTimeoutMS: 5000,
        socketTimeoutMS: 5000
      });
      return true;
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
      return false;
    }
  }

  async queryRange(l, r) {
    const connected = await this.ensureConnected();
    if (!connected) {
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
    const connected = await this.ensureConnected();
    if (!connected) {
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
    const connected = await this.ensureConnected();
    if (!connected) {
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
    const connected = await this.ensureConnected();
    if (!connected) {
      return [];
    }

    const docs = await NumberModel.find().sort({ index: 1 });
    return docs.map(doc => doc.value);
  }

  async getCount() {
    const connected = await this.ensureConnected();
    if (!connected) {
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

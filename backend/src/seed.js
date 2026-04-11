require('dotenv').config();
const mongoose = require('mongoose');
const NumberModel = require('./models/numberModel');

const data = [2, 5, 1, 4, 9, 3];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await NumberModel.deleteMany({});
    console.log('Cleared existing data');

    const docs = data.map((value, index) => ({ value, index }));
    await NumberModel.insertMany(docs);

    console.log(`Inserted ${docs.length} documents:`, data);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();

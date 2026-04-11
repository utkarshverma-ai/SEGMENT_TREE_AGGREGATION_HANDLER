require('dotenv').config();

const connectDB = require('./config/db');
const mongoService = require('./services/mongoService');
const segmentTreeService = require('./services/segmentTreeService');
const app = require('./app');

async function startServer(port = process.env.PORT || 5000) {
  const mongoConnected = await connectDB();

  if (mongoConnected) {
    const dbArray = await mongoService.getAll();

    if (dbArray.length > 0) {
      segmentTreeService.setArray(dbArray);
    } else {
      await mongoService.setArray(segmentTreeService.getArray());
    }
  }

  return app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };

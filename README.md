# Segment Tree Aggregation Handler

A cleaned full-stack project for range aggregation using a segment tree with lazy propagation and MongoDB aggregation cross-checks.

## Project Structure

```text
.
├── backend
│   ├── src
│   │   ├── config
│   │   │   └── db.js
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── segmentTree
│   │   │   └── SegmentTree.js
│   │   ├── services
│   │   ├── app.js
│   │   ├── seed.js
│   │   └── server.js
│   ├── test
│   ├── .env.example
│   └── package.json
├── frontend
│   ├── public
│   ├── src
│   └── package.json
├── scripts
│   └── rebuildTree.sh
├── .gitignore
└── README.md
```

## Features

- Range `sum`, `min`, and `max` queries in `O(log n)`
- Lazy propagation range updates in `O(log n)`
- MongoDB aggregation comparison endpoint
- React frontend for array input, query selection, updates, and result display
- Backend test coverage for core segment tree behavior

## Setup

### 1. Install dependencies

```bash
cd backend
npm install
cd ../frontend
npm install
```

### 2. Configure the backend

Create `backend/.env` from `backend/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/segmentTreeDB
```

### 3. Run the backend

```bash
cd backend
npm start
```

### 4. Run the frontend

```bash
cd frontend
npm run dev
```

## Validation Commands

```bash
cd backend
npm test
```

```bash
cd frontend
npm run build
```

## API Endpoints

- `GET /api/sum?l={left}&r={right}`
- `GET /api/min?l={left}&r={right}`
- `GET /api/max?l={left}&r={right}`
- `GET /api/compare?l={left}&r={right}`
- `POST /api/update` with `{ "l": 1, "r": 3, "val": 2 }`
- `POST /api/array` with `{ "array": [2, 5, 1, 4, 9, 3] }`
- `GET /api/state`
- `GET /api/reset`

## Rebuild Script

Run the periodic tree rebuild script from the repository root:

```bash
./scripts/rebuildTree.sh --once
```

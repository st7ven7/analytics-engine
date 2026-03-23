# Analytics Engine

A scalable, event-driven analytics and tracking engine built with NestJS and TypeScript. Designed to collect, process, and analyze user behavior events from multiple applications in real time.

## Overview

Most applications need to track what users are doing — button clicks, page views, signups, errors. This engine provides a single backend service that any number of applications can send events to. Events are processed asynchronously using a queue-based architecture, ensuring the system stays fast and reliable even under high traffic.

## Architecture
```
Client Apps (API Key) → Event Ingestion API → BullMQ Queue (Redis)
                                                      ↓
                                              Background Workers
                                                      ↓
                                              PostgreSQL Database
                                                      ↓
Dashboard (JWT) → Analytics Query API ← Pre-computed Metrics
```

## Key Features

- **Multi-application support** — multiple apps can send events using unique API keys
- **Event-driven architecture** — events are queued and processed asynchronously
- **Background workers** — BullMQ workers handle processing without blocking the API
- **Rate limiting** — per-app request limits to prevent abuse
- **Analytics endpoints** — query pre-aggregated metrics instantly
- **Secure by design** — API key auth for ingestion, JWT auth for analytics queries

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS (TypeScript) |
| Database | PostgreSQL |
| ORM | TypeORM |
| Queue | BullMQ |
| Cache / Queue Store | Redis |
| Authentication | API Keys + JWT |

## Modules

| Module | Responsibility |
|---|---|
| `apps` | Register applications, generate and manage API keys |
| `events` | Receive and queue incoming events from client apps |
| `workers` | Process queued events, compute and store analytics |
| `analytics` | Serve pre-computed metrics to authenticated dashboard users |

## API Endpoints

### App Registration
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/apps` | Register a new application |
| GET | `/api/v1/apps` | List all registered applications |
| GET | `/api/v1/apps/:id` | Get a specific application |

### Event Ingestion
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/v1/events` | API Key | Send an event |

### Analytics
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/analytics/events` | JWT | Get event counts by app |
| GET | `/api/v1/analytics/events/:eventName` | JWT | Get counts for a specific event |

## Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL
- Redis (or Memurai on Windows)
- pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/st7ven7/analytics-engine.git
cd analytics-engine

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database and Redis credentials

# Start in development mode
pnpm start:dev
```

### Environment Variables
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=analytics_engine

REDIS_HOST=localhost
REDIS_PORT=6379

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

## Project Status

🚧 Active development — building phase by phase.

- [x] Project setup and configuration
- [x] Database entities
- [ ] Apps module — app registration and API key generation
- [ ] Events module — event ingestion and queueing
- [ ] Workers module — background event processing
- [ ] Analytics module — query endpoints
---
trigger: always_on
---

# LUCIDIA: System Architecture & Tech Stack

## 1. Core Identity
You are an expert Software Architect and Principal Engineer working on "LUCIDIA", a high-performance Distributed Graphics Engine and collaborative mind-mapping platform. Your code must prioritize performance (60 FPS minimum), minimal latency, and strict type safety.

## 2. Frontend Architecture (Micro-Frontend)
- **UI Shell:** Next.js, Tailwind CSS, Shadcn UI. Used ONLY for routing, authentication, and wrapping core modules.
- **Core Graphics:** WebGL / WebGPU. All node/edge rendering happens directly on the Canvas to leverage GPU acceleration. Do NOT use DOM elements for mind-map nodes.
- **Computation Engine (WASM):** WebAssembly compiled from Rust/C++. Handles heavy lifting: force-directed layouts, affine matrix transformations, and hit-testing.
- **State & Sync:** Yjs or Automerge (CRDTs). Used for local multi-player state resolution.
- **Data Transfer:** FlatBuffers. Always use binary formats for transferring data between WASM and WebSockets. Avoid JSON.stringify/parse at all costs in the critical rendering loop.

## 3. Backend Architecture (Microservices)
- **API Gateway:** GraphQL (for metadata aggregation) & REST (for Auth/Billing).
- **Communication:**
  - *External:* Binary WebSockets transferring FlatBuffers delta updates.
  - *Internal:* gRPC with Protobuf for high-speed inter-service communication.
- **Event Streaming:** Redpanda (C++ based Kafka alternative). Acts as the central event log for all node mutations.
- **Real-time Processing:** Rust/Go services running Headless CRDTs to merge Redpanda streams into consolidated snapshots.

## 4. Polyglot Persistence
Always map data to the correct database:
- **PostgreSQL:** Relational data (Users, Workspaces, RBAC, hierarchical folder structures using `WITH RECURSIVE`).
- **ArangoDB / NebulaGraph:** Deep relational queries (n-level node/edge connections).
- **ScyllaDB:** Extremely fast NoSQL storage for full mind-map Snapshots (C++ engine).
- **Redis:** Volatile, in-memory data (Presence, live mouse coordinates).
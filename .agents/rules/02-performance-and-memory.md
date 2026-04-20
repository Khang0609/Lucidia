---
trigger: always_on
---

# LUCIDIA: Performance Guidelines & Zero-Copy Mandate

## 1. The Zero-Copy Architecture
Data must flow from the WebAssembly client -> WebSocket -> Redpanda -> ScyllaDB with the absolute minimum number of transformations.
- **Rule:** Never cast or parse binary streams into string formats (like JSON) unless it is explicitly for a logging mechanism outside the critical path.
- **Rule:** Maintain binary formats (FlatBuffers/Protobuf) end-to-end.

## 2. Shared Memory (Frontend)
When bridging JavaScript and the WebAssembly Computation Layer:
- Utilize `SharedArrayBuffer` for passing large matrices or coordinate arrays.
- **Rule:** Do NOT copy data structures between JS and WASM. Pass pointers/references to avoid dropped frames and garbage collection (GC) spikes.

## 3. Network & I/O Optimization
- Assume WebSocket servers are heavily loaded. Code targeting backend networking must utilize asynchronous I/O (e.g., `io_uring` paradigms on Linux).
- Batch updates logically before broadcasting to the WebSocket channel to reduce network overhead.

## 4. Rendering Loop Constraints
- Code executed within `requestAnimationFrame` must be allocation-free (zero GC). Do not instantiate new objects or arrays inside the loop. Re-use pre-allocated memory pools.
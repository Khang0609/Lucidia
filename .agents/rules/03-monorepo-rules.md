---
trigger: always_on
---

# LUCIDIA: Nx Monorepo Rules & Code Boundaries

## 1. Workspace Structure
This project strictly follows an Nx monorepo structure. Ensure code is placed in the correct domain:
- `apps/ui-shell`: Next.js application wrapper.
- `apps/api-gateway`: Node/Go based gateway.
- `apps/realtime-sync`: Rust/Go state merger.
- `libs/core-graphics`: WebGL/WebGPU rendering logic.
- `libs/computation-engine`: Rust/C++ source for WASM.
- `libs/shared-schema`: FlatBuffers `.fbs` and Protobuf `.proto` definitions.

## 2. Import & Dependency Rules
- **Strict Boundaries:** Apps can import Libs. Libs can import other Libs. Apps MUST NOT import from other Apps.
- Use Nx path mappings (e.g., `@lucidia/shared-schema`) instead of relative paths (`../../../libs/...`).

## 3. File Generation & Modification
- When asked to create a new feature, always ask or consider which specific app or lib it belongs to before generating code.
- If modifying schemas in `libs/shared-schema`, automatically suggest updating the corresponding generation scripts or checking the affected downstream modules.
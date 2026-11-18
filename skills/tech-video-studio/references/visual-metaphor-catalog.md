# Visual Metaphor Catalog for Technical Explainer Videos

To keep viewers engaged across a 1–10 minute YouTube video, **never draw generic rectangles when a concrete physical or schematic metaphor exists**.

---

## Built-In Domain Metaphors (`TechVideoStudio.Illustrations`)

| Engineering Domain | Concept Examples | Built-in Metaphor Primitive | Visual Storytelling Why It Works |
| :--- | :--- | :--- | :--- |
| **Code & Build** | Source files, SDKs, Configs, Smart Contracts | `codeEditorWindow` | Traffic lights, file tab, line numbers, and syntax highlighting immediately signal "human-written source code". |
| **Compilers & Bundlers** | `javac`, `rustc`, `esbuild`, Webpack, Babel | `compilerGear` + `bytecodeCapsule` | Rotating mechanical teeth + hex magic header (`0xCAFEBABE`) visualize transformation from text to portable binary. |
| **OS & Cross-Platform** | WORA, Multi-arch builds, Edge clients, Workers | `hardwareMachine` (`pc`, `server`, `laptop`) | Distinct physical silhouettes (Monitor stand vs 19" LED Rack vs Ultrabook) prove hardware diversity without words. |
| **Tiered Hierarchies** | ClassLoaders, CPU L1/L2/L3, DNS Root->TLD, Storage | `tieredVault` | Gold/Silver/Bronze armored tiers with lock badges convey authority, delegation order, and isolation. |
| **Security & Validation** | Bytecode Verifier, WAF, JWT Auth, Zero-Trust, CORS | `xraySecurityScanner` | Sweeping holographic laser beam + live VALID checkmarks + red Attack Deflection Shield dramatize active protection. |
| **Execution & Call Stacks** | Thread Stack, Recursion, Coroutines, Event Loop | `lifoStackChamber` | Vertical glass chamber with active frame highlight (`ACTIVE REF •`) clarifies LIFO call order at a glance. |
| **Dynamic Memory & GC** | Heap allocation, Pointers, ZGC/G1GC, Memory Leaks | `memoryHeapGrid` + `Connectors.laserBeam` | Fiber-optic pointer beam linking Stack to a live Avatar Card while a hovering Sweeper Drone reclaims severed dead objects. |
| **Interpreters & Logs** | Bytecode Interpreter, WAL Log, Event Sourcing | `sequentialReader` | Highlighted active instruction slot inside a sequential tape shows low-latency startup and ordered execution. |
| **Profilers & Optimizers** | HotSpot JIT, Auto-scaling triggers, Rate Limiters | `turboForge` | Speedometer gauge redlining at `10,000x` + pulsing Nitro Flame turns abstract thresholds into visceral speed. |
| **Low-Level Hardware** | Native Assembly, SIMD, Kernel syscalls, Registers | `nativeAssemblyBlock` + `siliconCpuDie` | Gold-pinned CPU die paired with live `RAX/RBX/RCX` register readouts proves bare-metal execution speed. |
| **Web & APIs** | HTTP/1-2-3, REST, GraphQL, gRPC, OAuth Redirects | `browserClient` + `Connectors.bidirectional` | HTTPS lock bar + dual request/response packet orbs clearly distinguish client-initiated roundtrips. |
| **Databases & Storage** | PostgreSQL, MySQL, ACID, Read Replicas, Sharding | `isometricDatabase` | 3D multi-platter storage cylinder instantly distinguishes persistent disk state from stateless compute nodes. |
| **Streaming & Queues** | Kafka, RabbitMQ, SQS, Backpressure, Pub/Sub | `messageQueuePipe` | Sliding partitioned message capsules inside a horizontal tube intuitively demonstrate asynchronous decoupling. |
| **In-Memory Caching** | Redis, Memcached, CDN Edge Cache, Page Cache | `cacheMemoryMatrix` | 3x3 RAM cell grid with flashing emerald `HIT ⚡` cells conveys O(1) sub-millisecond lookups. |

---

## Authoring Custom Metaphors for New Topics

When a video needs a metaphor not yet in `Illustrations` (e.g., **Consistent Hashing Ring**, **B-Tree Split**, **TCP 3-Way Handshake Timeline**, **Transformer Attention Matrix**, or **Git Commit DAG**):

1. **Register crisp custom SVGs** via `createVideo({ customIcons: { myIcon: '<svg ...>' } })` and draw them with `Icons.get('myIcon')`.
2. **Draw physical/geometric structures** directly on `ctx` (rings, trees, swimlanes, gauges) wrapped inside `Layout.scaleAround(...)` rather than falling back to plain text boxes.
3. **Animate the mechanism**: move a token around the hash ring, pulse the attention weights, or slide the TCP `SYN` / `SYN-ACK` / `ACK` packets across vertical swimlanes.

const CHUNK_PUBLIC_PATH = "server/pages/_error.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_c0c796._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__69aa1f._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/frontend/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/frontend/node_modules/next/error.js [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/frontend/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/frontend/node_modules/next/app.js [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;

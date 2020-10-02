"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesRouter = exports.authRouter = void 0;
const auth_1 = require("./api/auth");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return auth_1.router; } });
const files_1 = require("./api/files");
Object.defineProperty(exports, "filesRouter", { enumerable: true, get: function () { return files_1.router; } });

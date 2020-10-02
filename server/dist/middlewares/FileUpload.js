"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        let destination = `C:/users/jatin/dev/typescript-express/file-uploading-system/server/uploads/${req.user.id}`;
        if (!fs_1.default.existsSync(destination)) {
            fs_1.default.mkdirSync(destination);
        }
        cb(null, destination);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = file.fieldname + "-" + uniqueSuffix + ".pdf";
        req.filename = filename;
        cb(null, filename);
    },
});
const upload = multer_1.default({ storage: storage });
exports.default = upload;

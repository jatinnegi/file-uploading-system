import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destination = `C:/users/jatin/dev/typescript-express/file-uploading-system/server/uploads/${req.user.id}`;

    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }

    cb(null, destination);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + "-" + uniqueSuffix + ".pdf";
    req.filename = filename as string;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

export default upload;

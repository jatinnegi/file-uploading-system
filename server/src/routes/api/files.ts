import express, { Request, Response } from "express";
import { auth, UploadFileValidator } from "../../middlewares";
import { upload } from "../../middlewares";
import db from "../../db";
import fs from "fs";

export const router = express.Router({ strict: true });

// @route   GET /api/files
// @desc    Get all files of the user
// @access  Private
router.get("/", auth, async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const results = await db.query(
      "select id,title,filename,created_at from files where user_id=$1",
      [id]
    );

    const files = results.rows;

    return res.status(200).json(files);
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

// @route   POST /api/files/upload-file
// @desc    Upload a file
// @access  Private
router.post(
  "/upload-file",
  [auth, upload.single("pdfFile"), UploadFileValidator],
  async (req: Request, res: Response) => {
    try {
      const { title } = req.body;
      const { filename } = req;
      const { id } = req.user;

      const results = await db.query(
        "insert into files (user_id, title, filename) values ($1,$2,$3) returning id, title, filename, created_at",
        [id, title, filename]
      );

      const newFile = results.rows[0];

      return res.status(201).json(newFile);
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }
);

// @route   DELETE /api/files/:id
// @desc    Delete a file
// @access  Private
router.delete("/:id", auth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const results = await db.query(
      "delete from files where user_id=$1 and id=$2 returning id,filename",
      [userId, id]
    );

    if (results.rows.length === 0) {
      return res.status(400).json({ errors: [{ msg: "File not found" }] });
    }

    const filename = results.rows[0].filename;
    const filepath = `C:/users/jatin/dev/typescript-express/file-uploading-system/server/uploads/${userId}/${filename}`;

    fs.unlinkSync(filepath);

    const deletedFileId = results.rows[0].id;

    return res.status(200).json({ id: deletedFileId });
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

// @route   Get /api/files/download-file/:id
// @desc    Download file
// @access  Private
router.get(
  "/download-file/:id/:userId",
  async (req: Request, res: Response) => {
    try {
      const { id, userId } = req.params;
      const results = await db.query(
        "select filename from files where user_id=$1 and id=$2",
        [userId, id]
      );

      const filename = results.rows[0].filename;
      const file = `C:/users/jatin/dev/typescript-express/file-uploading-system/server/uploads/${userId}/${filename}`;

      return res.download(file);
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }
);

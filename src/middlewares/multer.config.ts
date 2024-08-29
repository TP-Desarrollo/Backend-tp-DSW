import multer, { FileFilterCallback } from "multer";
import { Request, Response, NextFunction } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, './src/uploads')
  },
  filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    return cb(new Error('Only image files are allowed!'));
  }
  cb(null, true);
};

export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB file size limit
  }
}).single('imageUrl'); // Expect a single file with the field name 'imageUrl'

// Middleware to use before your route handler
export const handleUpload = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, function (err: any) {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err);
      return res.status(500).json({ error: err.message });
    } else if (err) {
      console.error("Unknown error:", err);
      return res.status(500).json({ error: err.message });
    }
    
    console.log("File uploaded successfully");
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);
    next();
  });
};
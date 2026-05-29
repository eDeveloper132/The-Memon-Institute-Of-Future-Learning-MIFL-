import multer from 'multer';

// Use memory storage instead of disk for Vercel/Sanity compatibility
const storage = multer.memoryStorage();

// File filter to restrict types
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = [
        'image/jpeg', 
        'image/jpg',
        'image/png', 
        'image/gif', 
        'image/webp',
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        console.warn(`[Multer] Blocked invalid MIME type: ${file.mimetype} for file: ${file.originalname}`);
        cb(new Error(`Invalid file type (${file.mimetype}). Only JPG, PNG, GIF, WEBP, PDF, and DOC/DOCX are allowed.`));
    }
};

export const chatUpload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Increase to 10MB for PDFs
    fileFilter: fileFilter
});

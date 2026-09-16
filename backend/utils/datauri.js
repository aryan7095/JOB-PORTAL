import DataUriParser from "datauri/parser.js"

import path from "path";

// Converts an in-memory uploaded file (e.g. from multer's memory storage) into a
// base64 data URI, which can then be passed directly to Cloudinary's upload API
// without needing to write the file to disk first
const getDataUri = (file) => {
    const parser = new DataUriParser();
    // Extract the file extension (e.g. ".jpg", ".pdf") from the original filename
    const extName = path.extname(file.originalname).toString();
    // Build the data URI using the extension and the file's raw buffer contents
    return parser.format(extName, file.buffer);
}

export default getDataUri;

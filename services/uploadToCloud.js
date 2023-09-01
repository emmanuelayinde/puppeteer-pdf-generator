require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const streamOptions = {
  overwrite: true,
  resource_type: "image",
  format: "pdf",
  public_id: "output.pdf",
  folder: process.env.CLOUDINARY_FOLDER_NAME,
};

const fileOptions = {
  overwrite: true,
  resource_type: "image",
  format: "pdf",
  public_id: "file",
  folder: process.env.CLOUDINARY_FOLDER_NAME,
};

const uploadStream = async (pdfStream, res) => {
  cloudinary.uploader
    .upload_stream(streamOptions, (error, result) => {
      if (error) {
        res.send("Error uploading PDF to Cloudinary:", error);
      } else {
        res.send(`PDF uploaded to Cloudinary: ${result.secure_url}`);
      }
    })
    .end(pdfStream);
};

const uploadFile = async (file, res) => {
  try {
    const result = await cloudinary.uploader.upload(file, fileOptions);
    res.send(`File uploaded to Cloudinary: ${result.secure_url}`);
  } catch (error) {
    res.send("Error uploading file to Cloudinary:", error);
  }
};

module.exports = {
  uploadStream,
  uploadFile,
};

const admin = require("firebase-admin");
const serviceAccount = require("../config/firebaseConfig.json");
const generateID = require("./generateID");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://isolution-blog-default-rtdb.firebaseio.com",
  storageBucket: "gs://isolution-blog.appspot.com",
});

const bucket = admin.storage().bucket();

const uploadToFirebase = async (pdfBuffer) => {
  const id = generateID();
  const fileName = "pdf" + id + ".pdf";
  const file = bucket.file(fileName);

  try {
    await file.save(pdfBuffer, {
      metadata: {
        contentType: "application/pdf", // Set the appropriate content type
      },
    });

    const generatedURL = await retrieveFileUrl(file);
    return generatedURL;
  } catch (error) {
    console.log({ error });
    return;
  }
};

const retrieveFileUrl = async (file) => {
  try {
    // Generate a signed URL with an expiration time
    const expirationInDays = 7;
    const options = {
      action: "read",
      expires: Date.now() + expirationInDays * 24 * 60 * 60 * 1000,
    };
    // Get the signed URL
    const [downloadUrl] = await file.getSignedUrl(options);
    console.log(downloadUrl);
    return downloadUrl;
  } catch (error) {
    console.log({ error });
    return;
  }
};

module.exports = {
  uploadToFirebase,
  retrieveFileUrl,
};

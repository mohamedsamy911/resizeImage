const express = require("express");
const app = express();
const upload = require("./middleware/multer");
const resizeUpload = require("./resizeImage");

const PORT = 8000;
app.use(express.json());

app.get("/resize", upload.single("image"), resizeUpload);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

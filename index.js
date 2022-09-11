const express = require("express");
var cors = require('cors')
const app = express();
const upload = require("./middleware/multer");
const resizeUpload = require("./resizeImage");
const {getAllLayers} = require('./callGeoserver')

const PORT = 8000;
app.use(express.json());
app.use(cors())


app.post("/resize", upload.single("image"), resizeUpload);
app.post("/getlayers", getAllLayers);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

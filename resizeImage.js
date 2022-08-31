const sharp = require("sharp");
const fs = require("fs");
const APICall = require("./APICall");
const writeStyle = require("./writeStyle");
const parseToJSON = require("./parseToJSON");
require("dotenv").config();

const resizeUpload = async (req, res) => {
  try {
    var uploadedLinks = [];
    let sentLinks = parseToJSON(req, res);
    for (let size of sentLinks) {
      let inputFile = fs.createReadStream(req.file.path);
      // output stream
      let outResizedPng = `./output/${
        req.file.originalname.split(".")[0]
      }_size_${size.size}.png`;

      let outStream = fs.createWriteStream(outResizedPng, { flags: "w" });
      // on error of output file being saved
      outStream.on("error", function () {
        console.log("Error");
      });

      // on success of output file being saved

      // input stream transformer
      // "info" event will be emitted on resize
      let transform = sharp()
        .resize({
          width: parseInt(size.size),
          height: parseInt(size.size),
        })
        .on("info", function (fileInfo) {});

      inputFile.pipe(transform).pipe(outStream);

      await new Promise((resolve) => outStream.on("close", resolve));
      let link = await APICall(req, res, outResizedPng, size);
      uploadedLinks.push(link);
    }
    const xmlFile = writeStyle(req, res, uploadedLinks);
    res.header("Content-Type", "text/xml");
    res.send(xmlFile);
  } catch (error) {
    console.log(error);
  }
};

module.exports = resizeUpload;

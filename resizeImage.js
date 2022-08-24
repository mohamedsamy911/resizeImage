const sharp = require("sharp");
const fs = require("fs");
const APICall = require('./APICall')
const writeStyle = require('./writeStyle')

const resizeUpload = async (req, res) => {

  for (let size of req.body.size) {
    let inputFile = fs.createReadStream(req.file.path);    
    // output stream
    let outResizedPng = `./output/${req.file.originalname.split(".")[0]}_size_${size}.png`;

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
        width: parseInt(size),
        height: parseInt(size),
      })
      .on("info", function (fileInfo) {});

    inputFile.pipe(transform).pipe(outStream);

    await new Promise((resolve) => outStream.on("close", resolve));
    var uploadedLinks = await APICall(req , res , outResizedPng ,size)

    }
    writeStyle (req, uploadedLinks)
    res.status(200).json({ 
      Message : "Success",
      uploadedLinks });
      return uploadedLinks
};



module.exports = resizeUpload;

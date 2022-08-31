const fs = require("fs");
const { default: axios } = require("axios");
var FormData = require("form-data");
const APICall = async (req, res, img, size) => {
  let bodyFormData = new FormData();
  let readFile = fs.createReadStream(img);
  bodyFormData.append("file", readFile);
  bodyFormData.append("metadata", `{"category": ${req?.body?.category}}`);
  var options = {
    method: process.env.METHOD,
    url: process.env.URL,
    headers: {
      PentaOrgID: req?.headers?.org,
      PentaSelectedLocale: req?.headers?.lang,
      PentaUserRole: req?.headers?.role,
      ...bodyFormData.getHeaders(),
    },
    data: bodyFormData,
  };
  return await axios(options)
    .then((e) => {
      var lin = e.data.fileDownloadUri;
      lin = `http://olympic.eastus.cloudapp.azure.com:8080${lin.substring(
        0,
        lin.lastIndexOf("&") + 1
      )}amp;${lin.substring(lin.lastIndexOf("&") + 1)}`;

      var uploadedLink = {
        Size: size.size,
        link: lin,
        max: size.max,
        min: size.min
      };
      console.log(uploadedLink);
      return uploadedLink
    })
    .catch((err) => {
      res.json({
        Error: "Catch Error",
        err,
      });
    });
};
module.exports = APICall;

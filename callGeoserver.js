const { GeoServerRestClient } = require("geoserver-node-client");

const getAllLayers = async (req, res) => {
  const url = `${req.body.url}/rest/`;
  const user = req.body.user;
  const pw = req.body.pw;
  const grc = new GeoServerRestClient(url, user, pw);
  //   grc.about.exists
  try {
    const allLayers = await grc.layers.getAll();
    const allStyles = await grc.styles.getAll();
    res.status(200).json({
      Layers: allLayers.layers.layer,
      Styles: allStyles,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof GeoServerResponseError) {
      // a GeoServer specific error happened
    } else {
      // another error happened
    }
  }
};

const createStyle = async (req, res, stylebody) => {
  const url = `${req.body.url}/rest/`;
  const user = req.body.user;
  const pw = req.body.pw;
  const grc = new GeoServerRestClient(url, user, pw);
  try {
    await grc.styles.publish(
      req.body.layername.substring(1, req.body.layername.lastIndexOf(":")),
      req.body.stylename.substring(1, req.body.stylename.length - 1),
      stylebody
    );
    await setLayerStyle(req, res, req.body.stylename);
  } catch (error) {
    console.log(error);
    if (error instanceof GeoServerResponseError) {
      // a GeoServer specific error happened
    } else {
      // another error happened
    }
  }
};

const setLayerStyle = async (req, res, style) => {
  const url = `${req.body.url}/rest/`;
  const user = req.body.user;
  const pw = req.body.pw;
  const grc = new GeoServerRestClient(url, user, pw);
  try {
    await grc.styles.assignStyleToLayer(
      req.body.layername.substring(1, req.body.layername.lastIndexOf(":")),
      req.body.layername.substring(
        req.body.layername.lastIndexOf(":") + 1,
        req.body.layername.length - 1
      ),
      req.body.layername.substring(1, req.body.layername.lastIndexOf(":")),
      style.substring(1, req.body.stylename.length - 1),
      true
    );
    res.status(200).json({
      Message: "Done",
    });
  } catch (error) {
    res.status(500).json({
      Message: "Failed",
      error,
    });
    console.log(error);
    if (error instanceof GeoServerResponseError) {
      // a GeoServer specific error happened
    } else {
      // another error happened
    }
  }
};

module.exports = { getAllLayers, createStyle };

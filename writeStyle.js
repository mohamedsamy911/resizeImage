const fs = require("fs");
const writeStyle = (req, links) => {
  let finalStyle = "";
  var style = "";
  var styleHeader = `<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:se="http://www.opengis.net/se" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ogc="http://www.opengis.net/ogc" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/StyledLayerDescriptor.xsd" version="1.1.0">
  <NamedLayer>
    <se:Name>${req.body.category}</se:Name>
    <UserStyle>
      <se:Name>${req.body.category}</se:Name>
      <se:FeatureTypeStyle>`;
  var styleFooter = `</se:FeatureTypeStyle>
</UserStyle>
</NamedLayer>
</StyledLayerDescriptor>`;
  for (let link of links) {
    let styleSample = `<se:Rule>
<se:Name></se:Name>
<se:MinScaleDenominator>1</se:MinScaleDenominator>
<se:MaxScaleDenominator>10000</se:MaxScaleDenominator>
<se:PointSymbolizer>
<se:Graphic>
    <se:ExternalGraphic>
      <se:OnlineResource xlink:href="${link.link}"/>
      <se:Format>image/png</se:Format>
    </se:ExternalGraphic>
    <se:ExternalGraphic>
      <se:OnlineResource xlink:href="${link.link}" xlink:type="simple"/>
      <se:Format>image/png</se:Format>
    </se:ExternalGraphic>
    <se:Mark>
      <se:WellKnownName>square</se:WellKnownName>
      <se:Fill>
        <se:SvgParameter name="fill">#db1e2a</se:SvgParameter>
      </se:Fill>
      <se:Stroke>
        <se:SvgParameter name="stroke">#ffee01</se:SvgParameter>
        <se:SvgParameter name="stroke-width">2.5</se:SvgParameter>
      </se:Stroke>
    </se:Mark>
    <se:Size>${parseInt(link.Size)}</se:Size>
  </se:Graphic>
</se:PointSymbolizer>
</se:Rule>`;
    style = style.concat("\n", styleSample);
  }
  finalStyle = `${styleHeader} \n ${style} \n ${styleFooter}`;
  let file = fs.writeFile("./text.sld", finalStyle, ["utf8"], function (err) {
    if (err) return console.log(err);
  });
  return file
};
module.exports = writeStyle;

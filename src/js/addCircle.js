import VectorLayer from 'ol/layer/Vector'
import {Vector} from 'ol/source';
import Icon from 'ol/style/Icon'
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import Feature from 'ol/Feature'
import {Circle, Point }from 'ol/geom'
import {fromLonLat,transform} from 'ol/proj'
import Overlay from 'ol/Overlay'
import {toStringHDMS} from 'ol/coordinate'
export default function drawCircle (map,center){
    var circleLayer = new VectorLayer({
        source: new Vector()
    })
    // var center = transform([123.06752642268194,29.28601388835014],"EPSG:4326","EPSG:3857")
    var circle = new Feature({
        geometry: new Circle(center, 2000)
    })

    var style = new Style({
        stroke: new Stroke({
            color:"#f00",
            width:2
        }),
        fill: new Fill({
            color: [255,255,0,0.1]
        })
    })
    circle.setStyle(style)
    circleLayer.getSource().addFeature(circle)
    map.addLayer(circleLayer)
    return circleLayer
}
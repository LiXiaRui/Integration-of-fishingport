import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Point, LineString, Polygon } from 'ol/geom'
import Feature from 'ol/Feature'
import { Style, Stroke, Circle, Fill, Text } from 'ol/style'
import { transform } from 'ol/proj'
import addShip from "./addShip";


export default function addAlarmZone(map) {
    var relaxShipZoneSource = new VectorSource()

    var relaxShipZoneData = [
        [126.9526906288968, 31.255963776795895],
        [128.125765427054, 31.255963776795895],
        [128.125765427054, 30.508900176056386],
        [126.9526906288968, 30.508900176056386]
    ]

    //坐标转换
    function tranPoint(coordinate) {
        let len = coordinate.length
        for (let i = 0; i < len; i++) {
            coordinate[i] = transform(coordinate[i], 'EPSG:4326', 'EPSG:3857')
        }
        return coordinate
    }

    function drawAllFishZoneAreaData(transPointData, source) {
        let areaArray = []
        areaArray.push(transPointData)
        var areaFeature = new Feature(
            new Polygon(areaArray)
        )

        var style = new Style({
            stroke: new Stroke({
                color: "#00f",
                width: 1.5
            }),
            fill: new Fill({
                color: [255, 255, 255, 0.2]
            })
        })
        areaFeature.setStyle(style)
        source.addFeature(areaFeature)
    }

    var _relaxShipZoneData = tranPoint(relaxShipZoneData)


    drawAllFishZoneAreaData(_relaxShipZoneData, relaxShipZoneSource)

    var relaxShipZoneLayer = new VectorLayer({
        source: relaxShipZoneSource,
    })

    relaxShipZoneLayer.setVisible(true)
    map.addLayer(relaxShipZoneLayer)

    return relaxShipZoneLayer

}   
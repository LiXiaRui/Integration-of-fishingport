import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Point, LineString, Polygon } from 'ol/geom'
import Feature from 'ol/Feature'
import { Style, Stroke, Circle, Fill, Text } from 'ol/style'
import { transform } from 'ol/proj'
import addShip from "./addShip";


export default function addAlarmZone(map) {

    var fishingZoneSource = new VectorSource()


    var fishingZoneData = [
        [126.9526906288968, 29.255963776795895],
        [128.125765427054, 29.255963776795895],
        [128.125765427054, 28.508900176056386],
        [126.9526906288968, 28.508900176056386]
    ]

    //坐标转换
    function tranPoint(coordinate) {
        let len = coordinate.length
        for (let i = 0; i < len; i++) {
            coordinate[i] = transform(coordinate[i], 'EPSG:4326', 'EPSG:3857')
        }
        return coordinate
    }

    function drawAllFishZoneAreaData(transPointData) {
        let areaArray = []
        areaArray.push(transPointData)
        var areaFeature = new Feature(
            new Polygon(areaArray)
        )
        var colorZone = '#0ef';

        var style = new Style({
            stroke: new Stroke({
                color: colorZone,
                width: 1.5
            }),
            fill: new Fill({
                color: [255, 255, 255, 0.2]
            })
        })
        areaFeature.setStyle(style)
        fishingZoneSource.addFeature(areaFeature)
    }


    var _fishingZoneData = tranPoint(fishingZoneData)

    drawAllFishZoneAreaData(_fishingZoneData, fishingZoneSource)



    var fishingZoneLayer = new VectorLayer({
        source: fishingZoneSource,
        visible: false
    })


    fishingZoneLayer.setVisible(true)
    map.addLayer(fishingZoneLayer)

    return fishingZoneLayer
}   
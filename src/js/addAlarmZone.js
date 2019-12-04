import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Point, LineString, Polygon } from 'ol/geom'
import Feature from 'ol/Feature'
import { Style, Stroke, Circle, Fill, Text } from 'ol/style'
import { transform } from 'ol/proj'


export default function addAlarmZone(map) {
    var alarmZoneSource = new VectorSource()

    var alarmZoneData = [
        [126.9526906288968, 32.255963776795895],
        [128.125765427054, 32.255963776795895],
        [128.125765427054, 31.508900176056386],
        [126.9526906288968, 31.508900176056386]
    ]


    //坐标转换
    function tranPoint(coordinate) {
        let len = coordinate.length
        for (let i = 0; i < len; i++) {
            coordinate[i] = transform(coordinate[i], 'EPSG:4326', 'EPSG:3857')
        }
        return coordinate
    }

    var transAlarmZoneData = tranPoint(alarmZoneData)

    function drawAllFishZoneAreaData(transAlarmZoneData) {
            let areaArray = []
            areaArray.push(transAlarmZoneData)
            var areaFeature = new Feature(
                new Polygon(areaArray)
            )
            var style = new Style({
                stroke: new Stroke({
                    color: "#f00",
                    width: 1.5
                }),
                fill: new Fill({
                    color: [240, 0, 0, 0.2]
                })
            })
            areaFeature.setStyle(style)
            alarmZoneSource.addFeature(areaFeature)
    }

    drawAllFishZoneAreaData(transAlarmZoneData)
    var alarmZoneLayer = new VectorLayer({
        source: alarmZoneSource
    })
    map.addLayer(alarmZoneLayer)

}
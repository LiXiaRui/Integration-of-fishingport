import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Point, LineString, Polygon } from 'ol/geom'
import Feature from 'ol/Feature'
import { Style, Stroke, Circle, Fill, Text } from 'ol/style'
import { transform } from 'ol/proj'
import addShip from "./addShip";


export default function addAlarmZone(map) {

    var fishingZoneSource = new VectorSource()
    var wordZoneSource = new VectorSource()


    var fishingZoneData = [
        [126.9526906288968, 29.255963776795895],
        [128.125765427054, 29.255963776795895],
        [128.125765427054, 28.508900176056386],
        [126.9526906288968, 28.508900176056386]
    ]

    var wordZone = [
        [127.17034233101498, 28.902621661875756],
        [127.55548680400756, 28.902621661875756],
        [127.91352969785515, 28.902621661875756]
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
    function drawWordZone(transPointData,source) {
        var len = transPointData.length
        for (var i = 0; i < len; i++) {
            var wordFeature = new Feature(
                new Point(transPointData[i])
            )
            var textcontent
            switch (i) {
                case 0:
                    textcontent = "海"
                    break;
                case 1:
                    textcontent = "钓"
                    break;
                case 2:
                    textcontent = "区"
                    break;
                default:
                    break;
            }
            var style = new Style({
                text: new Text({
                    font: 'bold 16px serif',
                    text: textcontent,
                    fill: new Fill({
                        color: "#2fe"
                    })
                })
            })
            wordFeature.setStyle(style)
            source.addFeature(wordFeature)
        }
    }

    var _fishingZoneData = tranPoint(fishingZoneData)

    drawAllFishZoneAreaData(_fishingZoneData, fishingZoneSource)
    drawWordZone(tranPoint(wordZone),wordZoneSource)

    var wordZoneLayer = new VectorLayer({
        source: wordZoneSource
    })

    var fishingZoneLayer = new VectorLayer({
        source: fishingZoneSource,
    })


    map.addLayer(fishingZoneLayer)
    map.addLayer(wordZoneLayer)

    var temp = []
    temp.push(fishingZoneLayer)
    temp.push(wordZoneLayer)
    return temp
}   
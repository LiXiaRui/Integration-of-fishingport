import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Point, LineString, Polygon } from 'ol/geom'
import Feature from 'ol/Feature'
import { Style, Stroke, Circle, Fill, Text } from 'ol/style'
import { transform } from 'ol/proj'



export default function addAlarmZone(map) {

    var breedZoneSource = new VectorSource()
    var wordZoneSource = new VectorSource()


    var breedZoneData = [
        [126.9526906288968, 30.255963776795895],
        [128.125765427054, 30.255963776795895],
        [128.125765427054, 29.508900176056386],
        [126.9526906288968, 29.508900176056386]
    ]

    var wordZone = [
        [127.17034233101498, 29.894519085431483],
        [127.55548680400756, 29.894519085431483],
        [127.91352969785515, 29.894519085431483]
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
        var colorZone = "#0f0";

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
        breedZoneSource.addFeature(areaFeature)
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
                    textcontent = "养"
                    break;
                case 1:
                    textcontent = "殖"
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

    var _breedZoneData = tranPoint(breedZoneData)


    drawAllFishZoneAreaData(_breedZoneData, breedZoneSource)
    drawWordZone(tranPoint(wordZone),wordZoneSource)

    var wordZoneLayer = new VectorLayer({
        source: wordZoneSource
    })

    var breedZoneLayer = new VectorLayer({
        source: breedZoneSource,
    })

    map.addLayer(breedZoneLayer)
    map.addLayer(wordZoneLayer)
    var temp = []
    temp.push(breedZoneLayer)
    temp.push(wordZoneLayer)
    return temp

}   
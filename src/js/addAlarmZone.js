import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Point, LineString, Polygon } from 'ol/geom'
import Feature from 'ol/Feature'
import { Style, Stroke, Circle, Fill, Text } from 'ol/style'
import { transform } from 'ol/proj'
import addShip from "./addShip";


export default function addAlarmZone(map,flag) {
    var alarmZoneSource = new VectorSource()
    var relaxShipZoneSource = new VectorSource()
    var breedZoneSource = new VectorSource()
    var fishingZoneSource = new VectorSource()

    var alarmZoneProtectionData = [
        [126.9526906288968, 32.255963776795895],
        [128.125765427054, 32.255963776795895],
        [128.125765427054, 31.508900176056386],
        [126.9526906288968, 31.508900176056386]
    ]

    var relaxShipZoneData = [
        [126.9526906288968, 31.255963776795895],
        [128.125765427054, 31.255963776795895],
        [128.125765427054, 30.508900176056386],
        [126.9526906288968, 30.508900176056386]
    ]

    var breedZoneData = [
        [126.9526906288968, 30.255963776795895],
        [128.125765427054, 30.255963776795895],
        [128.125765427054, 29.508900176056386],
        [126.9526906288968, 29.508900176056386]
    ]

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

    function drawAllFishZoneAreaData(transPointData,source) {
        let areaArray = []
        areaArray.push(transPointData)
        var areaFeature = new Feature(
            new Polygon(areaArray)
        )
        var colorZone;
        
        switch (source) {
            case alarmZoneSource:
                colorZone = "#f00"
                break;
            case relaxShipZoneSource:
                colorZone = "#00f"
                break;
            case breedZoneSource:
                colorZone = "#0f0"
                break;
            case fishingZoneSource:
                colorZone = "#0ef"
                break;
            default:
                colorZone = "#fff"
                break
        }
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
        source.addFeature(areaFeature)
    }

    var _alarmZoneProtectionData = tranPoint(alarmZoneProtectionData)
    var _relaxShipZoneData = tranPoint(relaxShipZoneData)
    var _breedZoneData = tranPoint(breedZoneData)
    var _fishingZoneData = tranPoint(fishingZoneData)

    drawAllFishZoneAreaData(_alarmZoneProtectionData, alarmZoneSource)
    drawAllFishZoneAreaData(_relaxShipZoneData, relaxShipZoneSource)
    drawAllFishZoneAreaData(_breedZoneData, breedZoneSource)
    drawAllFishZoneAreaData(_fishingZoneData, fishingZoneSource)


    var alarmZoneProtectionLayer = new VectorLayer({
        source: alarmZoneSource,
        visible:false
    })
    var relaxShipZoneLayer = new VectorLayer({
        source: relaxShipZoneSource,
        visible:false
    })
    var breedZoneLayer = new VectorLayer({
        source: breedZoneSource,
        visible:false
    })
    var fishingZoneLayer = new VectorLayer({
        source: fishingZoneSource,
        visible:false
    })
    console.log(flag.relaxZone)
    console.log(flag.breedZone)
    console.log(flag.alarmZone)
    console.log(flag.fishingZone)
    if (flag.relaxZone == true){
        alarmZoneProtectionLayer.setVisible(true)
    }else{
        alarmZoneProtectionLayer.setVisible(false)
    }
 
    map.addLayer(alarmZoneProtectionLayer)
    map.addLayer(relaxShipZoneLayer)
    map.addLayer(breedZoneLayer)
    map.addLayer(fishingZoneLayer)
    console.log(map)
    
  

  
  
}   
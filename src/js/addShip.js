import VectorLayer from 'ol/layer/Vector'
import {Vector} from 'ol/source';
import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import {fromLonLat,transform} from 'ol/proj'
import Overlay from 'ol/Overlay'
import {toStringHDMS} from 'ol/coordinate'

export default function addShip(map){

    const PI = 3.1415926
    var shipLayer = new VectorLayer({
        source: new Vector()
    })

    var shipX = [124.17324417000022,124.96216725000018,126.22452203618612,126.96099372772944,127.5648312701592,128.14936958986868,128.9943457747954]
    var shipY = [30.418853116611288,31.402412023816353,31.882182328586026,31.89606535438317,31.89606535438317,31.89606535438317,31.89606535438317]
    var shipRotation = (PI/2)

    var styleNormal = new Style({
        image: new Icon({
           src:'../../static/images/ship/ship_normal.png',
           rotation:shipRotation,
        })
    })
    var styleAlarm = new Style({
        image: new Icon({
           src:'../../static/images/ship/ship_alarm.png',
           rotation: shipRotation,
           color:"#f00"

        })
    })


    function ship(shipId){
        if (i != 0){
            var feature = shipLayer.getSource().getFeatureById(shipId)      
            shipLayer.getSource().removeFeature(feature)
        }
        var shipFeature= new Feature({
			geometry: new Point(fromLonLat([shipX[i%7],shipY[i%7]]))
        })
        // shipFeature.setProperties(shipInfo)  
        shipFeature.setId(shipId)    
        if((i%7) == 3 || (i%7) == 4){
            shipFeature.setStyle(styleAlarm);
        }else{
            if((i%7) == 0){
                styleNormal.getImage().setRotation((30*PI/180))
            }else if((i%7) == 1){
                styleNormal.getImage().setRotation((60*PI/180))
            }else{
                styleNormal.getImage().setRotation((90*PI/180))
            }
            shipFeature.setStyle(styleNormal);
        }
        shipLayer.getSource().addFeature(shipFeature)
    }

    var i = 0
    var startInterval = setInterval(() => {
        map.removeLayer(shipLayer)
        ship(1)
        i++
        map.addLayer(shipLayer)
    },2000)
    var temp = []
    temp.push(startInterval)
    temp.push(shipLayer)
    return temp
}
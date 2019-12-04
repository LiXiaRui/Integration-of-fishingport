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

    var shipLayer = new VectorLayer({
        source: new Vector()
    })

    var shipX = [124.55532704987269,125.96099372772944,126.96099372772944,127.5648312701592,128.14936958986868,128.9943457747954]
    var shipY = [31.89606535438317]

    var styleNormal = new Style({
        image: new Icon({
           src:'../../static/images/ship/ship_normal.png',
        })
    })
    var styleAlarm = new Style({
        image: new Icon({
           src:'../../static/images/ship/ship_normal.png',
           rotation: (3.14/4)
        })
    })


    function ship(shipId){
        if (i != 0){
            var feature = shipLayer.getSource().getFeatureById(shipId)      
            shipLayer.getSource().removeFeature(feature)
        }
        var shipFeature= new Feature({
			geometry: new Point(fromLonLat([shipX[(i)%6],shipY[0]]))
        })
        // shipFeature.setProperties(shipInfo)  
        shipFeature.setId(shipId)    
		shipFeature.setStyle(styleNormal);
        shipLayer.getSource().addFeature(shipFeature)
    }

    var i = 0
    setInterval(() => {
        map.removeLayer(shipLayer)
        ship(1)
        i++
        map.addLayer(shipLayer)
    },1000)

}
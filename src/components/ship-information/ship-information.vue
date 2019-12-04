<template>
  <div>
    <div id="allmap" ref="allmap"></div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import "ol/ol.css"
import { Map, View } from "ol";
import Tile from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import { transform } from "ol/proj";
import { toLonLat } from "ol/proj";
import addAlarmZone from "../../js/addAlarmZone";
import addShip from "../../js/addShip";

export default {
  name: "HelloWorld",
  data() {
    return {
      map: null
    };
  },
  methods: {
    drawMap() {
      this.map = new Map({
        target: "allmap",
        layers: [
          new Tile({
            source: new XYZ({
              crossOrigin: "anonymous",
              url:
                "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
            })
          }),
          new Tile({
            source: new XYZ({
              crossOrigin: "anonymous",
              url:
                "http://www.google.cn/maps/vt?lyrs=h@189&gl=cn&x={x}&y={y}&z={z}"
            })
          })
        ],
        view: new View({
          // projection: "EPSG:4326",
          center: transform([117, 30], "EPSG:4326", "EPSG:3857"),
          zoom: 5,
          maxZoom: 19,
          minZoom: 0
        })
      });
    },
    //鼠标经纬度
    mouseSite() {
      var _this = this;
      _this.map.on("click", function() {
        console.log(
          transform(_this.map.getEventCoordinate(event),"EPSG:3857","EPSG:4326")
        );
      });
    }
  },

  mounted() {
    this.drawMap();
    this.mouseSite();
   addAlarmZone(this.map);
   addShip(this.map);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
*{
  margin: 0;
  padding: 0;
}
/*设置地图的宽高*/
#allmap{
 margin:0px; 
 height: 800px;
 width:100%; 
 overflow: hidden;
 padding: 0px; 
} 
</style>

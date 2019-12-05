<template>
  <div>
    <div id="allmap" ref="allmap"></div>
    <!-- 船信息显示 start-->
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
    <!-- 船信息显示 end-->
    <div class="detailMenu">
      <div class="search">
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入船厂姓名" v-model="input3" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="远洋船" value="1"></el-option>
              <el-option label="国内船" value="2"></el-option>
              <el-option label="休闲船" value="3"></el-option>
            </el-select>
            <el-button slot="append" @click="showShipInMapCenter()" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
      <div class="shipType">
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;font-size:14px;Opacity:0.8;"
          row-key="id"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="type" label="渔船信息" width="143">
            <template slot-scope="scope">
              <el-button
                :disabled="scope.row.type != '船类型1'"
                @click=" show==false? (show=true):(show=false)"
                type="text"
                size="small"
              >{{scope.row.type}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="shipDetail">
      <el-table
        :data="shipData"
        v-if="show"
        style="width: 100%;margin-bottom: 20px;font-size:14px;Opacity:0.7;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column label="船东" width="130">
          <template slot-scope="scope">
            <el-button
              @click="shipershow==false? (shipershow=true):(shipershow=false);showShipInMapCenter(scope.row.shiplord)"
              type="text"
              size="small"
            >{{scope.row.shiplord}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="shipstuff" label="船员" width="130"></el-table-column>
        <el-table-column prop="shipstatus" label="渔船状态" width="135"></el-table-column>
      </el-table>
      <div class="shiplord">
        <el-table
          :data="shiperData"
          v-if="shipershow"
          style="width: 100%;margin-bottom: 20px;font-size:14px;Opacity:0.7;"
          row-key="id"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="shiplord" label="船东" width="130"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="130"></el-table-column>
          <el-table-column prop="shipnum" label="渔船数量" width="135"></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import Tile from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import { transform } from "ol/proj";
import { toLonLat } from "ol/proj";
import {Circle, Point }from 'ol/geom'
import Icon from "ol/style/Icon";
import Feature from "ol/Feature";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import addShipCluster from "../../js/addShipCluster";
import addCircle from "../../js/addCircle";

export default {
  name: "HelloWorld",
  data() {
    return {
      map: null,
      shipLayer: null,
      input1: "",
      input2: "",
      input3: "",
      select: "",
      tableData: [
        {
          id: 1,
          type: "远洋渔船"
        },
        {
          id: 2,
          type: "休闲渔船"
        },
        {
          id: 3,
          type: "国内渔船",
          children: [
            {
              id: 31,
              type: "船类型1"
            },
            {
              id: 32,
              type: "船类型2"
            },
            {
              id: 33,
              type: "船类型3"
            }
          ]
        },
        {
          id: 4,
          type: "海钓渔船"
        },
        {
          id: 5,
          type: "执法船展示"
        }
      ],
      shipData: [
        {
          id: 1001,
          shiplord: "王一",
          shipstuff: "李小猫",
          shipstatus: "在线",
          direction: 30,
          longitude: 123.15728169927465,
          latitude: 29.444038519850935
        },
        {
          id: 1002,
          shiplord: "王二",
          shipstuff: "李二猫",
          shipstatus: "在线",
          direction: 30,
          longitude: 122.75245393694426,
          latitude: 29.504697293083254
        },
        {
          id: 1003,
          shiplord: "王三",
          shipstuff: "李三猫",
          shipstatus: "离线",
          direction: 170,
          longitude: 122.17885202301647,
          latitude: 29.959894387179517
        },
        {
          id: 1004,
          shiplord: "李一",
          shipstuff: "王小虎",
          shipstatus: "在线",
          direction: 70,
          longitude: 123.37207031250001,
          latitude: 29.847652331980242
        },
        {
          id: 1005,
          shiplord: "李二",
          shipstuff: "王小狮",
          shipstatus: "在线",
          direction: 130,
          longitude: 123.06445312499999,
          latitude: 28.890234252473846
        },
        {
          id: 1006,
          shiplord: "李三",
          shipstuff: "王小龙",
          shipstatus: "在线",
          direction: 330,
          longitude: 122.85287402203133,
          latitude: 29.55510273158771
        },
        {
          id: 1007,
          shiplord: "李四",
          shipstuff: "王小豹",
          shipstatus: "在线",
          direction: 90,
          longitude: 122.65475178914228,
          latitude: 29.917878299377392
        }
      ],
      shiperData: [
        {
          shiplord: "王一",
          phone: "16688556688",
          shipnum: "1"
        }
      ],
      show: false,
      shipershow: false,
      circleLayer: null
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
          transform(
            _this.map.getEventCoordinate(event),
            "EPSG:3857",
            "EPSG:4326"
          )
        );
      });
    },
    //
    handleClick(row) {
      console.log(row);
      this.$notify({
        title: "提示",
        message: "这是一条不会自动关闭的消息",
        duration: 0
      });
    },
    showShipInMapCenter(val) {
      var name
      if(val != null){
        name = val  
      }else{
        name = this.input3
      }
      var len = this.shipData.length;
      var longitude;
      var latitude;
      var id;
      for (var i = 0; i < len; i++) {
        if (this.shipData[i].shiplord == name) {
          longitude = this.shipData[i].longitude;
          latitude = this.shipData[i].latitude;
          id = this.shipData[i].id;
        }
      }
      var center = transform([longitude, latitude], "EPSG:4326", "EPSG:3857");
      if(this.circleLayer != null){
        this.map.removeLayer(this.circleLayer)
      }
      this.circleLayer = addCircle(this.map,center)
      this.map.getView().setCenter(center);
      this.map.getView().setZoom(10);
    }
  },

  mounted() {
    this.drawMap();
    this.mouseSite();
    this.$emit("getMap", this.map);
    this.shipLayer = addShipCluster(this.map, this.shipData);
    addCircle(this.map);

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/*设置地图的宽高*/
#allmap {
  margin: 0px;
  height: 1000px;
  width: 100%;
  overflow: hidden;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.search {
  position: relative;
  width: 500px;
  height: 20px;
  // background-color: aqua;
  float: left;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.shipType {
  height: 600px;
  width: 200px;
  position: relative;
  margin-top: 200px;
  float: left;
  
}

.detailMenu {
  position: absolute;
  top: 100px;
  left: 50px;
  width: 500px;
  height: 600px;
  font-size: 16px;
  //  background-color: #99a9bf;
}

.shipDetail {
  position: absolute;
  width: 550px;
  height: 700px;
  top: 400px;
  left: 70%;
  // background-color:#99a9bf;
}
.shipInfor {
  position: relative;
  width: 550px;
  height: 300px;
  // background-color:aqua;
}
.shiplord {
  position: relative;
  width: 550px;
  height: 300px;
}
</style>
<style scope>
.el-table__header tr,
.el-table__header th {
  /* background-color: rgb(216, 231, 231); */
  font-weight: 800;
  color: black;
  text-align: center;
}
.el-table th,
.el-table tr {
  background-color: transparent;
}
.el-button--text{
  font-size: 20px;
}
/**船信息图框样式 start*/
.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 250px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}
#popup-content {
  line-height: 1px;
  font-size: 14px;
}
/**船信息图框样式 end*/
</style>

<template>
  <div class="hello">
    <el-container>
      <el-header>
        <el-menu
          router
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <el-submenu index="shipInformation" @click.native="goTo('/shipInformation')">
            <template slot="title">渔船基本信息</template>
            <el-submenu index="2-1">
              <template slot="title">远洋渔船</template>
            </el-submenu>
            <el-submenu index="2-2">
              <template slot="title">休闲渔船</template>
            </el-submenu>
            <el-submenu index="2-3">
              <template slot="title">国内渔船</template>
              <el-menu-item @click="showShipMess()">船类型1</el-menu-item>
              <el-menu-item index="2-1-3">船类型2</el-menu-item>
              <el-menu-item index="2-1-3">船类型3</el-menu-item>
            </el-submenu>
            <el-submenu index="2-4">
              <template slot="title">海钓渔船</template>
            </el-submenu>
            <el-submenu index="2-5">
              <template slot="title">执法船展示</template>
            </el-submenu>
            <el-submenu index="2-6">
              <template slot="title">统计分析</template>
              <el-menu-item index="shipInformation" @click.native="goTo('/shipInformation')">渔船类型统计</el-menu-item>
              <el-menu-item index="2-1-2">渔船归属统计</el-menu-item>
              <el-menu-item index="2-1-3">在港离港统计</el-menu-item>
            </el-submenu>
            <el-submenu index="2-7">
              <template slot="title">统计分析</template>
              <el-menu-item index="2-2-1">渔船信息检索</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">渔船船员信息</template>
            <el-menu-item @click="showShipStuff()">船员信息</el-menu-item>
            <el-submenu index="3-2">
              <template slot="title">统计分析</template>
              <el-menu-item index="3-1-1">年龄统计</el-menu-item>
              <el-menu-item index="3-1-2">性别统计</el-menu-item>
              <el-menu-item index="3-1-3">健康统计</el-menu-item>
            </el-submenu>
            <el-submenu index="3-3">
              <template slot="title">基本查询</template>
              <el-menu-item index="3-2-1">等级状态查询</el-menu-item>
              <el-menu-item index="3-2-1">持证状态查询</el-menu-item>
              <el-menu-item index="3-2-1">人员信息检索</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">应急指挥与安全救助</template>
            <el-menu-item index="4-1-1">海上应急救援</el-menu-item>
            <el-menu-item index="4-1-2">海上联络通讯</el-menu-item>
            <el-menu-item index="4-1-3">防台防汛指挥</el-menu-item>
            <el-menu-item index="4-1-4">渔业事故复现</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">渔业资源管理</template>
            <el-submenu index="5-1">
              <template slot="title">区域划分管理</template>
              <el-checkbox-group
                v-model="checkList"
                size="medium"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox label="休闲渔船作业区" border></el-checkbox>
                <el-checkbox label="资源保护区" border></el-checkbox>
                <el-checkbox label="养殖区" border></el-checkbox>
                <el-checkbox label="海钓区" border></el-checkbox>
              </el-checkbox-group>
            </el-submenu>
            <el-menu-item index="3-2-1">区域监控管理</el-menu-item>
            <el-submenu index="5-3">
              <template slot="title">渔业捕捞日志管理及统计</template>
              <el-menu-item index="5-3-1">养殖区统计</el-menu-item>
              <el-menu-item index="5-3-2">捕捞统计</el-menu-item>
              <el-menu-item index="5-3-3">其他</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">渔业和海监执法管理</template>
            <el-menu-item index="6-1">渔港码头检查处置</el-menu-item>
            <el-menu-item index="6-2">用海检查处置</el-menu-item>
            <el-menu-item index="6-3">海上执法处置</el-menu-item>
            <el-submenu index="6-4">
              <template slot="title">执法监管成果展示</template>
              <el-menu-item index="6-4-1">保护区</el-menu-item>
              <el-menu-item index="6-4-2">禁渔区</el-menu-item>
              <el-menu-item index="6-4-3">其他等</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">养殖与水产品质量监管</template>
            <el-menu-item index="7-1">养殖场管理</el-menu-item>
            <el-menu-item index="7-2">水产坪质量检查</el-menu-item>
            <el-menu-item index="7-3">用药管理</el-menu-item>
            <el-submenu index="7-4">
              <template slot="title">信息统计</template>
              <el-menu-item index="7-4-1">产量统计</el-menu-item>
              <el-menu-item index="7-4-2">质量统计</el-menu-item>
              <el-menu-item index="7-4-3">其他</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">远洋渔业信息图</template>
            <el-menu-item index="8-1">资源分布展示</el-menu-item>
            <el-menu-item index="8-2">远洋渔船位置</el-menu-item>
            <el-menu-item index="8-3">数据交换管理</el-menu-item>
          </el-submenu>
          <el-submenu index="9">
            <template slot="title">渔港监管服务</template>
            <el-menu-item index="9-1">雷达管理</el-menu-item>
            <el-menu-item index="9-2">监控管理</el-menu-item>
            <el-menu-item index="9-3">人员管理</el-menu-item>
            <el-menu-item index="9-4">渔港设施管理</el-menu-item>
            <el-menu-item index="9-5">港区环境管理</el-menu-item>
            <el-menu-item index="9-6">渔港建设管理</el-menu-item>
            <el-menu-item index="9-7">信息统计</el-menu-item>
          </el-submenu>
          <el-submenu index="10">
            <template slot="title">渔业经济信息</template>
            <el-menu-item index="9-1">渔业数据统计及报送</el-menu-item>
            <el-menu-item index="9-2">渔业产业规划布局管理</el-menu-item>
            <el-menu-item index="9-3">渔港经济区建设与管理</el-menu-item>
            <el-menu-item index="9-4">渔业增效渔民增收统计</el-menu-item>
          </el-submenu>
          <el-submenu index="11">
            <template slot="title">对外公众服务</template>
            <el-menu-item index="11-1">渔船动态展示</el-menu-item>
            <el-menu-item index="11-2">气象信息展示</el-menu-item>
            <el-menu-item index="11-3">休闲作业区域展示</el-menu-item>
            <el-menu-item index="11-4">海钓场展示</el-menu-item>
            <el-menu-item index="11-5">海洋水文展示</el-menu-item>
            <el-submenu index="11-4">
              <template slot="title">监管举报</template>
              <el-menu-item index="11-4-1">伏休期举报</el-menu-item>
              <el-menu-item index="11-4-2">非法捕捞举报</el-menu-item>
              <el-menu-item index="11-4-3">涉渔三无船只举报</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
        <div class="line"></div>
      </el-header>
      <el-main>
        <router-view
          :shipdiv="shipdiv"
          :stuffdiv="stuffdiv"
          :relaxZone="relaxZone"
          :alarmZone="alarmZone"
          :breedZone="breedZone"
          :fishingZone="fishingZone"
          v-on:getMap="getMapObject"
        ></router-view>
      </el-main>
    </el-container>
  </div>
</template>



<script>
import containZone from "../../js/utils/containZone";
import addProtectionZone from "../../js/addProtectionZone";
import addBreedZone from "../../js/addBreedZone";
import addFishingZone from "../../js/addFishingZone";
import addRelaxZone from "../../js/addRelaxZone";
import addShipOfAlarm from "../../js/addShip";
import VectorLayer from "ol/layer/Vector";
export default {
  name: "HelloWorld",
  data() {
    return {
      map: null,
      activeIndex: "1",
      activeIndex2: "1",
      relaxZone: false,
      alarmZone: false,
      breedZone: false,
      fishingZone: false,
      checkList: [],
      returnRelaxZoneLayer: null,
      returnBreedZoneLayer: null,
      returnFishingZoneLayer: null,
      returnaLarmZoneLayer: null,
      returnIntervalAndShipLayer: null,
      returnProtection: null,
      shipdiv: false,
      stuffdiv: false,

    };
  },
  watch: {
    relaxZone: function(newVal, oldVal) {
      if (newVal) {
        this.returnLreturnRelaxZoneLayerayer = addRelaxZone(this.map);
      } else {
        this.map.removeLayer(this.returnLreturnRelaxZoneLayerayer[0]);
        this.map.removeLayer(this.returnLreturnRelaxZoneLayerayer[1]);
      }
    },
    alarmZone: function(newVal, oldVal) {
      if (newVal) {
        this.returnProtection = addProtectionZone(this.map);
        this.returnIntervalAndShipLayer = addShipOfAlarm(this.map);
      } else {
        this.map.removeLayer(this.returnProtection[0]);
        this.map.removeLayer(this.returnProtection[1]);
        this.map.removeLayer(this.returnIntervalAndShipLayer[1]);
        clearInterval(this.returnIntervalAndShipLayer[0]);
      }
    },
    breedZone: function(newVal, oldVal) {
      if (newVal) {
        this.returnBreedZoneLayer = addBreedZone(this.map);
      } else {
        this.map.removeLayer(this.returnBreedZoneLayer[0]);
        this.map.removeLayer(this.returnBreedZoneLayer[1]);
      }
    },
    fishingZone: function(newVal, oldVal) {
      if (newVal) {
        this.returnFishingZoneLayer = addFishingZone(this.map);
      } else {
        this.map.removeLayer(this.returnFishingZoneLayer[0]);
        this.map.removeLayer(this.returnFishingZoneLayer[1]);
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      //this.goTo(key);
      // console.log(key, keyPath);
    },
    goTo(path) {
      console.log("success");
      this.$router.replace(path);
    },
    showShipMess(){
      this.stuffdiv = false;
      this.shipdiv = true;
      console.log("显示渔船信息,隐藏船员信息");
      console.log("stuff=="+this.stuffdiv);
      console.log("ship=="+this.shipdiv);
    },
    showShipStuff(){
      this.shipdiv = false;
      this.stuffdiv = true;
      console.log("显示船员信息，隐藏渔船信息");
      console.log("stuff=="+this.stuffdiv);
      console.log("ship=="+this.shipdiv);
    },


    handleCheckedCitiesChange() {
      this.relaxZone = containZone(
        this.checkList,
        this.relaxZone,
        "休闲渔船作业区"
      );
      this.alarmZone = containZone(
        this.checkList,
        this.alarmZone,
        "资源保护区"
      );
      this.breedZone = containZone(this.checkList, this.breedZone, "养殖区");
      this.fishingZone = containZone(
        this.checkList,
        this.fishingZone,
        "海钓区"
      );
    },
    getMapObject(val) {
      this.map = val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
  height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  // line-height: 160px;
  padding: 0;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu {
  width: 100%;
  height: 60px;
}
.el-menu[data-v-67f3a69c] {
  padding-top: 10px;

  height: 70px;
}
.el-checkbox {
  margin-left:10px;
  margin-top: 2px;
  width:180px;
}


</style>

<style>
.el-menu--horizontal > .el-submenu .el-submenu__title {
  padding: 0 12px;
  font-size: 22px;
  color: rgb(48, 49, 51);
}
.el-menu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu .el-submenu__title {
  font-size: 20px;
}


</style>
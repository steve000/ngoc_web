/**
* 省市区三级联动
* defaultItems:['省级code'，'市级code'，'区级code']，
* clearable：true or false,是否可以清楚选中
* disabled：true or false，是否禁止选择
* rangeItems： '省级code'、'市级code'、'区级code'，初始请求code
* propsDisabled：数据中禁止选择属性
* propsValue：数据中value
* propsLabel： 数据中label
* propsChildren： 数据中子集属性名
* level 可以筛选几级,1是省，2是市，3是县
**/
<template>
  <div class="region_select">
    <el-cascader size="small" :options="datas" placeholder="请选择区域" :change-on-select="true" v-model="checkedItems" style="width: 100%;" :props="{value: propsValue, label: propsLabel, children: propsChildren, disabled: propsDisabled}" :before-filter="changeRegion" :clearable="clearable" :disabled="disabled">
    </el-cascader>
  </div>
</template>

<script>
import api from "~/utils/api";
export default {
  name: "regionSelect",
  data() {
    return {
      datas: [],
      checkedItems: [],
      checkedItemsFull: [null, null, null],
      maxLevel: "",
      checkedItemsName: [null, null, null]
    };
  },
  props: {
    rangeItems: {
      type: String,
      default() {
        return "";
      }
    },
    clearable: {
      type: Boolean,
      default() {
        return false;
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    },
    propsDisabled: {
      type: String,
      default() {
        return "";
      }
    },
    propsValue: {
      type: String,
      default() {
        return "code";
      }
    },
    propsLabel: {
      type: String,
      default() {
        return "name";
      }
    },
    propsChildren: {
      type: String,
      default() {
        return "children";
      }
    },
    level: {
      type: Number,
      default() {
        return 1;
      }
    }
  },
  created() {
    this.maxLevel =
      {
        0: 4,
        1: 3,
        2: 2,
        3: 2
      }[this.level] || 4;
    this.getData();
  },
  watch: {
    checkedItems: {
      handler: function (val) {
        this.changeRegion(val);
      },
      deep: true
    }
  },
  methods: {
    // 保存数据
    saveData(result, datas) {
      if (result) {
        let _data = result || null;
        if (_data === null || !_data.length) {
          _data = result;
          this.checkedItems = [_data.code];
          console.log([_data.code]);
          this.checkedItemsFull = [null, null, _data.code];
          _data = [Object.assign({ level: this.maxLevel }, _data)];
          this.$emit("region", this.checkedItemsFull, this.checkedItemsName);
        }
        if (_data !== null || _data.length) {
          if (_data[0].level < this.maxLevel) {
            _data.forEach(x => {
              if (x.children === undefined) {
                x.children = [];
              }
            });
          }
          if (this.checkedItems.length && datas) {
            datas.children = _data;
          } else {
            this.datas = _data;
          }
        }
      }
    },
    // 请求数据
    async getData({
      params = { code: this.rangeItems, level: this.level },
      datas
    } = {}) {
      return api.queryProvinceCityArea(params).then(response => {
        if (response) {
          this.saveData(response, datas);
          return response;
        }
      });
    },
    // 选中后
    async changeRegion(val) {
      let datas = this.datas;
      this.checkedItemsFull = [null, null, null];
      for (let i = 0; i < val.length; i++) {
        if (val[i] == null || val[i] === "") {
          continue;
        }
        const itemIndex = datas.findIndex(data => {
          return Number(data.code) === Number(val[i]);
        });
        if (!datas[itemIndex]) {
          continue;
        }
        const pos = datas[itemIndex].level + 2 - this.maxLevel;
        this.$set(this.checkedItemsFull, pos, val[i]);
        this.$set(this.checkedItemsName, pos, datas[itemIndex].name);
        if (
          datas[itemIndex].level < this.maxLevel &&
          (datas[itemIndex].children === undefined ||
            (datas[itemIndex].children && !datas[itemIndex].children.length))
        ) {
          const result = await this.getData({
            params: { code: val[i], level: pos + 2 },
            datas: datas[itemIndex]
          });
          datas = result;
        } else {
          datas = datas[itemIndex].children;
        }
      }
      this.$emit("region", this.checkedItemsFull, this.checkedItemsName);
    }
  }
};
</script>

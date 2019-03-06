/** 
* 编辑备注
* importParams:{remarkDetail:编辑前备注详情,returnId:编辑类目id}
* exports:null
**/
<template>
    <!-- <div class="operate-div" title="编辑备注">
        <el-popover ref="popover" rel="popover" v-model="isShow" :placement="placement" effect="light" :visible-arrow="false" :popper-class='paddingClass' trigger="click">
            <div class="editRemarkWrap">
                <div class="title">编辑备注</div>
                <div style="position:relative;">
                    <el-input type="textarea" :rows="4" v-model="textareaRemark" resize="none" :maxlength="200"></el-input>
                    <div class="maxLengthRemark">{{maxRemarkLength}}字以内</div>
                </div>
                <div class="btnWrap">
                    <el-button type="primary" size="small" @click="editFunction">提交</el-button>
                    <el-button type="primary" plain size="small" @click="isShow=false;">取消</el-button>
                </div>
            </div>
        </el-popover>
        <div class="remarkShow" v-popover:popover>备注：
            <span :title="remarkDetail">{{remarkDetail?remarkDetail:'无'}}</span>
            <i class="iconfont1 icon-bianji other_hook"></i>
        </div>
    </div> -->
    <div class="operate-div model-container editRemark">
    <el-dialog title="修改备注" :visible.sync="dialogVisible" width="600px" :before-close="cancelFunction">
              <div class="editRemarkWrap">
                <div class="editRemarkTextarea">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入内容"  v-model="textareaRemark" resize="none" :maxlength="200"></el-input>
                    <div class="maxLengthRemark">{{maxRemarkLength}}字以内</div>
                </div>
                  <div class="btnWrap">
                    <el-button size="small" style="width:80px;font-size:14px;" type="primary" @click="editFunction">确认</el-button>
                    <!-- <el-button type="primary" plain size="small" @click="cancelFunction">取消</el-button> -->
                </div>
            </div>
</el-dialog>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      paddingClass: "padding-0",
      isShow: false,
      textareaRemark: "",
      maxRemarkLength: 200,
      alreadyRemarkLength: 0,
      allowEdit: true
    };
  },
  methods: {
    //提交编辑
    editFunction() {
      if (this.allowEdit) {
        this.$emit("onEdit", [this.textareaRemark, this.returnId]);
        this.cancelFunction();
        this.isShow = false;
      }
    },
    cancelFunction() {
      this.$emit("onCancel", false);
    }
  },
  props: {
    //编辑前
    remarkDetail: {
      default: ""
    },
    returnId: {
      default: null
    },
    placement: {
      default: "left-end"
    },
    dialogVisible: {
      default: null
    }
  },
  mounted() {
    this.textareaRemark = this.remarkDetail;
  },
  watch: {
    textareaRemark: {
      handler(nval, oval) {
        this.alreadyRemarkLength = oval.length;
        if (this.alreadyRemarkLength > this.maxRemarkLength) {
          this.allowEdit = false;
          this.$message.warning({
            message: "最多输入200个字!",
            showClose: true
          });
        } else {
          this.allowEdit = true;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.padding-0 {
  padding: 0;
}
.colorred {
  color: red;
}
.colorblack {
  color: black;
}
.el-tooltip__popper.is-light {
  border: none;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
}
.operating-button {
  width: 80px;
  height: 28px;
  color: #666666;
  font-size: 12px;
  padding: 0;
  line-height: 28px;
  &:hover {
    color: #333333;
    background-color: #f6fafe;
  }
}
.editRemarkWrap {
  padding: 0 10px 15px;
  .title {
    font-size: 13px;
    color: #333;
    line-height: 40px;
  }
}
.btnWrap {
  text-align: right;
  margin-top: 20px;
}

.maxLengthRemark {
  color: #666;
  text-align: right;
  font-size: 13px;
  height: 44px;
  line-height: 40px;
  padding: 0 15px;
}

.modal-container .btnWrap .el-button {
  width: 80px;
  padding: 8px 0px;
  font-size: 14px;
}
.editRemark{
  .el-textarea__inner{
    border: none;
  }
  .editRemarkTextarea{
    border: 1px solid #ddd;
  }
  .el-dialog__header{
  border-bottom:1px solid #f3f3f3;
}
.el-dialog__header{
  padding-bottom:20px;
  padding-left: 0;
  padding-right: 0;
  margin: 0 30px;
}
.el-dialog__body{
  padding-top: 20px;
  padding-bottom: 15px;
}
.el-dialog__close{
  font-size: 23px;
}
}
</style>

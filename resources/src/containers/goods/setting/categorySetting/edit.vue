<!-- 品类新增 -->
<template>
    <div class="categoryBox">
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-width="140px" :model="categoryData" ref="categoryData">
                    <div class="displayStyle">
                        <el-form-item label="上级品类编码：">
                            <el-input v-model="categoryData.parentCateId" placeholder="" disabled class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="上级品类名称：">
                            <el-input v-model="categoryData.parentCateName" placeholder="" disabled class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="品类编码：">
                            <el-input v-model="categoryData.cateId" placeholder="" disabled class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="品类名称：" :rules="{ required: true, message: '品类名称不能为空'}">
                            <el-input v-model="categoryData.cateName" placeholder="请输入品类名称" :maxlength="20" clearable class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="品类层级：" :rules="{ required: true, message: '品类层级不能为空'}">
                            <el-input v-model="categoryData.level" placeholder="" disabled class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content" style="text-align: center;padding-top:20px;">
            <div class="pl20 pb20">
                <el-button type="primary" style="width:90px;" @click="submitCreateOrder()">提交</el-button>
                <el-button plain style="width:90px;margin-left:40px;" @click="quit(routesMapping.category, true)">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import PlatformMixins from '~/mixins/platform';
import QuitMixins from '~/mixins/quit';
import { routesMapping } from '~/router';
export default {
    name: 'categoryEdit',
    mixins: [PlatformMixins, QuitMixins],
    data() {
        return {
            // 商品名称loading
            queryGoodsNameLoading: false,
            // 编辑品类参数对象
            categoryData: this.$route.params.data,
            // 模糊查询商品名称
            searchKey: '',
        }
    },
    mounted() {
        console.log(this.$route.params);
        // this.categoryData = this.$route.params;
    },
    methods: {
        ...mapActions([
            "manageCategoryEdit",
            "manageCategoryAll"
        ]),
        // 提交编辑商品属性
        submitCreateOrder() {
            if (this.categoryData.cateName == "") {
                this.$message({
                    type: 'warning',
                    message: `品类名称不能为空`
                })
            } else {
                const postObj = {
                    parentCateId: this.categoryData.parentCateId,
                    cateId: this.categoryData.cateId,
                    cateName: this.categoryData.cateName,
                    level: this.categoryData.level
                };
                this.manageCategoryEdit(postObj).then((res) => {
                    console.log(res)
                    if (res) {
                        this.$message({
                            type: 'success',
                            message: `编辑品类成功`
                        })
                        this.quit(this.routesMapping.category, true);
                    } else {
                        this.$message({
                            type: 'warning',
                            message: `编辑品类失败`
                        })
                    }
                })
                .catch(err=>{
                    this.$message({
                            type: 'warning',
                            message: `编辑品类失败`
                        })
                })
            }
        },
    }

}
</script>

<style lang="scss" scoped>
.categoryBox {
    height: 100%;
    padding: 20px;
    .content {
        background-color: #fff;
        .title {
            font-size: 14px;
            color: #333333;
            line-height: 44px;
            height: 44px;
            background-color: #fff;
            border-bottom: 1px solid #E5E5E5;
        }
        .content-wrapper {
            padding: 20px 20px 1px 20px;
            .displayStyle {
                display: inline-block;
                width: 90%;
                padding-left: 25px;
                .row_width {
                    width: 300px;
                    height: 36px;
                }
            }
        }
        .addProduct {
            margin-bottom: 20px;
        }
        table thead th {
            background: #F6F7FB;
            width: 100px;
            height: 44px;
        }
        table {
            border: 1px solid #eee;
            border-collapse: collapse;
            margin: 0 auto;
            text-align: left;
            font-size: 12px;
            tr {
                border-bottom: 1px solid #eee;
                background: #FFFFFF;
                height: 44px;
                overflow: hidden;
                box-shadow: 0 1px 0 0 #F2F6FD;
                border: 1px solid #f0f3fa;
                transition: 1s;
                .iconfont1 {
                    width: 16px;
                    height: 16px;
                    top: -6px;
                    right: -1px;
                    position: absolute;
                    display: none;
                    background-color: white;
                    color: red;
                    transition: 1s;
                }
                &:hover {
                    //    border: 1px dashed #539EFF;
                    outline: 1px dashed #539eff;
                    outline-offset: 0px;
                    transition: 1s;
                    .iconfont1 {
                        display: block;
                        cursor: pointer;
                        transition: 1s;
                    }
                }
                td {
                    padding-left: 5px;
                    .table-input {
                        width: 120px;
                    }
                }
            }
        }
    }
    .orderContainer {
        margin: 20px;
        background-color: #fbfbfb;
        border: 1px solid #f1f1f1;
        text-align: right;
        font-size: 14px;
        color: #333333;
        .orderCount {
            height: 50px;
            line-height: 50px;
            margin-right: 15px;
            span {
                color: red;
                font-size: 18px;
            }
        }
    }
    .submitBtn {
        clear: both;
        padding: 20px;
        background-color: white;
    }
    .el-table__body-wrapper {
        overflow: inherit;
    }
    .createAddress_func {
        margin: 0 10px;
        padding: 3px;
        width: 58px;
        height: 20px;
        cursor: pointer;
        &.defalut_address {
            background-color: #FFEDDD;
            color: #FF9624;
            border: 1px solid #FF9624;
        }
        &.set_defalutAddress {
            display: none;
            background-color: #FF9624;
            color: #fff;
            border: 1px solid #FF9624;
        }
    }
    .el-table__row:hover {
        .createAddress_func {
            &.set_defalutAddress {
                display: inline;
            }
        }
    }
    .inventory {
        background-color: #FA5555;
        color: #fff;
        font-size: 12px;
        width: 58px;
        height: 20px;
        line-height: 20px;
        text-align: center;
    }
}
</style>

import * as C from "../../constants/api";
import utils from '../../utils/misc'

const state = {
    queryGoodsInfoModify: {
       brandCnName:"",
       brandId: "",
       firtCateId: "",
       secondCateId: "",
       thirdCateId: "",
       productId: "",
       productName:"",
       productInfo:"",
       productDetails:""
    },
    allBrandsList: {
      pageNo:1,
      pageSize: 10,
      total: 0,
      list: []
    },
    cateList:{
      pageNo:1,
      pageSize: 10,
      total: 0,
      result: []
    }
};

const mutations = {
    [C.QUERY_GOODS_INFO_MODIFY](state, { payload }) {
        const {brandCnName, brandId, firtCateId, secondCateId, thirdCateId, productId, productName, productInfo, productDetails} = payload
       state.queryGoodsInfoModify.brandCnName = brandCnName
       state.queryGoodsInfoModify.brandId = brandId
       state.queryGoodsInfoModify.firtCateId = firtCateId
       state.queryGoodsInfoModify.secondCateId = secondCateId
       state.queryGoodsInfoModify.thirdCateId = thirdCateId
       state.queryGoodsInfoModify.productId = productId
       state.queryGoodsInfoModify.productName = productName
       state.queryGoodsInfoModify.productInfo = productInfo
       state.queryGoodsInfoModify.productDetails = productDetails
    },
    [C.QUERY_ALL_BRANDS](state, { payload }) {
        const {pageNo, total,pageSize, list} = payload
        state.allBrandsList.pageNo = pageNo
        state.allBrandsList.pageSize = pageSize
        state.allBrandsList.total = total
        state.allBrandsList.list = list
    },
    [C.QUERY_CATE](state, { payload }) {
        const {pageNo, total,pageSize, result} = payload
        state.cateList.pageNo = pageNo
        state.cateList.pageSize = pageSize
        state.cateList.total = total
        state.cateList.result = result
    }
};

export default {
    state,
    mutations
}

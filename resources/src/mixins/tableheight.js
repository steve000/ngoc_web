/*
    用于element-ui表格固定表头且表体按窗口高度出现滚动条与否
 */

 export default{
     data(){
         return{
             tableHeight: '300',
         }
     },
     methods: {
         setTableHeight(height){
             setTimeout(() => {
                 this.tableHeight = window.document.documentElement.offsetHeight - parseInt(height) + '';
                 let tmp = document.getElementsByClassName("el-table__body")[0];
                 let tableBodyHeight = 0;
                 if(tmp && tmp.offsetHeight){
                     tableBodyHeight = tmp.offsetHeight
                 }
             //    let tableBodyHeight = document.getElementsByClassName("el-table__body")[0].offsetHeight
                 if(tableBodyHeight && this.tableHeight > tableBodyHeight + 36){
                     this.tableHeight = tableBodyHeight + 40
                 }
             }, 80)

             let THIS = this;
             let res;
             window.addEventListener("resize", function () {
                 if(res){ clearTimeout(res)}
                 res = setTimeout(function(){
                     let curHeight = window.document.documentElement.offsetHeight;
                     let tmp = document.getElementsByClassName("el-table__body")[0];
                     let tableBodyHeight = 0;
                     if(tmp && tmp.offsetHeight){
                         tableBodyHeight = tmp.offsetHeight
                     }
                 //    let tableBodyHeight = document.getElementsByClassName("el-table__body")[0].offsetHeight
                     THIS.$nextTick(() => {
                         THIS.tableHeight = curHeight - parseInt(height) + '';
                         if(tableBodyHeight && THIS.tableHeight > tableBodyHeight + 36){
                             THIS.tableHeight = tableBodyHeight + 40
                         }
                     })
                 }, 80)
             })
         }
     }
 }

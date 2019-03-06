/**
 * Created by issuser on 2018/6/6.
 */
export default {
    methods:{
        getHide(index,id){
            let eleClassList = document.getElementById(id).getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].classList;
            eleClassList.remove('table-tr-bg-F6FAFE');
            let moreOperateClassList = document.getElementById(id).getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].getElementsByClassName('more-operating')[0].classList;
            moreOperateClassList.remove('display-block');
        },
        setTableTrBg(index,id){
            let ele =document.getElementById(id).getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row');
            for(let i=0;i<ele.length;i++){
                let moreOperate=  ele[i].getElementsByClassName('more-operating')[0];
                let moreOperateButtonList =ele[i].getElementsByClassName('button-list-container')[0];
                if(i!==index){
                    ele[i].classList.remove('table-tr-bg-F6FAFE');
                    moreOperate? moreOperate.classList.remove('display-block') :'';
                    moreOperateButtonList? moreOperateButtonList.style.display='none' :'';
                }else{
                    ele[i].classList.add('table-tr-bg-F6FAFE');
                    moreOperate? moreOperate.classList.add('display-block') :'';
                }
            }
        },
        removeClickEffect(id){
            let ele =document.getElementById(id).getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row');
            for(let i=0;i<ele.length;i++){
                let moreOperate=  ele[i].getElementsByClassName('more-operating')[0];
                let moreOperateButtonList =ele[i].getElementsByClassName('button-list-container')[0];
                ele[i].classList.remove('table-tr-bg-F6FAFE');
                moreOperate? moreOperate.classList.remove('display-block') :'';
                moreOperateButtonList? moreOperateButtonList.style.display='none' :'';
            }
        }
    }
}

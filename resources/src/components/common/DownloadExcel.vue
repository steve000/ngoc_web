<!---
    导出Excel组件
    传入参数：1.data：生成Excel的数组，必传
              2.label：生成Excel的表头的数组
              3.propsArray：label对应的props属性
              4.excelName：导出Excel的名称
              5.downloadText：下载按钮显示的文本
-->
<template>
    <div class="download-excel">
        <a id="downloadExcel"  @click="downloadExcel"><i class="iconfont1 icon-xiazai"></i>{{downloadText}}</a>
    </div>
</template>

<script>
    export default {
        name: 'DownloadExcel',
        data () {
            return {}
        },
        props: {
            data: {
                type: Array,
                default: function () {
                    return []
                },
            },
            label: {
                type: Array,
                default: function () {
                    return []
                },
            },
            propsArray: {
                type: Array,
                default: function () {
                    return []
                },
            },
            excelName: {
                type: String,
                default: ''
            },
            downloadText:{
                type: String,
                default: '下载'
            }
        },
        mounted(){

        },
        methods: {
            downloadExcel(){
                this.createTable(this.data, this.label, this.propsArray);
            },
            base64: function (s) {
                return window.btoa(unescape(encodeURIComponent(s)));
            },
            format: function (s, c) {
                return s.replace(/{(\w+)}/g, function (m, p) {
                    return c[p];
                })
            },
            createTable(data, label, propsArray){
                let table = document.createElement('table');
                let tbody = document.createElement('tbody');
                let th = '';
                //table表头
                for (let i in label) {
                    console.log(label[i]);
                    th = th + '<td>' + label[i] + '</td>';
                }
                tbody.insertRow(0);
                tbody.rows[0].innerHTML = th;
                for (let i = 0; i < data.length; i++) {
                    let tdCount = 0;
                    tbody.insertRow(i + 1);
                    if (propsArray.length > 0) {
                        for (let j = 0; j < propsArray.length; j++) {
                            tbody.rows[i + 1].insertCell(tdCount);
                            tbody.rows[i + 1].cells[tdCount].appendChild(document.createTextNode(' ' + data[i][propsArray[j]] + ' '));
                            //解决数字过长excel自动转换为科学计数
                            tbody.rows[i+1].cells[tdCount].setAttribute('style', 'vnd.ms-excel.numberformat:@;');
                            tdCount++;
                        }
                    } else {
                        tbody.rows[i + 1].insertCell(tdCount);
                        tbody.rows[i + 1].cells[tdCount].appendChild(document.createTextNode(' ' + data[i] + ' '));
                        //解决数字过长excel自动转换为科学计数
                        tbody.rows[i+1].cells[tdCount].setAttribute('style', 'vnd.ms-excel.numberformat:@;');
                    }
                }
                table.appendChild(tbody);
                let uri = 'data:application/vnd.ms-excel;base64,';
                let template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"' +
                    'xmlns="http://www.w3.org/TR/REC-html40"><head> <meta charset="utf-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
                    + '<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>'
                    + '</x:ExcelWorkbook></xml><![endif]-->' +
                    '</head><body ><table>{table}</table></body></html>';
                let sheetName = 'Worksheet';
                let ctx = {worksheet: sheetName || 'Worksheet', table:table.innerHTML };
                let bindNode = document.getElementById("downloadExcel");
                bindNode.href = uri + this.base64(this.format(template, ctx));
                bindNode.download = this.excelName;
            }
        }
    }
</script>

<style scoped="true" lang="scss">
    .download-excel{
        font-size: 13px;
        color: #3B8CFF;
        i{
            font-size: 14px;
        }
    }
</style>

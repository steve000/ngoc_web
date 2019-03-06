export default {
    data() {
        return {
            pageSizesList: [10, 20, 30, 40, 50, 100],
            pageSize: 10,
            pageNo: 1,
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val
            this.refreshPage(this.param)
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.refreshPage(this.param)
        },
    }
}
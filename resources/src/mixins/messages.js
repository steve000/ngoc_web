export default {

    methods: {
        showWarning(message) {
            this.$message.warning({
                message,
                showClose: true
            })
        },
        showError(message) {
            this.$message.error({
                message,
                showClose: true
            })
        },

        showSuccess(message = '操作成功'){
            this.$message.success({
                message,
                showClose: true
            })
        },
        showQuit(message = '已取消'){
            this.$message.info({
                message,
                showClose: true
            })
        }
    }
}

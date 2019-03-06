<template>
    <div class="log-wrapper">
        <p class="title">编辑前：</p>
        <div class="edit-before">{{logDetail.preContent?logDetail.preContent:'无'}}</div>
        <p class="title">编辑后：</p>
        <div class="edit-after">{{logDetail.afterContent?logDetail.afterContent:'无'}}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "remark-log",
    computed: {
        ...mapState({
            logDetail: ({ logRecord }) => logRecord.logDetail,
        }),
    },
}
</script>

<style scoped lang="scss">
@import "../../../layouts/css/themes/default.scss";
.log-wrapper {
  .title {
    color: $text-color;
    line-height: 44px;
  }
  .edit-before,
  .edit-after {
    color: $grey-color;
    line-height: 26px;
    padding: 13px 16px 17px;
    background: #f8f9fb;
    white-space: normal;
    word-break: break-all;
  }
}
</style>

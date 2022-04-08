<template>
  <!-- 门票的预定须知弹框内容 -->
  <div class="ticket-tips-box">
    <h3>预订须知</h3>
    <div>
      <h4>有效期</h4>
      <p>{{ ticketDetail.expire_date }} 日内有效</p>
    </div>
    <div>
      <h4>退改政策</h4>
      <p>{{ ticketDetail.return_policy }} 日内有效</p>
    </div>
    <div>
      <h4>发票</h4>
      <p v-if="ticketDetail.has_invoice">我司提供发票</p>
      <p v-else>不提供发票</p>
    </div>
    <div>
      <h4>预定须知</h4>
      <p v-html="ticketDetail.tips" v-if="ticketDetail.tips"></p>
      <p v-else>
        暂无
      </p>
    </div>
    <div>
      <h4>入园方式</h4>
      <p>{{ ticketDetail.entry_way }}</p>
    </div>
    <div v-if="ticketDetail.remark">
      <h4>备注信息</h4>
      <p>{{ ticketDetail.remark }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ticketDetail']
}
</script>

<style lang="less">
.ticket-tips-box {
  padding: 10px;
  h3, h4, p{
    text-align: left;
  }
  p {
    color: #666;
  }
}
</style>

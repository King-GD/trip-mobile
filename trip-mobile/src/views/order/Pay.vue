<template>
  <!-- 订单确认及支付 -->
  <div class="page-order-pay">
    <!-- =顶部导航 -->
    <van-nav-bar
      title="订单支付"
      left-text="返回"
      right-text="取消订单"
      left-arrow
      @click-left="goBack"
      @click-right="onCancelOrder"
    />
    <!-- 订单号 -->
    <van-cell title="订单号" :value="sn" class="order-mum" />
    <!-- 描述信息 -->
    <div class="order-info" v-for="item in orderDetail.items"
    :key="item.pk">
      <div class="left">
        <h3>{{ item.flash_name }}</h3>
        <div><van-icon name="clock-o" /> {{ item.remark }}</div>
        <!-- <div class="tips">短信接收</div> -->
      </div>
      <div class="right">
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- //描述信息 -->
    <!-- 提交表单 -->
    <van-submit-bar :price="orderDetail.buy_amount * 100" button-text="立即支付" @submit="onSubmit" />
  </div>
</template>

<script>
import { OrderApis } from '@/utils/apis'
import { ajax } from '@/utils/ajax'
import * as constants from '@/utils/constants'
export default {
  data () {
    return {
      // 订单的流水号
      sn: '',
      // 订单的气息
      orderDetail: {}
    }
  },
  methods: {
    /**
     * 获取订单的详细信息
     */
    getOrderDetail () {
      const url = OrderApis.orderDetailUrl.replace('#{sn}', this.sn)
      ajax.get(url).then(({ data }) => {
        this.orderDetail = data
      })
    },
    /**
     * 确认支付
     */
    onSubmit () {
      this.$dialog.confirm({
        title: '温馨提示',
        message: `确认支付${this.orderDetail.buy_amount}吗？`
      }).then(() => {
        const url = OrderApis.orderDetailUrl.replace('#{sn}', this.sn)
        // 调用接口
        ajax.post(url).then(() => {
          // 提示用户
          this.$notify({
            type: 'success',
            message: '支付成功，已为您跳转到订单列表'
          })
          // 跳转到我的订单列表
          this.$router.replace({ name: 'OrderList', params: {status: constants.ORDER_STATUS_ALL }})
        })
      })
    },
    /**
     * 返回上一页
     */
    goBack () {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '您还没有支付，确认放弃支付吗？'
      }).then(() => {
        this.$router.go(-1)
      })
    },
    /**
     * 取消订单
     */
    onCancelOrder () {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '确认取消该订单？'
      }).then(() => {
        const url = OrderApis.orderDetailUrl.replace('#{sn}', this.sn)
        // put方式调用接口
        ajax.put(url).then(res => {
          console.log(res)
          // 给用户提示
          if (res.status === 201) {
            this.$notify({
              type: 'success',
              message: '订单已成功取消'
            })
          } else if (res.status === 200) {
            this.$notify({
              type: 'warning',
              message: '订单已被取消，请勿重复操作'
            })
          }
          this.$router.go(-1)
        })
      })
    }
  },
  created () {
    // 订单流水号
    this.sn = this.$route.params.sn
    // 获取订单信息
    this.getOrderDetail()
  }
}
</script>

<style lang="less">
.page-order-pay {
  .order-mum {
    .van-cell__title {
      text-align: left;
    }
    .van-cell__value {
    flex: 3;
    }
  }
  // 订单信息
  .order-info {
    display: flex;
    padding: 10px;
    background-color: #fff;
    margin-top: 10px;

    .left {
      flex: 1;
      text-align: left;
      h3 {
        padding: 5px 0;
        margin: 0;
      }
    }
    .right {
      width: 80px;
      text-align: right;
    }

  }
}

</style>

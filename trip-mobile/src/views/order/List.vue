<template>
  <!-- 我的订单列表页面 -->
  <div class="page-order-list">
    <!-- 顶部导航 -->
    <van-nav-bar title="我的订单"
      left-text="返回"
      left-arrow
      @click-left="goBack"/>
    <!-- 订单按状态切换 -->
    <van-tabs v-model="status" @click="tabChange">
      <van-tab
        v-for="(value, key, index) in constants.ORDER_STATUS"
        :title="value"
        :name="key"
        :key="index"></van-tab>
    </van-tabs>
    <!-- 订单记录 -->
    <div class="order-list">
      <div class="order-item" v-for="item in dataList" :key="item.sn"
       v-show="item.sn">
        <div class="order-head">
          <div class="order-num">订单号: {{ item.sn }}</div>
          <div class="order-status text-warning">{{ constants.ORDER_STATUS[item.status] }}</div>
        </div>
        <div class="order-body">
          <div class="left">
            <van-image
              width="100"
              height="100"
              :src="item.item_first.flash_img"
            />
          </div>
          <div class="right">
            <div class="title">{{ item.item_first.flash_name }}</div>
            <div class="remark">{{ item.item_first.remark }}</div>
          </div>
        </div>
        <div class="order-footer">
          <div>总共{{ item.buy_count }}件商品 合计 ￥{{ item.buy_amount }}</div>
          <van-button round size="small" type="warning" @click="goPay(item)"
            v-if="item.status == constants.ORDER_STATUS_PAY">去支付</van-button>
          <van-button round size="small" type="warning"
          v-if="item.status == constants.ORDER_STATUS_DONE || item.status == constants.ORDER_STATUS_CANCEL"
          @click="deleteOrder(item)">删除订单</van-button>
          <van-button round size="small" type="info">订单详情</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as constants from '@/utils/constants'
import { OrderApis } from '@/utils/apis'
import { ajax } from '@/utils/ajax'
export default {
  data () {
    return {
      status: 0,
      // 订单列表
      dataList: [],
      constants
    }
  },
  watch: {
    $route () {
      this.loadData()
    }
  },
  methods: {
    /**
     * 删除订单
     */
    deleteOrder (item) {
      // 弹框确认
      this.$dialog.alert({
        title: '温馨提示',
        message: '删除订单将无法恢复，确认删除订单？'
      }).then(() => {
        // 调用接口
        const url = OrderApis.orderDetailUrl.replace('#{sn}', item.sn)
        ajax.delete(url).then(res => {
          // 告诉用户已经删除成功了
          // 隐藏界面上的显示
          if (res.status === 201) {
            this.$notify({
              type: 'success',
              message: '删除成功'
            })
            item.sn = ''
          }
        })
      })
    },
    /**
     * 跳转到支付页面
     */
    goPay (item) {
      this.$router.push({ name: 'OrderPay', params: { sn: item.sn }})
    },
    /**
     * tab点击之后，重新去获取数据
     */
    tabChange (name, value) {
      this.$router.push({ name: 'OrderList', params: { status: name }})
    },
    /**
     * 加载页面的数据
     */
    loadData () {
      // 订单状态
      this.status = this.$route.params.status
      // 清空数据
      this.dataList = []
      // 加载数据列表
      this.getDataList()
    },
    /**
     * 加载订单列表
     */
    getDataList () {
      ajax.get(OrderApis.orderListtUrl, {
        params: {
          status: this.status
        }
      }).then(({ data }) => {
        this.dataList = data.objects
      })
    },
    goBack () {
      // this.$router.go(-1)
      this.$router.replace({ name: 'Mine'})
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style lang="less">
.page-order-list {
  .order-list {
    padding: 10px;
    .order-item {
      background-color: #fff;
      padding: 10px;
      border-radius: 10px;
      margin-bottom: 10px;

      .order-head {
        display: flex;
        justify-content: space-between;
        .order-num {
          font-size: 12px;
        }
        .order-status {
          font-size: 13px;
        }
      }
      .order-body {
        padding: 10px 0;
        display: flex;
        .left {
          width: 100px;
          height: 100px;
        }
        .right {
          flex: 1;
          text-align: left;
          padding-left: 10px;
          .title {
            font-size: 16px;
            padding: 5px 0;
          }
          .remark {
            font-size: 12px;
            color: #999;
          }
        }
      }
      .order-footer {
        text-align: right;
        font-size: 12px;
        .van-button {
          margin-right: 5px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>

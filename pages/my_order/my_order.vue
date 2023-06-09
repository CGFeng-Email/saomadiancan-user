<template>
	
	<scroll-view class="list" :scroll-y="true" :scroll-with-animation="true" :enable-back-to-top="true" :scroll-anchoring="true"
		@scrolltolower="scrollTolower">
		<view class="item" v-for="(item, index) in list" :key="index">
			<view class="head">
				<view class="name">
					{{index}}
				</view>
				<view class="status">
					{{item.order_status ? '已结账':'未结账'}}
				</view>
			</view>
			<view class="content">
				<view class="left">
					<view class="table_number">
						桌号名称：{{item.table_number}}
					</view>
					<view class="time">
						下单时间：{{item.order_time}}
					</view>
				</view>
				<view class="right">
					¥{{item.total_account}}
				</view>
			</view>
		</view>
	</scroll-view>
	
</template>

<script>
	const db = wx.cloud.database()
	const orderDataApi = db.collection('orderData')

	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getMyorder()
		},
		methods: {
			scrollTolower(event) {
				console.log(event);
			},
			async getMyorder() {
				// 指定返回结果中记录需返回的字段参数
				const res = await orderDataApi.field({
					table_number: true,
					order_time: true,
					total_account: true,
					order_status: true
				}).get();
				console.log(res);
				
				this.list = res.data
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100vh;
	}
	view {
		box-sizing: border-box;
	}
</style>
<style lang="less" scoped>
	.list {
		height: 100%;
		padding: 20rpx;
		background: #f6f6f6;
		box-sizing: border-box;
	}
	.item {
		background: #fff;
		border-radius: 8rpx;
		margin-bottom: 20rpx;
		border-radius: 0 0 10rpx 10rpx rgba(0,0,0,.3);
		padding: 20rpx;
		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.name {
				font-size: 30rpx;
				font-weight: 500;
			}
			
			.status {
				font-size: 24rpx;
			}
		}
		
		.content {
			padding-top: 6rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				.table_number {
					font-size: 22rpx;
					line-height: 44rpx;
					color: #999;
				}
				.time {
					font-size: 22rpx;
					line-height: 44rpx;
					color: #999;
				}
			}
			
			.right {
				font-size: 24rpx;
				font-weight: 500;
			}
		}
	}
	
</style>
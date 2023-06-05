<!-- 订单详情 -->
<template>
	<view class="order_details">
		<view class="bg"></view>
		<view class="top_bg"></view>
		<view class="head">
			<view class="title">
				下单成功，坐等开吃
			</view>
			<view class="sub_title">
				菜品已在制作中
			</view>
		</view>
		<view class="order_list">
			<view class="order_content">
				<scroll-view class="order_list_content" :class="{order_list_up:orderMore}" :scroll-top="scrollTop" :scroll-with-animation="true" :enable-back-to-top="true" :scroll-anchoring="true">
					<view class="item" v-for="(item, index) in 3" :key="index">
						<view class="order_an_number">
							<view class="left">
								第{{index + 1}}次下单
							</view>
							<view class="right">
								下单成功，坐等开吃
							</view>
						</view>
						<view class="list">
							<view class="l_item" v-for="(item2, index2) in 3" :key="index2">
								<view class="cover">
									<image src="https://diancan-1317202885.cos.ap-guangzhou.myqcloud.com/diancan/img/%E5%8C%97%E4%BA%AC%E7%83%A4%E9%B8%AD.webp"></image>
								</view>
								<view class="content">
									<view class="c_top">
										<view class="name">
											营养快线
										</view>
										<view class="account">
											¥12
										</view>
									</view>
									<view class="shopping_number">
										3瓶
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="more">
					<text class="text">{{orderMore ? '收起菜单' : '展开全部'}}</text>
					<i :class="['iconfont', orderMore ? 'icon-xiangshang' : 'icon-xiala']"></i>
				</view>
				<view class="total_account">
					<text class="number">共 7 份</text>
					<text class="total_price">总计：¥100.00</text>
				</view>
			</view>
		</view>
		<view class="bottom_order">
			<view class="info">
				<view class="lis order_in">
					订单编号：3214567890087654367890
				</view>
				<view class="lis order_time">
					下单时间：2023-2-3 12:43:44
				</view>
				<view class="lis table_number">
					桌号名称：002
				</view>
			</view>
		</view>
		
		<div class="bottom_add_btn">
			<view class="add_order">
				加菜
			</view>
		</div>
	</view>
</template>

<script>
	// 云数据库 db
	const db = wx.cloud.database();
	// 订单 api
	const orderDataApi = db.collection('orderData');
	
	export default {
		data() {
			return {
				orderMore: false,
			}
		},
		mounted() {
			
		},
		onLoad(params) {
			console.log('params', params);
			this.getOrderData(params.table_number)
		},
		methods: {
			// 不能根据openid去获取订单 因为是提交生成的订单 直接跳转到该页面 无法携带id 可以携带桌号进行获取
			async getOrderData(table_number) {
				// 获取当前的订单
				const res = await orderDataApi.where({table_number: `${table_number}`, order_status: 'yes'}).get();
				console.log('res', res);
			}
		}
	}
</script>

<style lang="less" scoped>
	.order_details {
		padding-bottom: 130rpx;
		.bg {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background: #f5f5f5;
			z-index: -2;
		}
		.top_bg {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 280rpx;
			background: #fcd267;
			z-index: -1;
		}
		.head {
			padding: 40rpx 20rpx 20rpx 40rpx;
			.title {
				font-size: 38rpx;
				font-weight: bold;
			}
			.sub_title {
				font-size: 30rpx;
				margin-top: 20rpx;
			}
		}
		
		.order_list {
			padding: 20rpx;
			.order_content {
				background: #fff;
				border-radius: 10rpx;
				box-shadow: 0 0 14rpx 10rpx rgba(0,0,0,.1);
				.order_list_content {
					height: 520rpx;
					overflow-y: hidden;
					transition: all .4s ease;
				}
				.order_list_up {
					height: auto;
					overflow-y: auto;
				}
				.item {
					margin-bottom: 20rpx;
					.order_an_number {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 30rpx;
						color: #999;
						padding: 30rpx 20rpx;
						border-bottom: 1rpx solid #f5f5f5;
					}
					.list {
						padding: 30rpx 20rpx 10rpx;
						.l_item {
							margin-bottom: 20rpx;
							display: flex;
							height: 120rpx;
							.cover {
								width: 120rpx;
								height: 120rpx;
								border-radius: 20rpx;
								overflow: hidden;
								image {
									width: 100%;
									height: 100%;
									object-fit: cover;
								}
							}
							.content {
								height: 100%;
								flex: 1;
								padding-left: 20rpx;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								.c_top {
									display: flex;
									justify-content: space-between;
									.name {
										font-size: 30rpx;
										font-weight: bold;
									}
								}
								.shopping_number {
									font-size: 28rpx;
									color: #999;
								}
							}
						}
						
					}
				}
			}
			
			.more {
				text-align: center;
				font-size: 28rpx;
				color: #999;
				display: flex;
				justify-content: center;
				align-items: center;
				.text {
					padding: 40rpx 0;
				}
				.iconfont {
					padding-left: 4rpx;
				}
			}
			
			.total_account {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				padding: 30rpx 20rpx;
				font-size: 34rpx;
				.number {
					color: #999;
				}
				.total_price {
					padding-left: 20rpx;
				}
			}
		}
		
		.bottom_order {
			padding: 20rpx;
			.info {
				padding: 30rpx 20rpx;
				background: #fff;
				border-radius: 10rpx 10rpx 0 0;
			}
			.lis {
				font-size: 30rpx;
				color: #999;
				line-height: 34rpx;
				margin-bottom: 20rpx;
			}
			
		}
		
		.bottom_add_btn {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 120rpx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			background: #fff;
			padding: 0 30rpx;
			box-shadow: 0 -2rpx 3rpx 3rpx #f9f9f9;
			
			.add_order {
				width: 220rpx;
				height: 80rpx;
				background: #fcd267;
				text-align: center;
				line-height: 80rpx;
				font-size: 36rpx;
				border-radius: 46rpx;
			}
		}
	}
</style>
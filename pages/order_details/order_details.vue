<!-- 订单详情 -->
<template>
	<view class="order_details">
		<div class="container" v-if="!skeleton_loading">
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
					<view class="item" v-for="(item, index) in sliceList" :key="index">
						<view class="order_an_number">
							<view class="left">
								第{{sliceList.length - index}}次下单
							</view>
							<view class="right">
								下单成功，坐等开吃
							</view>
						</view>
						<view class="list">
							<view class="l_item" v-for="(item2, index2) in item.list" :key="index2">
								<div class="l_item_wrap">
									<view class="cover">
										<image :src="item2.image">
										</image>
									</view>
									<view class="content">
										<view class="c_top">
											<view class="name">
												{{item2.name}}
											</view>
											<view class="account">
												¥{{priceZero(Number(item2.price))}}
											</view>
										</view>
										<view class="shopping_number">
											{{item2.salesVolume}}{{item2.unit}}
										</view>
									</view>
								</div>
							</view>
						</view>

						<view class="more" v-if="item.max > 3" @click="itemMore(index)">
							<text class="text">展开全部</text>
							<i :class="['iconfont', orderMore ? 'icon-xiangshang' : 'icon-xiala']"></i>
						</view>
					</view>

					<view class="total_account">
						<text class="number">共 {{total_number}} 份</text>
						<text class="total_price">总计：¥{{priceZero(Number(order_data.total_account))}}</text>
					</view>
				</view>
			</view>
			<view class="bottom_order">
				<view class="info">
					<view class="lis order_in">
						订单编号：{{order_data.order_no}}
					</view>
					<view class="lis order_time">
						下单时间：{{order_data.order_time}}
					</view>
					<view class="lis table_number">
						桌号名称：{{order_data.table_number}}
					</view>
				</view>
			</view>
			<div class="bottom_add_btn">
				<view class="add_order" @click="addOrder">
					加菜
				</view>
			</div>
		</div>
		<!-- 骨架屏 -->
		<SKELETON v-if="skeleton_loading"></SKELETON>
	</view>
</template>

<script>
	// 云数据库 db
	const db = wx.cloud.database();
	// 订单 api
	const orderDataApi = db.collection('orderData');
	// 价格补0插件
	import priceZero from 'e-commerce_price';
	// 骨架屏
	import SKELETON from './components/skeleton.vue';

	export default {
		components: {
			SKELETON
		},
		data() {
			return {
				priceZero, // 初始化一下补0
				total_number: 0, // 总份数
				order_data: {}, // 订单数据
				sliceList: [], // 前三项
				totalList: [], // 总数据
				skeleton_loading: true, // 骨架屏加载
			}
		},
		onLoad(params) {
			this.getOrderData(params.table_number)
		},
		methods: {
			// 不能根据openid去获取订单 因为是提交生成的订单 直接跳转到该页面 无法携带id 可以携带桌号进行获取
			async getOrderData(table_number) {

				try {
					wx.showLoading({
						title: '加载中',
						mask: true
					})

					// 获取当前的订单
					const res = await orderDataApi.where({
						table_number: `${table_number}`,
						order_status: 'no'
					}).get();
					console.log('res', res);
					const data = res.data[0];

					// 总份数
					data.place_an_order.forEach(item => {
						return this.total_number += item.shopping_list.length
					})

					// 价格总计，订单编号，下单时间，桌号
					this.order_data = {
						order_no: data.order_no,
						order_time: data.order_time,
						total_account: data.total_account,
						table_number: data.table_number
					}
					// 前三项数组
					this.sliceList = data.place_an_order.map(item => {
						return {
							list: item.shopping_list.slice(0, 3),
							max: item.shopping_list.length
						}
					})
					// 总数据数组 准备好总数据 点击展开的时候 把对应的列表替换截取的列表
					this.totalList = data.place_an_order;
					wx.hideLoading();
					this.skeleton_loading = false;
				} catch (e) {
					wx.showToast({
						title: '加载出错',
						icon: 'error',
						mask: true
					})
				}
			},
			// 展开
			itemMore(index) {
				console.log(index);
				// 辅值
				this.$set(this.sliceList[index], 'list', this.totalList[index].shopping_list)
				// 判断是否展开
				this.$set(this.sliceList[index], 'max', 0)
			},
			// 加菜
			addOrder() {
				uni.redirectTo({
					url: '/pages/diancan/diancan'
				});
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
				box-shadow: 0 0 14rpx 10rpx rgba(0, 0, 0, .1);

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

							.l_item_wrap {
								display: flex;
								height: 120rpx;
							}

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
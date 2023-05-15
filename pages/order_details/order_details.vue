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
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		}
	}
</script>

<style lang="less" scoped>
	.order_details {
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
			padding: 30rpx 20rpx 0;
			.title {
				font-size: 38rpx;
				font-weight: bold;
			}
			.sub_title {
				font-size: 30rpx;
				margin-top: 10rpx;
			}
		}
		
		.order_list {
			padding: 20rpx;
			.order_content {
				background: #fff;
				border-radius: 20rpx;
				box-shadow: 0 0 14rpx 10rpx rgba(0,0,0,.1);
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
		}
	}
</style>
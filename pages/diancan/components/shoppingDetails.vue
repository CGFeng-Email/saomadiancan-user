<!-- 购物车商品详情 -->
<template>
	<view class="shopping_details">
		<view class="details cart_shoppinglist_anim">
			<image class="cover" :src="shoppingDetailsData.item2.image" mode="aspectFit"></image>
			<view class="content">
				<view class="close" @click="closeShoppingDetails">
					<i class="iconfont icon-guanbi2"></i>
				</view>
				
				<view class="title">
					{{shoppingDetailsData.item2.name}}
				</view>
				<view class="slod_out">
					已售: {{shoppingDetailsData.item2.sold_out}}
				</view>
				<view class="function_wrap">
					<view class="price_left">
						<text class="price">¥{{shoppingDetailsData.item2.price}}</text>
						<text class="num">/{{shoppingDetailsData.item2.unit}}</text>
					</view>
					<view class="right" :class="{right_zoor: shoppingDetailsData.item2.salesVolume <= 0}">
						<i v-if="shoppingDetailsData.item2.salesVolume > 0" class="raduce iconfont icon-jian" @click="reduce(shoppingDetailsData)"></i>
						<text class="text">{{shoppingDetailsData.item2.salesVolume}}</text>
						<i class="plus iconfont icon-zengjia" @click="plus(shoppingDetailsData)"></i>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {shoppingDetailsData: Object},
		data() {
			return {
				
			}
		},
		created() {
			console.log('shoppingDetailsData', this.shoppingDetailsData);
		},
		methods: {
			closeShoppingDetails() {
				this.$parent.openShoppingDetails(false)
			},
			reduce(shoppingDetailsData) {
				console.log(shoppingDetailsData);
				const {index, index2, item2, cid} = shoppingDetailsData;
				this.$parent.reduce(index, index2, item2, cid);
			},
			plus(shoppingDetailsData) {
				console.log(shoppingDetailsData);
				const {index, index2, item2, cid} = shoppingDetailsData;
				this.$parent.plus(index, index2, item2, cid);
			}
		}
	}
</script>

<style lang="less" scoped>
	.shopping_details {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,.6);
		.details {
			height: 850rpx;
			background: #fefefe;
			position: fixed;
			bottom: 120rpx;
			left: 0;
			right: 0;
			border-radius: 20rpx 20rpx 0 0;
			overflow: auto;
			.content {
				padding: 0 20rpx 20rpx;
				.close {
					position: absolute;
					top: 0;
					right: 0;
					width: 80rpx;
					height: 80rpx;
					text-align: center;
					line-height: 80rpx;
					.iconfont {
						font-size: 56rpx;
						color: #fff;
					}
				}
				.title {
					font-size: 36rpx;
					font-weight: bold;
				}
				.slod_out {
					font-size: 28rpx;
					color: #999;
					padding: 8rpx 0;
				}
				.function_wrap {
					display: flex;
					justify-content: space-between;
					align-items: baseline;
					.price_left {
						font-size: 28rpx;
						.price {
							color: #ed594e;
						}
						.num {
							color: #999;
						}
					}
					.right {
						width: 200rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 30rpx;
						.iconfont {
							font-size: 56rpx;
							color: #f7d562;
						}
						.text {
							padding: 0 20rpx;
						}
					}
					.right_zoor {
						justify-content: flex-end;
					}
				}
			}
		}
	}
</style>
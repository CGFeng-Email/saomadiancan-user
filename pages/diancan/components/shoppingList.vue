<!-- 购物车商品弹窗列表 -->
<template>
	<view class="shopping_list">
		<view class="shadow" @click="hideCartShoppingList"></view>
		<view class="main cart_shoppinglist_anim">
			<view class="head">
				<i class="iconfont icon-shanchu"></i>
				<text>清空已点</text>
			</view>
			<scroll-view class="scroll_list" :scroll-y="true" :scroll-with-animation="true">
				<view class="item" v-for="(item, index) in cuisineCartList" :key="index">
					<image class="cover" :src="item.image"></image>
					<view class="content">
						<view class="name">
							{{item.name}}
						</view>
						<view class="price">
							¥{{item.price}}
						</view>
					</view>
					<view class="function">
						<i class="iconfont icon-jian"></i>
						<text>{{item.salesVolume}}</text>
						<i class="iconfont icon-zengjia"></i>
					</view>
				</view>
				<view class="hint" style="height: 200rpx;">{{this.cuisineCartList.length == 0 ? '客观没有更多了哦' : ''}}</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {cuisineCartList:Array},
		methods: {
			hideCartShoppingList() {
				this.$parent.openCartShopingLing(false)
			}
		}
	}
</script>

<style lang="less" scoped>
	.shopping_list {
		.shadow {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, .6);
			z-index: 8;
		}

		.main {
			position: fixed;
			bottom: 120rpx;
			left: 0;
			right: 0;
			height: 800rpx;
			background: #fff;
			z-index: 10;
			border-radius: 10rpx 10rpx 0 0;
			.head {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				color: #999;
				height: 80rpx;
				padding: 0 10rpx;
				border-bottom: 1rpx solid #f5f5f5;
				font-size: 28rpx;
				.iconfont {
					padding-right: 10rpx;
				}
			}
			.scroll_list {
				height: 100%;
				padding: 20rpx 0;
			}
			.item {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				padding: 0 10rpx;
				height: 150rpx;
				margin-bottom: 18rpx;
				.cover {
					width: 150rpx;
					height: 150rpx;
					object-fit: cover;
					border-radius: 8rpx;
				}
				.content {
					flex: 1;
					padding: 0 10rpx 0 16rpx;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.name 	{
						font-size: 26rpx;
					}
					.price {
						font-size: 26rpx;
						color: #999;
					}
				}
				.function {
					width: 180rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28rpx;
					.iconfont {
						font-size: 56rpx;
						color: #fcd267;
					}
					.icon-zengjia {
						color: #fcd267;
					}
				}
			}
		}
	}
</style>
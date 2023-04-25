<template>
	<view>
		<!-- 顶部 -->
		<view class="top_view">
			<view>10人就餐</view>
			<view class="icon">
				<image src="/static/img/fenxiang.svg" mode="widthFix" class="top-search"></image>
				<image src="/static/img/dingdan.svg" mode="widthFix"></image>
			</view>
		</view>

		<!-- 点餐界面 -->
		<view class="order_view">
			<!-- 点餐主体 -->
			<view class="common">
				<view class="left">
					<scroll-view scroll-y="true" class="scroll_h" :scroll-with-animation="true" :enhanced="true"
						:show-scrollbar="false">
						<view class="item_text">
							<text>素菜类</text>
							<text>10</text>
						</view>
					</scroll-view>
				</view>
				<view class="right">
					<scroll-view scroll-y="true" class="scroll_h" @scrolltolower="tolower" :scroll-with-animation="true"
						:enhanced="true" :show-scrollbar="false" :scroll-into-view="scroll_into" @scroll="scroLl">
						<view class="goods_item">
							<!-- 分类名称 -->
							<view class="classify">素菜类</view>
							<!-- 当前分类下的商品 -->
							<view class="classify_goods">
								<!-- 商品图片 -->
								<view class="goods_image">
									<image src="/static/img/guanbi.png" mode=""></image>
								</view>
								<view class="goods_recommend">
									<view class="goods_name">
										<text class="name">土豆丝</text>
										<text class="sales">已售78</text>
									</view>
									<view class="goods_price">
										<text class="sign">￥</text>
										<text class="num">12</text>
										<text class="weight">/份</text>
									</view>
								</view>
								<view class="quantity">
									<view>
										<image src="/static/img/jianhao.png" mode="widthFix"></image>
									</view>
									<view>
										<text>10</text>
									</view>
									<view>
										<image src="/static/img/jia.png" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>

			<!-- 底部 -->
			<view class="shopping_cart">
				<view class="left_cart" style="width: 115rpx;">
					<view class="cart">
						<image src="/static/img/gouwuche.png" mode="widthFix"></image>
					</view>
					<view class="number">12</view>
				</view>
				<view class="text">已点10份菜品</view>
				<view class="place_btn">
					<button plain="true" open-type="getUserInfo">选好了</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

	}
</script>

<style scoped lang="less">
	// 顶部
	.top_view {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;
		background: linear-gradient(to bottom, #f7d45f, #f7d562, #f8d561, #f9db76, #f9de80);

		image {
			display: block;
			width: 35rpx;
			height: 35rpx;
			padding: 0 12rpx;
		}

		.icon {
			display: flex;
			align-items: center;
		}
	}

	// 点餐
	.order_view {
		margin-top: 120rpx;
		background: #f7d562;

		.common {
			position: fixed;
			top: 120rpx;
			left: 0;
			right: 0;
			display: flex;

			.left {
				background: #fafafa;
				width: 150rpx;
				overflow-y: auto;

				.scroll_h {
					height: 100vh;
				}

				.item_text {
					font-size: 27rpx;
					padding: 30rpx 10rpx;
					display: flex;
					align-items: center;
					color: #797979;

					text:nth-child(1) {
						flex: 1;
					}

					text:nth-child(2) {
						background: #ed594e;
						border-radius: 50%;
						font-size: 20rpx;
						color: #fff;
						width: 34rpx;
						height: 34rpx;
						line-height: 34rpx;
						margin-left: 2rpx;
						text-align: center;
					}
				}
			}

			.right {
				flex: 1;
				background: #fff;
				overflow-y: auto;

				.classify {
					font-size: 28rpx;
					padding: 30rpx 20rpx;
					color: #797979;
				}

				.classify_goods {
					display: flex;
					justify-content: space-between;
					padding: 0 20rpx;
					height: 150rpx;
					font-size: 30rpx;
					margin-bottom: 45rpx;

					.goods_image image {
						display: block;
						width: 150rpx;
						height: 150rpx;
						border-radius: 10rpx;
					}

					.goods_recommend {
						flex: 1;
						position: relative;
						padding: 0 20rpx;

						.goods_name {
							display: flex;
							flex-direction: column;
							position: relative;
							top: 0;

							.name {
								font-weight: bold;
								padding-bottom: 8rpx;
							}

							.sales {
								font-size: 20rpx;
							}
						}

						.goods_price {
							position: absolute;
							bottom: 0;
							display: flex;
							align-items: baseline;

							text {
								display: block;
							}

							.sign {
								font-size: 20rpx;
							}

							.num {
								font-weight: bold;
							}

							.weight {
								font-size: 25rpx;
								color: #cccccc;
							}

						}
					}

					.quantity {
						display: flex;
						align-items: flex-end;
						width: 200rpx;
						justify-content: space-between;
						position: relative;

						image {
							width: 50rpx;
							height: 50rpx;
						}
					}
				}
			}

		}

		.shopping_cart {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #fefefe;
			height: 120rpx;
			box-shadow: 0rpx -1.9rpx 1rpx 1rpx #f9f9f9;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 20rpx;
			z-index: 9;
			.left_cart {
				display: flex;
				align-items: center;
				.cart {
					width: 75rpx;
					height: 75rpx;
					image {
						display: block;
						width: 75rpx;
						height: 75rpx;
					}
				}
				.number {
					align-self: flex-start;
					background: #ed594e;
					color: #fff;
					width: 40rpx;
					height: 40rpx;
					line-height: 40rpx;
					border-radius: 50%;
					text-align: center;
					font-size: 20rpx;
				}
			}
			.text {
				flex: 1;
				padding: 0 25rpx;
				color: #999;
			}
			
			.place_btn {
				button {
					border: none;
					background: linear-gradient(to right, #f8da81, #f8d771, #f7d362, #f6cb4a);
					width: 200rpx;
					height: 75rpx;
					line-height: 75rpx;
					border-radius: 50rpx;
					font-weight: bold;
					z-index: 9;
				}
			}
		}
	}
</style>

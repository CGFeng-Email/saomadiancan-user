<!-- 骨架屏 -->
<!--
此文件为开发者工具生成，生成时间: 2023/6/16上午9:53:36
使用方法：
在 /Users/feng/Desktop/web/saomadiancan-user/unpackage/dist/dev/mp-weixin/pages/diancan/diancan.wxml 引入模板

```
<import src="diancan.skeleton.wxml"/>
<template is="skeleton" wx:if="{{loading}}" />
```

在 /Users/feng/Desktop/web/saomadiancan-user/unpackage/dist/dev/mp-weixin/pages/diancan/diancan.wxss 中引入样式
```
@import "./diancan.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
-->
<template>
	<view class="sk-container">
		<view class="container data-v-89fa5178">
			<view class="top_view data-v-89fa5178 sk-image">
				<view class="data-v-89fa5178 sk-transparent sk-text-14-2857-970 sk-text">9人就餐</view>
				<view class="icon data-v-89fa5178">
					<image class="top-search data-v-89fa5178 sk-image" mode="widthFix" style="height: 14px;"></image>
					<image class="data-v-89fa5178 sk-image" data-event-opts="tap,toMyorder,$event" mode="widthFix"
						style="height: 14px;"></image>
				</view>
			</view>
			<view class="order_view data-v-89fa5178">
				<view class="common data-v-89fa5178">
					<view class="left data-v-89fa5178">
						<scroll-view class="scroll_h data-v-89fa5178" enhanced="true" scroll-with-animation="true"
							scroll-y="true">
							<view class="item_text data-v-89fa5178 active"
								data-event-opts="tap,cuisineCategoryItem,0,$0,cuisineCategory,,0,cid">
								<text class="data-v-89fa5178 sk-transparent sk-text-14-2857-872 sk-text">素菜类</text>
							</view>
							<view class="item_text data-v-89fa5178"
								data-event-opts="tap,cuisineCategoryItem,1,$0,cuisineCategory,,1,cid">
								<text class="data-v-89fa5178 sk-transparent sk-text-14-2857-992 sk-text">荤菜类</text>
							</view>
							<view class="item_text data-v-89fa5178"
								data-event-opts="tap,cuisineCategoryItem,2,$0,cuisineCategory,,2,cid">
								<text class="data-v-89fa5178 sk-transparent sk-text-14-2857-189 sk-text">烧烤类</text>
							</view>
							<view class="item_text data-v-89fa5178"
								data-event-opts="tap,cuisineCategoryItem,3,$0,cuisineCategory,,3,cid">
								<text class="data-v-89fa5178 sk-transparent sk-text-14-2857-610 sk-text">酒水类</text>
							</view>
						</scroll-view>
					</view>
					<view class="right data-v-89fa5178">
						<scroll-view class="scroll_h data-v-89fa5178"
							data-event-opts="scrolltolower,lower,$event,scroll,scroLl,$event" enhanced="true"
							scroll-into-view="true" scroll-with-animation="true" scroll-y="true">
							<blcok class="data-v-89fa5178">
								<view class="goods_item data-v-89fa5178" id="a1679931836873">
									<view class="classify data-v-89fa5178 sk-transparent sk-text-14-2857-112 sk-text">
										素菜类</view>
									<view class="classify_goods data-v-89fa5178"
										data-event-opts="tap,openShoppingDetails,true,0,0,$0,$1,cuisineList,,0,list,,0,cuisineList,,0,cid">
										<view class="goods_image data-v-89fa5178">
											<image class="img data-v-89fa5178 sk-image"></image>
										</view>
										<view class="goods_recommend data-v-89fa5178">
											<view class="goods_name data-v-89fa5178">
												<text
													class="name data-v-89fa5178 sk-transparent sk-text-14-2857-189 sk-text">蒜蓉炒通心菜</text>
												<text
													class="sales data-v-89fa5178 sk-transparent sk-text-14-2857-483 sk-text">已售23</text>
											</view>
											<view class="goods_price data-v-89fa5178">
												<text class="sign data-v-89fa5178 sk-transparent sk-opacity">￥</text>
												<text
													class="num data-v-89fa5178 sk-transparent sk-text-14-2857-384 sk-text">38</text>
												<text
													class="weight data-v-89fa5178 sk-transparent sk-text-14-2857-124 sk-text">/盘</text>
											</view>
										</view>
										<view class="quantity data-v-89fa5178 item_right">
											<image class="data-v-89fa5178 sk-image"
												data-event-opts="tap,plus,0,0,$0,$1,cuisineList,,0,list,,0,cuisineList,,0,cid"
												mode="widthFix" style="height: 21px;"></image>
										</view>
									</view>
									<view class="classify_goods data-v-89fa5178"
										data-event-opts="tap,openShoppingDetails,true,0,1,$0,$1,cuisineList,,0,list,,1,cuisineList,,0,cid">
										<view class="goods_image data-v-89fa5178">
											<image class="img data-v-89fa5178 sk-image"></image>
										</view>
										<view class="goods_recommend data-v-89fa5178">
											<view class="goods_name data-v-89fa5178">
												<text
													class="name data-v-89fa5178 sk-transparent sk-text-14-2857-241 sk-text">白灼生菜</text>
												<text
													class="sales data-v-89fa5178 sk-transparent sk-text-14-2857-493 sk-text">已售31</text>
											</view>
											<view class="goods_price data-v-89fa5178">
												<text class="sign data-v-89fa5178 sk-transparent sk-opacity">￥</text>
												<text class="num data-v-89fa5178 sk-transparent sk-opacity">16</text>
												<text
													class="weight data-v-89fa5178 sk-transparent sk-text-14-2857-687 sk-text">/盘</text>
											</view>
										</view>
										<view class="quantity data-v-89fa5178 item_right">
											<image class="data-v-89fa5178 sk-image"
												data-event-opts="tap,plus,0,1,$0,$1,cuisineList,,0,list,,1,cuisineList,,0,cid"
												mode="widthFix" style="height: 21px;"></image>
										</view>
									</view>
									<view class="classify_goods data-v-89fa5178"
										data-event-opts="tap,openShoppingDetails,true,0,2,$0,$1,cuisineList,,0,list,,2,cuisineList,,0,cid">
										<view class="goods_image data-v-89fa5178">
											<image class="img data-v-89fa5178 sk-image"></image>
										</view>
										<view class="goods_recommend data-v-89fa5178">
											<view class="goods_name data-v-89fa5178">
												<text
													class="name data-v-89fa5178 sk-transparent sk-text-14-2857-889 sk-text">香菜</text>
												<text
													class="sales data-v-89fa5178 sk-transparent sk-text-14-2857-619 sk-text">已售27</text>
											</view>
											<view class="goods_price data-v-89fa5178">
												<text class="sign data-v-89fa5178 sk-transparent sk-opacity">￥</text>
												<text class="num data-v-89fa5178 sk-transparent sk-opacity">12</text>
												<text
													class="weight data-v-89fa5178 sk-transparent sk-text-14-2857-216 sk-text">/碟</text>
											</view>
										</view>
										<view class="quantity data-v-89fa5178 item_right">
											<image class="data-v-89fa5178 sk-image"
												data-event-opts="tap,plus,0,2,$0,$1,cuisineList,,0,list,,2,cuisineList,,0,cid"
												mode="widthFix" style="height: 21px;"></image>
										</view>
									</view>
									<view class="classify_goods data-v-89fa5178"
										data-event-opts="tap,openShoppingDetails,true,0,3,$0,$1,cuisineList,,0,list,,3,cuisineList,,0,cid">
										<view class="goods_image data-v-89fa5178">
											<image class="img data-v-89fa5178 sk-image"></image>
										</view>
										<view class="goods_recommend data-v-89fa5178">
											<view class="goods_name data-v-89fa5178">
												<text
													class="name data-v-89fa5178 sk-transparent sk-text-14-2857-998 sk-text">白菜</text>
												<text
													class="sales data-v-89fa5178 sk-transparent sk-text-14-2857-42 sk-text">已售17</text>
											</view>
											<view class="goods_price data-v-89fa5178">
												<text class="sign data-v-89fa5178 sk-transparent sk-opacity">￥</text>
												<text class="num data-v-89fa5178 sk-transparent sk-opacity">13</text>
												<text
													class="weight data-v-89fa5178 sk-transparent sk-text-14-2857-651 sk-text">/份</text>
											</view>
										</view>
										<view class="quantity data-v-89fa5178 item_right">
											<image class="data-v-89fa5178 sk-image"
												data-event-opts="tap,plus,0,3,$0,$1,cuisineList,,0,list,,3,cuisineList,,0,cid"
												mode="widthFix" style="height: 21px;"></image>
										</view>
									</view>
									<view class="classify_goods data-v-89fa5178"
										data-event-opts="tap,openShoppingDetails,true,0,4,$0,$1,cuisineList,,0,list,,4,cuisineList,,0,cid">
										<view class="goods_image data-v-89fa5178">
											<image class="img data-v-89fa5178 sk-image"></image>
										</view>
										<view class="goods_recommend data-v-89fa5178">
											<view class="goods_name data-v-89fa5178">
												<text
													class="name data-v-89fa5178 sk-transparent sk-text-14-2857-144 sk-text">凉拌下酒菜</text>
												<text
													class="sales data-v-89fa5178 sk-transparent sk-text-14-2857-54 sk-text">已售1</text>
											</view>
											<view class="goods_price data-v-89fa5178">
												<text class="sign data-v-89fa5178 sk-transparent sk-opacity">￥</text>
												<text class="num data-v-89fa5178 sk-transparent sk-opacity">16</text>
												<text
													class="weight data-v-89fa5178 sk-transparent sk-text-14-2857-339 sk-text">/份</text>
											</view>
										</view>
										<view class="quantity data-v-89fa5178 item_right">
											<image class="data-v-89fa5178 sk-image"
												data-event-opts="tap,plus,0,4,$0,$1,cuisineList,,0,list,,4,cuisineList,,0,cid"
												mode="widthFix" style="height: 21px;"></image>
										</view>
									</view>
								</view>
							</blcok>
						</scroll-view>
					</view>
				</view>
				<view class="shopping_cart data-v-89fa5178" data-event-opts="tap,openCartShopingLing,$event">
					<view class="left_cart data-v-89fa5178" style="width:49px;">
						<view class="cart data-v-89fa5178">
							<image class="data-v-89fa5178 sk-image" mode="widthFix" style="height: 32px;"></image>
						</view>
					</view>
					<view class="place_btn data-v-89fa5178">
						<button class="data-v-89fa5178 sk-transparent sk-pseudo sk-pseudo-circle sk-image"
							data-event-opts="tap,e0,$event" open-type="getUserInfo" plain="true">选好了</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.sk-transparent {
		color: transparent !important;
	}

	.sk-text-14-2857-970 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 52.5000rpx;
		position: relative !important;
	}

	.sk-text {
		background-origin: content-box !important;
		background-clip: content-box !important;
		background-color: transparent !important;
		color: transparent !important;
		background-repeat: repeat-y !important;
	}

	.sk-text-14-2857-872 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 36.0938rpx;
		position: relative !important;
	}

	.sk-text-14-2857-992 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 36.0938rpx;
		position: relative !important;
	}

	.sk-text-14-2857-189 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 36.0938rpx;
		position: relative !important;
	}

	.sk-text-14-2857-610 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 36.0938rpx;
		position: relative !important;
	}

	.sk-text-14-2857-112 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 36.0938rpx;
		position: relative !important;
	}

	.sk-text-14-2857-483 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 26.2500rpx;
		position: relative !important;
	}

	.sk-opacity {
		opacity: 0 !important;
	}

	.sk-text-14-2857-384 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 39.3750rpx;
		position: relative !important;
	}

	.sk-text-14-2857-124 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 32.8125rpx;
		position: relative !important;
	}

	.sk-text-14-2857-241 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 39.3750rpx;
		position: relative !important;
	}

	.sk-text-14-2857-493 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 26.2500rpx;
		position: relative !important;
	}

	.sk-text-14-2857-687 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 32.8125rpx;
		position: relative !important;
	}

	.sk-text-14-2857-889 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 39.3750rpx;
		position: relative !important;
	}

	.sk-text-14-2857-619 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 26.2500rpx;
		position: relative !important;
	}

	.sk-text-14-2857-216 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 32.8125rpx;
		position: relative !important;
	}

	.sk-text-14-2857-998 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 39.3750rpx;
		position: relative !important;
	}

	.sk-text-14-2857-42 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 26.2500rpx;
		position: relative !important;
	}

	.sk-text-14-2857-651 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 32.8125rpx;
		position: relative !important;
	}

	.sk-text-14-2857-144 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 39.3750rpx;
		position: relative !important;
	}

	.sk-text-14-2857-54 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 26.2500rpx;
		position: relative !important;
	}

	.sk-text-14-2857-339 {
		background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
		background-size: 100% 32.8125rpx;
		position: relative !important;
	}

	.sk-image {
		background: #EFEFEF !important;
	}

	.sk-pseudo::before,
	.sk-pseudo::after {
		background: #EFEFEF !important;
		background-image: none !important;
		color: transparent !important;
		border-color: transparent !important;
	}

	.sk-pseudo-rect::before,
	.sk-pseudo-rect::after {
		border-radius: 0 !important;
	}

	.sk-pseudo-circle::before,
	.sk-pseudo-circle::after {
		border-radius: 50% !important;
	}

	.sk-container {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: transparent;
	}
</style>
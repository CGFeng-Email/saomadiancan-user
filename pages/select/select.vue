<template>
	<view class="select">
		<view class="head">
			<view class="text">
				欢迎来到
			</view>
			<view class="text">
				全易餐饮店
			</view>
		<view>
			
		<view class="content">
			<view class="name">
				您好，请选择就餐人数
			</view>
			<view class="table_number">
				桌号：002
			</view>
			<view class="list">
				<view class="item" :class="[number_of_prople == item ? 'item_active' : '']" v-for="(item, index) in list" :key="index" @click="item(item)">
					{{item}}
				</view>
			</view>
			<view class="btn" :class="[number_of_prople > 0 ? 'btn_active' : '']" @click="btn">
				开始点餐
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [1,2,3,4,5,6,7,8,9,10],
				table_number: '', // 桌号
				number_of_prople: -1, // 就餐人数
			}
		},
		onLoad(e) {
			console.log(e);
		},
		methods: {
			item(item) {
				console.log(item);
				wx.setStorageSync('number_of_prople', this.number_of_prople)
				this.number_of_prople = item
			},
			btn() {
				if(this.number_of_prople <= 0) return false;
				 console.log('提交');
				 wx.redirectTo({
				   url: '/pages/diancan/diancan'
				 })
			}
		}
	}
</script>

<style>
	page {
		height: 100vh;
		background: url('https://diancan-1317202885.cos.ap-guangzhou.myqcloud.com/diancan/img/1761686298673_.pic.jpg?q-sign-algorithm=sha1&q-ak=AKID7GMm7bhhZryEklfxQd7RfbJKYPs-uUo716FjRt6KxCbdQLQ8-rQf8ELVjDz-kpiA&q-sign-time=1686303198;1686306798&q-key-time=1686303198;1686306798&q-header-list=host&q-url-param-list=ci-process&q-signature=5a7fc23652a98d4571f60cede381a72bb385cda9&x-cos-security-token=bEU4k7Ct6DePOk80iLSwpcWuclNEt19a97dbe84138de06bc8991e2b7f6e1aedcbI4zrQyintjksV1Z9Ges7v8DymvSFXnYLPDELsLNqv5KlEBbvfHxRYe76q6RKfYvXRplZzEvRZDXQvBhDytIvx1PwiusPkQGZyxW2MYCF-feybmRAQEdg_3M1CdTAR7aVHrUqvlHwPhv4AwxWvwjgbHIrBKTisjCuzqMqppykdkgBJA8ZQE_cJVPBrcIl_dV&ci-process=originImage') no-repeat;
		background-size: cover;
	}
</style>
<style lang="less" scoped>
	.head {
		margin-top: 150rpx;
		text-align: center;
		.text {
			font-size: 56rpx;
			line-height: 86rpx;
			letter-spacing: 3rpx;
			font-style: italic;
			color: #27374D;
			font-weight: 500;
		}
	}
	
	.content {
		position: fixed;
		bottom: 100rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		background: #fff;
		padding: 20rpx 20rpx 30rpx;
		border-radius: 14rpx;
		.name {
			font-weight: 500;
			text-align: left;
		}
		
		.table_number {
			text-align: left;
			padding: 10rpx 0;
		}
		
		.list {
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx 0;
			.item {
				width: 150rpx;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				background: #f5f5f5;
				border-radius: 12rpx;
				margin-bottom: 20rpx;
				margin-right: 10rpx;
			}
			
			.item_active {
				background: #f4cf73;
			}
		}
		
		.btn {
			height: 80rpx;
			border-radius: 12rpx;
			background: #f4cf73;
			line-height: 80rpx;
			opacity: .5;
		}
		
		.btn_active {
			opacity: 1;
		}
	}
</style>
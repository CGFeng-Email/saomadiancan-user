<template>
	<view class="container">
		
		<view class="top">
			<view class="title">欢迎来到</view>
			<view class="title">全易餐饮店</view>
		</view>
			
		<view class="content">

			<view class="name">您好，请选择就餐人数</view>

			<view class="table_number">桌号：{{table_number}}</view>

			<view class="list">
				<view class="item" :class="[number_of_prople == item ? 'item_active' : '']"
					v-for="(item, index) in list" :key="index" @click="itemClick(item)">
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
	const db = wx.cloud.database();
	const orderDataApi = db.collection('orderData');
	export default {
		data() {
			return {
				list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				table_number: '', // 桌号
				number_of_prople: -1, // 就餐人数
			}
		},
		onLoad(e) {
			console.log('e', e);
			this.table_number = e.number
			// 扫码识别桌号
			wx.setStorageSync('table_number', e.number);
			this.verify()
		},
		methods: {
			// 就餐人数
			itemClick(item) {
				this.number_of_prople = item
			},
			// 跳转点餐页
			btn() {
				if (this.number_of_prople <= 0) return false;
				wx.setStorageSync('number_of_prople', this.number_of_prople)
				wx.redirectTo({
					url: '/pages/diancan/diancan'
				})
			},
			// 进入页面 验证当前桌号是否已结账
			async verify() {
				const res = await orderDataApi.where({order_status: 'yes', table_number: this.table_number}).get();
				console.log('res', res);
				if(res.data.length <= 0) return false;
				wx.setStorageSync('number_of_prople', this.number_of_prople)
				wx.reLaunch({
				  url: '/pages/diancan/diancan'
				})
			}
		}
	}
</script>

<style>
	page {
		height: 100vh;
		background: url('https://diancan-1317202885.cos.ap-guangzhou.myqcloud.com/diancan/img/1761686298673_.pic.jpg') no-repeat;
		background-size: cover;
		background-position: center center;
		background-attachment: fixed;
	}
</style>

<style lang="less" scoped>
	.top {
		position: fixed;
		top: 200rpx;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;

		.title {
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

		.img {
			width: 300rpx;
			height: 300rpx;
		}

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
			text-align: center;
		}

		.btn_active {
			opacity: 1;
		}
	}
</style>
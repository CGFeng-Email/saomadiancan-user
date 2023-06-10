<template>
	<view class="container">

		<!-- <view class="top_content">
			<view class="text">欢迎来到</view>
			<view class="text">全易餐饮店</view>
		<view>
			 -->
		<view class="content">
			<image class="img" :src="base64ImgUrl"></image>

			<view class="name">您好，请选择就餐人数</view>

			<view class="table_number">桌号：002</view>

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
	// 引入腾讯云插件
	// var COS = require('cos-nodejs-sdk-v5');
	import COS from 'cos-wx-sdk-v5'

	var cos = new COS({
		SecretId: 'AKIDkNrEaomqiS1Vq58yiLn1LVTDl8Pex7ED',
		SecretKey: 'sa6ORHtHSQF792iBRhkpnY6WoxxnT2Sl',
		SimpleUploadMethod: 'putObject',
	});


	let Bucket = 'diancan-1317202885'; // 存储桶名称
	let Region = 'ap-guangzhou'; // 存储桶所在地区ip

	const db = wx.cloud.database()
	const tableNumberListApi = db.collection('tableNumberList')

	export default {
		data() {
			return {
				list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				table_number: '', // 桌号
				number_of_prople: -1, // 就餐人数
				base64ImgUrl: '',

			}
		},
		onLoad() {
			let number = '001';
			this.getCode(number)
		},
		methods: {
			async getCode(number) {
				const token = await this.getToken();
				console.log('token', token);

				uni.request({
					url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${token}`,
					methods: 'POST',
					responseType: 'arraybuffer',
					data: JSON.stringify({
						"path": 'pages/select/select?number=' + number,
						"env_version": "trial",
						"width": 280
					}),
					success: async res => {
						console.log('res', res);
						console.log('res', JSON.stringify(res));

						// const arrayBuffer = new Uint8Array(res.data)
						// const base64 = wx.arrayBufferToBase64(arrayBuffer)
						// console.log('base64', base64);
						// this.base64ImgUrl = base64

						const name = await this.randomName(number)
						console.log('name', name);

						const getBufferImgStorage = await this.bufferImgStorage(name, res.data);
						console.log('getBufferImgStorage', getBufferImgStorage);

						// cos.putObject({
						// 	Bucket,
						// 	Region,
						// 	Key: 'diancan/code/' + name,
						// 	Body: res.data, // Body里传入的是文件内容
						// }, function(err, data) {
						// 	console.log(err || data);
						// });
					},
					fail: err => {
						console.log('err', err);
					}
				})
			},
			// 二进制文件转化成图片 存储到本地
			bufferImgStorage(name, data) {
				console.log('999', data);
				var save = wx.getFileSystemManager();
				save.writeFile({
					filePath: wx.env.USER_DATA_PATH + name,
					data,
					success: res => {
						console.log('res', res);
						//保存到相册
						// wx.saveImageToPhotosAlbum({ 
						// 	filePath: wx.env.USER_DATA_PATH + name,
						// 	success: function(res) {
						// 		wx.showToast({
						// 			title: '下载成功',
						// 			icon: 'none',
						// 			duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
						// 		})
						// 	},
						// 	fail: function(err) {
						// 		console.log(err)
						// 	}
						// })
					},
					fail: err => {
						console.log('err', err)
					}
				})
			},
			// 随机命名
			randomName(number) {
				return new Date().getTime() + '-' + number + '.jpg'
			},
			// 获取token
			getToken() {
				const params = {
					grant_type: 'client_credential',
					appid: 'wxb81dc480cbe6c823',
					secret: '77c3578acf2f5b75a359fdb5085ae007'
				}
				return new Promise((resolve, reject) => {
					uni.request({
						url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=${params.grant_type}&appid=${params.appid}&secret=${params.secret}`,
						success: function(res) {
							console.log(res);
							resolve(res.data.access_token)
						}
					})
				})
			},
			itemClick(item) {
				console.log(item);
				wx.setStorageSync('number_of_prople', this.number_of_prople)
				this.number_of_prople = item
			},
			btn() {
				if (this.number_of_prople <= 0) return false;
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
		background: url('https://diancan-1317202885.cos.ap-guangzhou.myqcloud.com/diancan/img/1761686298673_.pic.jpg') no-repeat;
		background-size: cover;
	}
</style>

<style lang="less" scoped>
	.top_content {
		margin-top: 200rpx;
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
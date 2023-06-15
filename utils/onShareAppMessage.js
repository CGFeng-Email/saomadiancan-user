export default {
	data() {
		return {
			share: {
				title: '自定义分享标题', // 没有的话 当前小程序名称
				imageUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg', // 没有的话 使用默认截图
				path: '/pages/index/index' // 当前页面 path ，必须是以 / 开头的完整路径
			}
		}
	},
	//发送给朋友
	onShareAppMessage(res) {
		return {
			title: this.share.title,
			imageUrl: this.share.imageUrl,
			path: this.share.path
		}
	},
	//分享到朋友圈
	onShareTimeline(res) {
		return {
			title: this.share.title,
			imageUrl: this.share.imageUrl,
			path: this.share.path
		}
	},
}
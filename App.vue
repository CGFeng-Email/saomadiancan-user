<script>
	export default {
		onLaunch() {
			// 当数据库环境id同时存在多个的情况下、需要调用初始化方法来调用指定的环境id
			wx.cloud.init({
				env: 'diancan-1gbnagvw311f423e'
			})
			
		},
		onShow() {

		},
		methods: {
			 // 要在这里放置函数
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
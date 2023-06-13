// 在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。
const db = wx.cloud.database();
// 营业额列表 云数据库 api
const sale_time_list_api = db.collection('saleTimeList');

// 计算当天销售额
class saleTimeClass {
	constructor() {}
	// 这里使用async  外部引入使用就得使用 await 调用
	// time: 当天日期
	// total_account: 价格
	async saleTimeFn(time, total_account) {
		try {
			// 根据传递的日期去查询 云数据库是否存在数据
			const query = await sale_time_list_api.where({time}).get();
			console.log('query', query);
			
			if(query.data.length == 0) {
				// 没有今天的营业额
				await sale_time_list_api.add({data: {time, total_account}})
			} else {
				// 查询到今天的营业额，时间不变，营业额total_account +=
				// 处理成数字格式
				const price_number = Number(query.data[0].total_account) + total_account;
				// 处理价格的浮点数
				const num_tofixed = parseFloat(price_number.toPrecision(12))
				console.log('浮点数', num_tofixed);
				// 根据id 更新当天营业额的价格
				await sale_time_list_api.doc(query.data[0]._id).update({data: {
					total_account: num_tofixed
				}})
			}
		} catch (e) {
			// throw：会直接走catch
			throw '计算当天的销售额错误'
		}
	}
}

export {
	saleTimeClass
}
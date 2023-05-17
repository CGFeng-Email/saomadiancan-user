<template>
	<view class="container">
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
						<block v-for="(item, index) in cuisineCategory" :key="index">
							<view class="item_text" :class="cuisineCategoryIndex == index ? 'active': ''"
								@click="cuisineCategoryItem(index, item.cid)">
								<text>{{item.value}}</text>
								<text v-if="item.sele_quantity > 0">{{item.sele_quantity}}</text>
							</view>
						</block>
					</scroll-view>
				</view>
				<view class="right">
					<scroll-view scroll-y="true" class="scroll_h" :scroll-with-animation="true" :enhanced="true"
						:show-scrollbar="false" @scrolltolower="lower" :scroll-into-view="scrollInto" @scroll="scroLl">
						<blcok v-for="(item, index) in cuisineList" :key="index">
							<view class="goods_item" :id="item.cid">
								<!-- 分类名称 -->
								<view class="classify">{{item.category}}</view>
								<block v-for="(item2, index2) in item.list" :key="index2">
									<!-- 当前分类下的商品 -->
									<view class="classify_goods" @click="openShoppingDetails(true, index, index2, item2, item.cid)">
										<!-- 商品图片 -->
										<view class="goods_image">
											<image class="img" :src="item2.image"></image>
										</view>
										<view class="goods_recommend">
											<view class="goods_name">
												<text class="name">{{item2.name}}</text>
												<text class="sales">已售{{item2.sold_out}}</text>
											</view>
											<view class="goods_price">
												<text class="sign">￥</text>
												<text class="num">{{item2.price}}</text>
												<text class="weight">/{{item2.unit}}</text>
											</view>
										</view>
										<view class="quantity" :class="item2.salesVolume == 0 ? 'item_right' : ''">
											<image v-if="item2.salesVolume > 0" src="/static/img/jianhao.png"
												mode="widthFix" @click.stop="reduce(index,index2,item2,item.cid)"></image>
											<text v-if="item2.salesVolume > 0">{{item2.salesVolume}}</text>
											<image src="/static/img/jia.png" mode="widthFix" @click.stop="plus(index,index2,item2,item.cid)"></image>
										</view>
									</view>
								</block>
							</view>
						</blcok>
						<view style="height: 300rpx;"></view>
					</scroll-view>
				</view>
			</view>

			<!-- 底部 -->
			<view class="shopping_cart" @click="openCartShopingLing">
				<view class="left_cart" style="width: 115rpx;">
					<view class="cart">
						<image src="/static/img/gouwuche.png" mode="widthFix"></image>
					</view>
					<view class="number" v-if="totalCartCuisineNuumber > 0">{{totalCartCuisineNuumber}}</view>
				</view>
				<view class="text" v-if="totalCartCuisineNuumber > 0">已点{{totalCartCuisineNuumber}}份菜品</view>
				<view class="place_btn">
					<button plain="true" open-type="getUserInfo" @click.stop="totalCartCuisineNuumber == 0 ? false : true && submit_order()">选好了</button>
				</view>
			</view>
			
			<!-- 购物车商品弹窗列表 -->
			<SHOPPINGLIST v-if="cartShoppingLingShow" :cuisineCartList="cuisineCartList"></SHOPPINGLIST>
			<!-- 购物车商品详情 -->
			<SHOPPINGDETAILS v-if="shoppingDetailsShow" :shoppingDetailsData="shoppingDetailsData"></SHOPPINGDETAILS>
		</view>
	</view>
</template>

<script>
	// 等渲染完毕后 才会执行
	import {
		nextTick
	} from "vue";
	// 商品列表组件
	import SHOPPINGLIST from './components/shoppingList.vue';
	// 商品详情组件
	import SHOPPINGDETAILS from './components/shoppingDetails.vue';
	// 随机订单号
	import { codeFn } from '../../utils/order.js';
	// 计算当天销售额
	import {saleTimeClass} from '../../utils/saleTimeList.js';
	
	// 在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。
	const db = wx.cloud.database();
	// 数据库操作符
	const _ = db.command;
	// 订单 云数据库 api
	const orderData_Api = db.collection('orderData');
	// 菜品，商品 云数据库 api
	const cuisineList_Api = db.collection('cuisineList');
	
	export default {
		components: {
			SHOPPINGLIST,
			SHOPPINGDETAILS
		},
		data() {
			return {
				cuisineCategory: [], // 菜品分类类目
				cuisineList: [], // 菜品列表
				cuisineCategoryIndex: 0, // 左侧当前下标
				scrollInto: '', // 子元素id
				rightTopList: [], // 右侧菜品分类每个的高度
				topHeight: 0, // 滚动时距离顶部的高度
				cartShoppingLingShow: false, // 购物车商品弹窗列表显示，隐藏
				cuisineCartList: [], // 菜品购物车列表
				shoppingDetailsShow: false, // 商品详情 显示
				shoppingDetailsData: {}, // 商品详情数据
			}
		},
		methods: {
			// 获取菜品分类，菜品数据
			async getCuisine() {
				// 请求云服务器api - 获取菜品分类列表 和 菜品列表
				const res = await wx.cloud.callFunction({
					name: 'getCuisine',
					data: {}
				})
				// console.log('res', res)
				this.cuisineCategory = res.result.getCuisineCategory.data;
				this.cuisineList = res.result.objList;
				// 等待渲染完毕之后 才会执行this.$nextTick
				this.$nextTick(() => {
					let itemHeight = 0;
					this.rightTopList = [];
					// 计算右边菜品模块 - 每个分类模块的高度
					const query = wx.createSelectorQuery();
					query.selectAll('.goods_item').boundingClientRect();
					query.exec((res) => {
						// console.log('res', res);
						res[0].forEach(item => {
							itemHeight += item.height
							// console.log('height', itemHeight);
							this.rightTopList.push(itemHeight)
						})
						// console.log('rightTopList', this.rightTopList);
					})
				})
			},
			// 左侧类目点击
			cuisineCategoryItem(index, cid) {
				this.cuisineCategoryIndex = index;
				this.scrollInto = cid;
				// 解决重复点击返回到原点
				setTimeout(() => {
					this.scrollInto = ''
				}, 200)
			},
			// 滚动触发
			scroLl(event) {
				// console.log(event);
				// 滚动时距离顶部的高度
				let scrollTop = event.detail.scrollTop;
				// console.log('scroll', scrollTop);
				
				if(scrollTop >= this.topHeight) {
					// console.log('上拉');
					if(scrollTop >= this.rightTopList[this.cuisineCategoryIndex]) {
						this.cuisineCategoryIndex += 1
					}
				} else {
					// console.log('下拉');
					if(scrollTop < this.rightTopList[this.cuisineCategoryIndex -1]) {
						this.cuisineCategoryIndex -= 1
					}
				}
				
				this.topHeight = scrollTop;
			},
			// 右侧菜品列表滚动到底部触发
			lower() {
				console.log('滚动到底部触发');
			},
			// 单个商品加
			plus(index,index2,item2,cid) {
				// console.log(index, index2, item2, cid);
				// 解构出当前商品的添加数量
				const {salesVolume} = item2;
				const addNum = Number(salesVolume) + 1;
				this.$set(this.cuisineList[index].list[index2],'salesVolume',addNum);
				// 生成删减出菜品购物车列表的菜品对象
				const cuisineItem = {
					price: Number(item2.price) * addNum,
					salesVolume: addNum,
					_id: item2._id,
					image: item2.image,
					name: item2.name,
					unit: item2.unit,
					cid,
					index,
					index2
				}
				// 添加商品进购物车
				this.addShoppingCart(cuisineItem)
			},
			// 单个商品减
			reduce(index,index2,item2,cid) {
				// 解构出当前商品的添加数量
				const {salesVolume} = item2;
				const addNum = Number(salesVolume) - 1;
				this.$set(this.cuisineList[index].list[index2],'salesVolume',addNum)
				// 生成添加进菜品购物车列表的菜品对象
				const cuisineItem = {
					price: Number(item2.price) * addNum,
					salesVolume: addNum,
					_id: item2._id,
					image: item2.image,
					name: item2.name,
					unit: item2.unit,
					cid,
					index,
					index2
				}
				
				// 添加，减少商品进购物车
				this.addShoppingCart(cuisineItem)
			},
			// 弹出 购物车菜品列表
			openCartShopingLing(flag = true) {
				this.cartShoppingLingShow = flag
			},
			// 添加,减少商品进购物车
			addShoppingCart(cuisineItem) {
				// console.log('cuisineItem', cuisineItem);
				// console.log('cuisineCartList', this.cuisineCartList);
				// 菜品购物车列表 - 空数组，没有数据。
				if(this.cuisineCartList.length == 0) {
					this.cuisineCartList.push(cuisineItem)
				} else {
					// 菜品购物车列表 - 有数据
					// 查找菜品购物车列表是否有相同的菜品
					const cuisineIndex = this.cuisineCartList.findIndex(item => item._id == cuisineItem._id);
					// console.log('cuisineIndex', cuisineIndex);
					// cuisineIndex: -1, 没有相同菜品
					// cuisineIndex: 1, 相同的菜品
					if(cuisineIndex == -1) {
						this.cuisineCartList.unshift(cuisineItem)
					} else {
						this.$set(this.cuisineCartList[cuisineIndex], 'salesVolume', cuisineItem.salesVolume);
						this.$set(this.cuisineCartList[cuisineIndex], 'price', cuisineItem.price);
					}
				}
				
				// 计算左边菜品类目 各分类下添加了多少菜品
				this.calculateLeftCuisineCategory()
			},
			// 计算左边菜品类目 各分类下添加了多少菜品
			calculateLeftCuisineCategory() {
				// 计算出各菜品分类id，并且计算出添加的数量
				const obj = {};
				this.cuisineCartList.forEach(item => {
					// console.log('item', item);
					// 有相同的分类就叠加当前分类下的添加菜品数量
					if(obj[item.cid]) {
						obj[item.cid] += item.salesVolume
					} else {
						obj[item.cid] = item.salesVolume
					}
				})
				
				// 处理成数组
				const arr = [];
				// 循环对象
				for(let k in obj) {
					// console.log('k', k);
					arr.push({cid: k, salesVolume: obj[k]})
				}
				
				// 查询出当前分类菜品索引，更新左侧分类列表，同步左侧菜品分类下的数量
				arr.forEach(item => {
					// 查找左侧分类下的菜品类目id == 当前菜品类目的id
					const index = this.cuisineCategory.findIndex(findItem => findItem.cid == item.cid);
					// 更新当前菜品
					this.$set(this.cuisineCategory[index], 'sele_quantity', item.salesVolume)
				})
			},
			
			// 购物车菜品加减数量同步
			cartCuisinePlusReduce(parameter) {
				// console.log('parameter', parameter);
				// 同步菜品购物车列表数量,价格
				// 同步数量
				this.$set(this.cuisineCartList[parameter.cartCuisineIndex], 'salesVolume', parameter.salesVolume);
				// 同步价格
				this.$set(this.cuisineCartList[parameter.cartCuisineIndex], 'price', parameter.price * parameter.salesVolume)
				
				// 同步右侧菜品列表加减数量，价格
				const index = this.cuisineList.findIndex(item => item.cid == parameter.cid)
				// console.log('index', index);
				this.$set(this.cuisineList[index].list[parameter.index2], 'salesVolume', parameter.salesVolume)
				
				// 同步左侧菜品分类点菜数量
				this.calculateLeftCuisineCategory()
			},
			// 购物车 - 清空已点，被子组建调用
			cartEmpty() {
				// 清空购物车列表
				this.cuisineCartList = [];
				// 清空右侧菜品列表
				// console.log('cuisineList', this.cuisineList);
				this.cuisineList.forEach(item => {
					item.list.forEach(item2 => {
						item2.salesVolume = 0
					})
				})
				// 清空左侧菜品列表
				// console.log('cuisineCategory', this.cuisineCategory);
				this.cuisineCategory.forEach(item => {
					item.sele_quantity = 0
				})
				// 关闭购物车弹窗
				this.openCartShopingLing(false)
			},
			// 打开商品详情
			openShoppingDetails(open = true, index, index2, item2, cid) {
				this.shoppingDetailsShow = open;
				this.shoppingDetailsData = {
					index,
					index2,
					item2,
					cid
				}
			},
			// 提交订单
			async submit_order() {
				// 过滤掉购物车里总价为0的商品
				const orderList = this.cuisineCartList.filter(item => item.price != 0);
				// 计算总价
				let total_account = 0;
				orderList.forEach(item => total_account += item.price);
				// console.log('orderList', orderList);
				
				// 订单数据
				const orderData = {
					table_number: '002', // 桌号
					number_of_people: 3, // 人数
					total_account, // 总金额
					order_time: this.$Time().utcOffset(8).format('YYYY-MM-DD  HH:mm:ss'), // 下单时间
					order_no: codeFn(), // 下单编号
					order_status: 'no', // 订单状态 no:未接单, yes:已接单
					order_settle_account: 'no', // 结账状态 no: 未结账, yes: 已结账
					place_an_order: [ {shopping_list: orderList}] // 下单列表
				}
				// console.log('orderData', orderData);
				
				try {
					// 1.发起请求。 获取云数据库中的订单数据 
					// 2.提交订单要考虑加菜。依据order_status订单状态 no:未接单, yes:已接单
					// 3.当前桌号table_number
					// 4.fieLd: 指定需要返回的字段
					const query = await orderData_Api.where({table_number: '003', order_status: 'yes'}).field({_id: true, total_account: true}).get();
					// console.log('query', query);
					if(query.data.length == 0) {
						console.log('第一次来，已结账');
						// 1.客户初次来店下单
						// 2.之前吃过了, 已经结账了
						// 3.把订单提交到数据库
						await orderData_Api.add({data: orderData})
					} else {
						console.log('加菜');
						// 1.同样的桌号
						// 2.加菜
						
						// 计算出加菜后的总价格
						const add_total_account = Number(query.data[0].total_account) + total_account;
						// 更新数据库
						await orderData_Api.doc(query.data[0]._id).update({
							data: {
								total_account: add_total_account,
								order_status: 'no',
								place_an_order: _.unshift({shopping_list: orderList})
							}
						})
					}
					
					// 对商品已售量自增
					orderList.forEach(async item => {
						console.log('自增item', item);
						// forEach 里面的await 外面的async 无效的 要在forEach里面放 async
						const getCuisineListApi = await cuisineList_Api.doc(item._id).update({
						  data: {
							sold_out: _.inc(item.salesVolume)
						  }
						})
					})
					
					// 计算当天的销售额
					// 生成当天的时间，根据这个日期去查询云数据库是否有今天的数据，有数据就加这一次订单的价格
					// 没有数据则：往数据库新增一天今天的数据 .add({data: {time, total_account}})
					const time = this.$Time().utcOffset(8).format('YYYY-MM-DD');
					await new saleTimeClass().saleTimeFn(time, total_account);
					
					// 清空订单数据
					// 重新请求页面数据
					
				} catch(err) {
					console.log('提交订单出错', err);
				}
			}
		},
		created() {
			this.getCuisine()
		},
		computed: {
			// 计算购物车点菜总数量
			totalCartCuisineNuumber() {
				let total = 0;
				this.cuisineCartList.forEach(item => {
					total += item.salesVolume
				})
				return total
			}
		}
		
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
		height: calc(100vh - 120rpx);
		background: #f7d562;

		.common {
			display: flex;
			height: calc(100% - 120rpx);

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

				.active {
					background: #fff;
					color: #000;
				}
			}

			.right {
				flex: 1;
				background: #fff;
				overflow-y: auto;

				.scroll_h {
					height: 100%;
				}

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
						object-fit: cover;
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

					.item_right {
						justify-content: flex-end;
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
			z-index: 11;

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
				font-size: 26rpx;
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
					font-size: 30rpx;
				}
			}
		}
	}
</style>

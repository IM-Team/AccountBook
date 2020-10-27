
const accountMapMixin = {
	data() {
		return {
			mixin_accounts: {
				1: {
					name: "支付宝",
					icon: "icon-zhifubao",
					account_type: 1
				},
				2: {
					name: "微信",
					icon: "icon-weixin",
					account_type: 1
				},
				3: {
					name: "银行卡",
					icon: "icon-yinhangka",
					account_type: 1
				},
				4: {
					name: "现金",
					icon: "icon-xianjin",
					account_type: 1
				},
				5: {
					name: "白条",
					icon: "icon-baitiao",
					account_type: 2
				},
				6: {
					name: "花呗",
					icon: "icon-huabei",
					account_type: 2
				},
				7: {
					name: "信用卡",
					icon: "icon-xinyongka",
					account_type: 2
				}
			}
		}
	}
}



export {
	accountMapMixin
}

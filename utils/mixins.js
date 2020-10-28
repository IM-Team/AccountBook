
const accountMapMixin = {
	data() {
		return {
			mixin_accounts: {
				1: {
					name: "支付宝",
					icon: "icon-zhifubao",
					account_type: 1,
					color: "#5A9BE3"
				},
				2: {
					name: "微信",
					icon: "icon-weixin",
					account_type: 1,
					color: "#4A9E3E"
				},
				3: {
					name: "银行卡",
					icon: "icon-yinhangka",
					account_type: 1,
					color: "#AA00FF"
				},
				4: {
					name: "现金",
					icon: "icon-xianjin",
					account_type: 1,
					color: "#ffb83f"
				},
				5: {
					name: "白条",
					icon: "icon-baitiao",
					account_type: 2,
					color: "#DE231C"
				},
				6: {
					name: "花呗",
					icon: "icon-huabei",
					account_type: 2,
					color: "#5A9BE3"
				},
				7: {
					name: "信用卡",
					icon: "icon-xinyongka",
					account_type: 2,
					color: "#00a65a"
				}
			}
		}
	}
}



export {
	accountMapMixin
}

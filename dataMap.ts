
/**
 * Icon
 * @param {Number} type 	图标类型：收入 or 支出
 * @param {String} name 	图标名称
 * @param {String} color	图标的十六进制颜色 eg: #ffffff
 * @param {String} icon		图标名称 eg: icon-xxx
 */
class Icon {
	
	_type: number
	_name: string
	_color: string
	_icon: string
	
	constructor({ type, name, color, icon } : 
        { type: number, name: string, color: string, icon: string }){
	    this._type = type
		this._name = name
		this._color = color
		this._icon = icon
	}
}

/**
 * 账单流水
 * @param {String} price    流水的金额
 * @param {Number} date     时间戳
 * @param {String} account  账户
 * @param {String} note     备注
 * @param {Icon}   icon     流水的图标
 */
class Turnover {
	
	_price: string
    _date: number
    _account: string
    _note: string
    _icon: Icon
	
    constructor({ price, date, account, note, icon } : 
        { price: string, date: number, account: string, note: string, icon: Icon }) {
        
        this._price = price
        this._date = date
        this._account = account
        this._note = note
        this._icon = icon
	}
}

/**
 * Credit   信用账户
 * Capital  资金账户
 */
enum AccountType {
    Credit,
    Capital
}

/**
 * 资金账户
 * 
 * Cash     现金
 * AliPay   支付宝
 * WeChat   微信
 * BankCard 银行卡
 */
enum CapitalPayType {
    Cash,
    AliPay,
    WeChat,
    BankCard
}

/**
 * 信用账户
 * 
 * CreditCard   信用卡
 * HuaBei       花呗
 * BaiTiao      白条
 */
enum CreditPayType {
    CreditCard,
    HuaBei,
    BaiTiao
}

/**
 * 资金账户
 * @param {String}          name        账户名
 * @param {CapitalPayType}  type        资金类型
 * @param {String}          balance     余额
 * @param {AccountBook}     accountBook 关联的账本
 */
class CapitalAccount {

    _type: CapitalPayType
    _name: string
    _balance: string
    _accountBook: AccountBook

    constructor({ name, type, balance, accountBook } :
        { name: string, type: CapitalPayType, balance: string, accountBook: AccountBook }) {
        this._name = name
        this._type = type
        this._balance = balance
        this._accountBook = accountBook
    }
}


/**
 * 账本
 * @param {String} name 账本名称
 */
class AccountBook {
    _name: string
    constructor(name: string) {
        this._name = name
    }
}

class User {

    _name: string

    constructor() {

    }
}




/** 账本表
 *
----------------------
id   name
1    默认账本
2    家庭账本
----------------------*/



/**
 * 流水表
 * 默认账本 2020年10月份的流水
----------------------------------------------------------------------
day   name    date      price    note      icon   turnover_type    account
1     餐饮     1004...   1000.00  这是备注    1      2(支出)           1(支付宝)
2     餐饮     1004...   1200.00  这是备注    1      2                2(微信)
2     工资     1004...   1200.00  这是备注    3      1                1
3     餐饮     1004...   1300.00  这是备注    1      2                4
4     餐饮     1004...   6000.00  这是备注    1      2                4
5     餐饮     1004...   200.00   这是备注    1      2                4
6     餐饮     1004...   1000.00  这是备注    1      2                1
-----------------------------------------------------------------------*/



/**
 * Category 表
 *
-----------------------------------------------
id    name   icon       color    turnover_type
1     xxx    icon-xxx   #188AFF  1
2     xxx    icon-xxx   #188AFF  1
3     xxx    icon-xxx   #188AFF  2
4     xxx    icon-xxx   #188AFF  2
5     xxx    icon-xxx   #188AFF  1
6     xxx    icon-xxx   #188AFF  1
7     xxx    icon-xxx   #188AFF  2
------------------------------------------------*/



/* 账户表
 * account_type: 1 资金账户   2 信用账户
type
    1 支付宝
    2 微信
    ...
--------------------------------------------------------
name     type     balance   account_book   account_type
支付      1        2000      1              1
微信      2        2000      1              1
银行      3        2000      1              1
现金      4        2000      1              1
白条      5        2000      1              2
花呗      6        2000      1              2
信用      7        2000      1              2
---------------------------------------------------------*/

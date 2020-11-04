import HTTP from '../utils/http-p.js'

class FeedbackModel extends HTTP {
	sendFeedback(type, content) {
		return this.request({
			url: '/advice',
			data: {
				type,
				content
			},
			method: 'POST',
			header: {
			    "content-type": "application/x-www-form-urlencoded"
			}
		});
	}
	
}

export default FeedbackModel;
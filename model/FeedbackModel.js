import HttpServe from '../utils/HttpServe'

class FeedbackModel extends HttpServe {
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
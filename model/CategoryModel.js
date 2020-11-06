import HTTP from '../utils/http-p.js'

class CategoryModel extends HTTP {
	removeCategory(id) {
		return this.request({
			url: `/category?categoryId=${id}`,
			method: 'DELETE'
		});
	}
}

export default CategoryModel;
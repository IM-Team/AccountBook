import Vue from 'vue'
import App from './App'

import CustomTabbar from 'components/common/CustomTabbar'
import Cell from 'components/common/Cell'

Vue.config.productionTip = false

Vue.component('custom-tabbar', CustomTabbar)
Vue.component('cell', Cell)

App.mpType = 'app'

new Vue({ ...App }).$mount()

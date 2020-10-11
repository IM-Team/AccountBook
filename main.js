import Vue from 'vue'
import App from './App'

import CustomTabbar from 'components/common/CustomTabbar'

Vue.config.productionTip = false

Vue.component('custom-tabbar', CustomTabbar)

App.mpType = 'app'

new Vue({ ...App }).$mount()

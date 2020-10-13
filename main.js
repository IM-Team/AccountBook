import Vue from 'vue'
import App from './App'

import CustomTabbar from 'components/common/CustomTabbar'
import ImCell from 'components/common/ImCell'

Vue.config.productionTip = false

Vue.component('custom-tabbar', CustomTabbar)
Vue.component('im-cell', ImCell)

App.mpType = 'app'

new Vue({ ...App }).$mount()

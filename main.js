import Vue from 'vue'
import App from './App'

import ImCell from 'components/common/ImCell'

Vue.config.productionTip = false

Vue.component('im-cell', ImCell)

App.mpType = 'app'

new Vue({ ...App }).$mount()

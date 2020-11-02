import {
    CATEGORY
} from './mutation-types'

const actions = {
    initCategory({ commit }, data) {
        commit(CATEGORY, data)
    }
}

export default actions

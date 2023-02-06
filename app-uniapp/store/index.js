import { createStore } from 'vuex'

import study from './modules/study'

const store = createStore({
	modules: {
		study
	}
})

export default store
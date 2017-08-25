import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from 'object-path'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },
    resume: {
      config: [
        {field: 'profile', icon: 'id', key: ['name', 'city', 'title', 'birthday']},
        {field: 'workHistory', icon: 'work', key: ['company', 'details']},
        {field: 'education', icon: 'book', key: ['school', 'degree']},
        {field: 'projects', icon: 'heart', key: ['name', 'details']},
        {field: 'awards', icon: 'cup', key: ['name', 'details']},
        {field: 'contacts', icon: 'phone', key: ['contact', 'content']}
      ],
      profile: {},
      workHistory: [],
      education: [],
      projects: [],
      awards: [],
      contacts: []
    }
  },
  mutations: {
    switchTab (state, playload) {
      state.selected = playload
      localStorage.setItem('state', JSON.stringify(state))
    },
    updateResume (state, {path, value}) {
      objectPath.set(state.resume, path, value)
      localStorage.setItem('state', JSON.stringify(state))
    },
    initState (state, playload) {
      Object.assign(state, playload)
    },
    setUser (state, playload) {
      Object.assign(state.user, playload)
      console.log(state.user)
    },
    removeUser (state) {
      state.user.id = null
    }
  }
})

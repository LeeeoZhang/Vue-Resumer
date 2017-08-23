import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: 'profile',
    resume: {
      config: [
        {field: 'profile', icon: 'id'},
        {field: 'workHistory', icon: 'work'},
        {field: 'education', icon: 'book'},
        {field: 'projects', icon: 'heart'},
        {field: 'awards', icon: 'cup'},
        {field: 'contacts', icon: 'phone'}
      ],
      profile: {
        name: '大Leo',
        city: '某城市',
        title: '搬砖工'
      },
      workHistory: [
        {company: 'AL', content: '搬砖吧大概'},
        {company: 'AL', content: `公司总部设在XXXX区，
                                  先后在北京、上海成立分公司。
                                  专注于移动XXX领域，主打产品XXXXX，
                                  它将资讯、报纸、杂志、图片、微信等众多内容，
                                  按照用户意愿聚合到一起，实现深度个性化 定制`}
      ],
      education: [{school: '小学小学', content: '小学'},
                  {school: '小学小学', content: '小学'}],
      projects: [{name: 'project A', content: '文字'}],
      awards: [{name: 'project A', content: '文字'}],
      contacts: [{name: 'project A', content: '文字'}]
    }
  },
  mutations: {
    switchTab (state, playload) {
      state.selected = playload
    },
    changeData (state, playload) {
      state.resume[playload.key] = playload.value
    }
  }
})

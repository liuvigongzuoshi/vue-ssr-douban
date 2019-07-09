import * as types from './mutation-types'

const activityTypes = [
  { value: 'music', text: '音乐' },
  { value: 'drama', text: '戏剧' },
  { value: 'exhibition', text: '展览' },
  { value: 'salon', text: '讲座' },
  { value: 'party', text: '聚会' },
  { value: 'sports', text: '运动' },
  { value: 'travel', text: '旅行' },
  { value: 'commonweal', text: '公益' },
  { value: 'film', text: '电影' }
]

const dayTypes = [
  { value: 'today', text: '今天' },
  { value: 'tomorrow', text: '明天' },
  { value: 'weekend', text: '周末' },
  { value: 'week', text: '最近一周' }
]

export const state = () => ({
  cities: [],
  currentCity: null,
  activityTypes,
  dayTypes
})

export const mutations = {
  [types.SET_CITIES](state, cities) {
    state.cities = cities
  },
  [types.SET_CURRENT_CITY](state, city) {
    state.currentCity = city
  }
}

export const actions = {
  getCities({ commit }, { start = 0, count = 20 }) {
    return this.$axios
      .$get('/v2/loc/list', {
        params: {
          start,
          count
        }
      })
      .then((response) => {
        commit(types.SET_CITIES, response.locs)
        commit(types.SET_CURRENT_CITY, response.locs[0])
      })
  }
}

export default {
  state,
  mutations,
  actions
}

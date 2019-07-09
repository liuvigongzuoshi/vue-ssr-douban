import * as types from './mutation-types'

const movieTimeTypes = [{ value: 'in_theaters', text: '正在热映' }, { value: 'coming_soon', text: '即将上映' }]

const movieTags = [
  '热门',
  '最新',
  '经典',
  '华语',
  '欧美',
  '韩国',
  '日本',
  '动作',
  '喜剧',
  '爱情',
  '科幻',
  '悬疑',
  '恐怖',
  '动画',
  '可播放',
  '豆瓣高分',
  '冷门佳片'
]

export const state = () => ({
  movieTimeTypes,
  currentMovieTimeType: movieTimeTypes[0],
  timeTypeMovies: {},
  currentTimeTypeMovies: [],
  movieTags,
  currentMovieTag: movieTags[0],
  tagMovies: {},
  currentTagMovies: []
})

export const mutations = {
  [types.SET_CURRENT_MOVIE_TIME_TYPE](state, timeType) {
    state.currentMovieTimeType = timeType
  },
  [types.SET_TIME_TYPE_MOVIES](state, movies) {
    state.timeTypeMovies[state.currentMovieTimeType.value] = movies
  },
  [types.SET_CURRENT_TIME_TYPE_MOVIES](state, movies) {
    state.currentTimeTypeMovies = movies
  },
  [types.SET_CURRENT_MOVIE_TAG](state, tag) {
    state.currentMovieTag = tag
  },
  [types.SET_TAG_MOVIES](state, movies) {
    state.tagMovies[state.currentMovieTag] = movies
  },
  [types.SET_CURRENT_TAG_MOVIES](state, movies) {
    state.currentTagMovies = movies
  }
}

export const actions = {
  getTimeTypeMovies({ commit }, { start = 0, count = 10, searchParams = 'in_theaters' }) {
    return this.$axios
      .$get(`/v2/movie/${searchParams}`, {
        params: {
          start,
          count
        }
      })
      .then((response) => {
        commit(types.SET_TIME_TYPE_MOVIES, response.subjects)
        commit(types.SET_CURRENT_TIME_TYPE_MOVIES, response.subjects)
      })
  },
  getCurrentTagMovies({ commit, state }, { start = 0, count = 10 }) {
    return this.$axios
      .$get('/v2/movie/search', {
        params: {
          start,
          count,
          tag: state.currentMovieTag
        }
      })
      .then((response) => {
        commit(types.SET_TAG_MOVIES, response.subjects)
        commit(types.SET_CURRENT_TAG_MOVIES, response.subjects)
      })
  }
}

export default {
  state,
  mutations,
  actions
}

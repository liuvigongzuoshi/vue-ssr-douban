import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const BaseHeader = () => import(/* webpackChunkName: "BaseHeader" */ '@/layouts/BaseHeader.vue')

const BookTag = () => import(/* webpackChunkName: "BookTag" */ '@/pages/book/BookTag.vue')
const BookTagContent = () => import(/* webpackChunkName: "BookTagContent" */ '@/pages/book/BookTagContent.vue')
const BookTagMoreContent = () =>
  import(/* webpackChunkName: "BookTagMoreContent" */ '@/pages/book/BookTagMoreContent.vue')
const BookTypeContent = () => import(/* webpackChunkName: "BookTypeContent" */ '@/pages/book/BookTypeContent.vue')

const MovieTimeTypeContent = () =>
  import(/* webpackChunkName: "MovieTimeTypeContent" */ '@/pages/movie/MovieTimeTypeContent.vue')
const MovieTagContent = () => import(/* webpackChunkName: "MovieTagContent" */ '@/pages/movie/MovieTagContent.vue')
const MovieTag = () => import(/* webpackChunkName: "MovieTag" */ '@/pages/movie/MovieTag.vue')
const MusicTagContent = () => import(/* webpackChunkName: "MusicTagContent" */ '@/pages/music/MusicTagContent.vue')

const CityTag = () => import(/* webpackChunkName: "CityTag" */ '@/pages/city/CityTag.vue')
const CityActivityContent = () =>
  import(/* webpackChunkName: "CityActivityContent" */ '@/pages/city/CityActivityContent')

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/city'
      },
      {
        path: '/book-tag',
        name: 'bookTag',
        components: {
          default: BaseHeader,
          aside: BookTag,
          content: BookTagContent
        }
      },
      {
        path: '/book-tag-more-info',
        name: 'bookTagMoreInfo',
        components: {
          default: BaseHeader,
          aside: BookTag,
          content: BookTagMoreContent
        }
      },
      {
        path: '/book-type',
        name: 'bookType',
        components: {
          default: BaseHeader,
          content: BookTypeContent
        }
      },
      {
        path: '/movie-show-time',
        name: 'movieShowTime',
        components: {
          default: BaseHeader,
          content: MovieTimeTypeContent
        }
      },
      {
        path: '/movie-tag',
        name: 'movieTag',
        components: {
          default: BaseHeader,
          aside: MovieTag,
          content: MovieTagContent
        }
      },
      {
        path: '/music-tag',
        name: 'musicTag',
        components: {
          default: BaseHeader,
          content: MusicTagContent
        }
      },
      {
        path: '/city',
        name: 'city',
        components: {
          default: BaseHeader,
          aside: CityTag,
          content: CityActivityContent
        }
      }
    ]
  })
}

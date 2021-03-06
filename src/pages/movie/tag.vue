<template>
  <div>
    <div class="left-content">
      <div class="content-header">
        <h2>{{ currentMovieTag }}</h2>

        <base-slide
          :page-count="pageCount"
          :current-page="currentPage"
          @change-page="changePage"
          @change-direction="changeDirection"
          class="movie-tag-content-slide"
          background-color="#6D98D2"
        />
      </div>

      <transition-group :name="transitionName" tag="div" class="movie-content">
        <ul
          v-for="(movies, index) in processedMovies"
          v-show="index === currentPage"
          :key="index + 1"
          class="movie-list"
        >
          <li v-for="movie in movies" :key="movie.id">
            <a :href="movie.alt">
              <img :src="movie.images.large" :alt="movie.title" class="movie-image" referrerpolicy="no-referrer" />
            </a>
            <h3 class="link-title">
              <a :href="movie.alt" :title="movie.title">{{ movie.title }}</a>
            </h3>
            <p class="movie-score">
              评分：
              <span>{{ movie.rating.average }}</span>
            </p>
            <p class="movie-year">上映时间：{{ movie.year }}</p>
          </li>
        </ul>
      </transition-group>
    </div>
    <MovieTag />
  </div>
</template>

<script>
import BaseSlide from '@/components/BaseSlide.vue'
import MovieTag from '@/views/MovieTag.vue'

export default {
  layout: 'douban',
  name: 'MovieTagContent',
  components: {
    BaseSlide,
    MovieTag
  },

  data() {
    return {
      currentPage: 0,
      slideDirection: 'right'
    }
  },

  computed: {
    currentMovieTag() {
      return this.$store.state.movie.currentMovieTag
    },
    tagMovies() {
      return this.$store.state.movie.tagMovies
    },
    currentTagMovies() {
      return this.$store.state.movie.currentTagMovies
    },
    processedMovies() {
      // 每个翻滚页显示10部电影
      return this.$myUtils.processedArray(this.currentTagMovies, 10)
    },
    pageCount() {
      // 通过 当前获取的电影总数/10 大致得出页数
      return Math.ceil(this.currentTagMovies.length / 10)
    },
    transitionName() {
      return this.slideDirection === 'right' ? 'move-to-right' : 'move-to-left'
    }
  },

  fetch({ store }) {
    store.commit('CHANGE_CURRENT_MODULE_TYPE', store.state.moduleTypes[1])
    if (!store.state.movie.tagMovies[store.state.movie.currentMovieTag]) {
      // 默认显示20部电影
      return store.dispatch('movie/getCurrentTagMovies', { count: 20 })
    }
  },

  mounted() {},

  methods: {
    changePage(page) {
      this.currentPage = page
    },

    changeDirection(direction) {
      this.slideDirection = direction
    }
  }
}
</script>

<style scoped>
.movie-tag-content-slide {
  float: right;
  margin-top: 5px;
}
.movie-content {
  width: 100%;
  height: 560px;
  position: relative;
  overflow: hidden;
  margin-top: 16px;
}
.movie-list {
  width: 100%;
  height: 100%;
  position: absolute;
}
.movie-list li {
  width: 20%;
  height: 50%;
  display: inline-block;
  overflow: hidden;
  text-align: center;
}
.movie-image {
  width: 115px;
  height: 160px;
}
.link-title {
  margin-top: 6px;
}
.movie-info {
  margin: 5px 0 0;
}
.movie-title {
  color: #37a;
  margin-right: 3px;
}
.movie-year,
.movie-score {
  margin-top: 10px;
}
.movie-score span {
  color: #e09015;
}
</style>

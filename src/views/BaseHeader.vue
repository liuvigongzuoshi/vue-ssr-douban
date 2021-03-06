<template>
  <div :style="{ background: currentModuleType.backgroundColor }" class="outer-content">
    <div class="inner-content">
      <h2 :class="currentModuleType.logo" class="search-logo">
        {{ currentModuleType.text }}
      </h2>

      <div class="search-target">
        <form class="search-form">
          <input
            v-model="keyword"
            :placeholder="currentModuleType.placeholder"
            @blur="onInputBlur()"
            @focus="onInputFocus()"
            type="text"
            class="search-input"
          />
          <input :class="currentModuleType.searchIcon" type="submit" value="搜索" class="search-submit" />
        </form>

        <ul v-show="showSearchSuggest" @mouseenter="onListFocus()" @mouseleave="onListBlur()" class="search-suggest">
          <li v-for="item in searchData" :key="item.id" class="search-item">
            <a :href="item.alt" class="search-item-link">
              <img :src="item.image || item.images.small" class="search-item-image" referrerpolicy="no-referrer" />
              <h3 class="search-item-title">
                {{ item.title }}
              </h3>
              <span v-if="item.pubdate">
                {{ item.pubdate }}
              </span>
              <span v-if="item.year">
                {{ item.year }}
              </span>
              <p v-if="item.author" class="search-item-author">
                {{ item.author | processedAuthor }}
              </p>
              <p v-if="item.genres" class="search-item-genres">
                {{ item.genres.join() }}
              </p>
            </a>
          </li>
        </ul>
      </div>

      <ul class="module-list">
        <li v-for="type in moduleTypes" :key="type.value">
          <span>{{ type.text }}</span>
          <div class="outer-more-module">
            <div class="inner-more-module">
              <nuxt-link
                v-for="subType in type.subTypes"
                :key="subType.path"
                :to="subType.path"
                class="more-module-link"
              >
                {{ subType.text }}
              </nuxt-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseHeader',

  filters: {
    processedAuthor(value) {
      // 根据作者的信息字段
      if (value[0] && value[0].name) {
        let newValue = ''
        for (let i = 0, ii = value.length; i < ii; i++) {
          newValue += value[i].name + ' '
        }
        return newValue
      } else {
        return value.join()
      }
    }
  },

  data() {
    return {
      keyword: '',
      isFocusOnInput: false,
      isFocusOnList: false,
      timer: 0
    }
  },

  computed: {
    moduleTypes() {
      return this.$store.state.moduleTypes
    },
    currentModuleType() {
      return this.$store.state.currentModuleType
    },
    searchData() {
      return this.$store.state.searchData
    },
    showSearchSuggest() {
      // 当在搜索框中输入搜索内容时，会获取搜索结果，搜索结果的显示需满足几个条件：
      // 1、鼠标落在搜索输入框内或者鼠标落在搜索结果显示地容器上；
      // 2、搜索框里有内容
      // 3、返回的搜索结果不能为空
      return (this.isFocusOnInput || this.isFocusOnList) && this.keyword !== '' && this.searchData.length !== 0
    }
  },

  watch: {
    keyword(newValue) {
      // 监听搜索框内文字的变化，根据搜索内容发送搜索请求
      // 设置延时，若用户在200ms内输入不同关键字搜索，会合并成一次请求，以最后一次为准
      if (newValue !== '' && this.currentModuleType.value !== 'city') {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.timer = null
          this.$store.dispatch('getSearchData', { keyword: newValue })
        }, 200)
      }
    },
    $route(newValue) {
      this.keyword = ''
      this.$store.commit('SET_SEARCH_DATA', [])
    }
  },

  mounted() {},

  methods: {
    onInputFocus() {
      this.isFocusOnInput = true
    },

    onInputBlur() {
      this.isFocusOnInput = false
    },

    onListFocus() {
      this.isFocusOnList = true
    },

    onListBlur() {
      this.isFocusOnList = false
    }
  }
}
</script>

<style scoped>
.outer-content {
  width: 100%;
  min-width: 936px;
  margin-bottom: 40px;
  transition: background 0.5s ease-in-out;
}
.inner-content {
  width: 936px;
  margin: 0 auto;
  padding: 10px 0 5px;
}
.search-logo {
  width: 145px;
  height: 56px;
  display: inline-block;
  margin: 0 13px 0 0;
  color: transparent;
  background-position: 0 12px;
  background-repeat: no-repeat;
}
.book-logo {
  background-image: url('~assets/img/book.png');
}
.movie-logo {
  background-image: url('~assets/img/movie.png');
}
.music-logo {
  background-image: url('~assets/img/music.png');
}
.city-logo {
  background-image: url('~assets/img/city.png');
}
.search-target {
  display: inline-block;
}
.search-form {
  position: relative;
  top: 8px;
}
.search-input {
  width: 350px;
  height: 30px;
  border: none;
  padding-left: 10px;
  background: #fff;
  outline: none;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.16);
}
.search-submit {
  width: 37px;
  height: 32px;
  margin: 1px 0 0 -4px;
  vertical-align: middle;
  border: none;
  color: transparent;
  cursor: pointer;
  outline: none;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.16);
  background-repeat: no-repeat;
  background-position: 0 -40px;
}
.book-search-icon {
  background-image: url('~assets/img/book_search_btn.png');
}
.movie-search-icon {
  background-image: url('~assets/img/movie_search_btn.png');
}
.music-search-icon {
  background-image: url('~assets/img/music_search_btn.png');
}
.city-search-icon {
  background-image: url('~assets/img/city_search_btn.png');
}
.search-suggest {
  position: absolute;
  width: 360px;
  z-index: 99;
  margin-top: 6px;
  background: #fff;
  border: 1px solid #ddd;
}
.search-item {
  border-bottom: 1px solid #eee;
  overflow: hidden;
}
.search-item:hover {
  background: #f9f9f9;
}
.search-item-link {
  display: block;
  padding: 6px;
  overflow: hidden;
  zoom: 1;
  color: #999;
}
.search-item-image {
  width: 40px;
  height: 56px;
  float: left;
  margin-right: 8px;
  margin-top: 3px;
}
.search-item-title {
  display: inline-block;
  font-weight: normal;
  color: #369;
  font-size: 13px;
}
.search-item-author,
.search-item-genres {
  margin-top: 10px;
}
.module-list {
  display: inline-block;
  position: relative;
  top: 10px;
  left: 40px;
}
.module-list li {
  display: inline-block;
  margin-left: 25px;
  padding: 2px 5px;
  cursor: pointer;
}
.module-list li:hover {
  background: #37a;
  color: white;
}
.outer-more-module {
  display: none;
  position: absolute;
  margin-left: -40px;
}
.inner-more-module {
  width: 100px;
  margin-top: 10px;
  background: #fff;
  border: 1px solid #e7eaf1;
  box-shadow: 0 5px 20px rgba(0, 34, 77, 0.1);
}
.module-list li:hover .outer-more-module {
  display: block;
}
.inner-more-module::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  margin-top: -10px;
  margin-left: calc(50% - 10px);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
}
.more-module-link {
  display: block;
  padding: 10px;
  text-align: center;
  color: #000;
}
.more-module-link:hover {
  background: #f4f8fb;
}
</style>

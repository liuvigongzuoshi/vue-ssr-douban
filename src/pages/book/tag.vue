<template>
  <div>
    <div class="left-content">
      <div class="content-header">
        <h2>{{ currentBookTag }}</h2>
        <nuxt-link to="/book/more-info" class="common-link">
          更多»
        </nuxt-link>

        <base-slide
          class="book-tag-content-slide"
          :page-count="pageCount"
          :current-page="currentPage"
          background-color="#9b9a8e"
          @change-page="changePage"
          @change-direction="changeDirection"
        />
      </div>

      <transition-group tag="div" class="book-tag-content" :name="transitionName">
        <ul
          v-for="(books, index) in processedBooks"
          v-show="index === currentPage"
          :key="index + 1"
          ref="bookList"
          class="book-tag-content-list"
        >
          <li v-for="(book, i) in books" :key="i">
            <a :href="book.alt" :title="book.title">
              <img
                :src="book.images.large"
                :alt="book.title"
                class="book-tag-content-image"
                referrerpolicy="no-referrer"
                @mouseenter="showBookPrompt(book, i)"
                @mouseleave="hideBookPrompt()"
              />
            </a>
            <h3 class="link-title">
              <a :href="book.alt" :title="book.title">
                {{ book.title }}
              </a>
            </h3>
            <p class="book-tag-content-author">
              {{ book.author.join() }}
            </p>
          </li>
        </ul>
      </transition-group>

      <div v-if="loadPrompt" v-show="showPrompt" class="book-tag-content-prompt" :style="promptStyle">
        <span class="outside-triangle" />
        <span class="inside-triangle" />
        <h3 class="prompt-title">
          {{ currentBookPrompt.title }}
        </h3>
        <p class="prompt-introduce">
          {{ currentBookPrompt.author.join() }} / {{ currentBookPrompt.pubdate }} / {{ currentBookPrompt.publisher }}
        </p>
        <p class="prompt-summary">
          {{ currentBookPrompt.summary | processedSummary(160) }}
        </p>
      </div>
    </div>
    <BookTag />
  </div>
</template>

<script>
import BaseSlide from '@/components/BaseSlide.vue'
import BookTag from '@/views/BookTag.vue'

export default {
  layout: 'douban',

  name: 'BookTagContent',

  components: {
    BaseSlide,
    BookTag
  },

  filters: {
    processedSummary(msg, endIndex) {
      // 截取书本概要内容
      return msg.length >= endIndex ? msg.substring(0, endIndex) + '...' : msg
    }
  },

  data() {
    return {
      currentPage: 0,
      slideDirection: 'right',
      contentPosition: null,
      loadPrompt: false,
      showPrompt: false,
      promptStyle: null,
      currentBookPrompt: null,
      keysword: null
    }
  },

  computed: {
    currentBookTag() {
      return this.$store.state.book.currentBookTag
    },
    currentTagBooks() {
      return this.$store.state.book.currentTagBooks.slice(0, 40)
    },
    processedBooks() {
      return this.$myUtils.processedArray(this.currentTagBooks, 10)
    },
    pageCount() {
      // 默认每页显示十本书，通过 书的总量/10 得出页数
      return Math.ceil(this.currentTagBooks.length / 10)
    },
    transitionName() {
      // 获取翻页的方向
      return this.slideDirection === 'right' ? 'move-to-right' : 'move-to-left'
    }
  },

  fetch({ store }) {
    store.commit('CHANGE_CURRENT_MODULE_TYPE', store.state.moduleTypes[0])
    // 默认加载40本书
    return store.dispatch('book/getCurrentTagBooks', { count: 40 })
  },

  mounted() {},

  methods: {
    changePage(page) {
      this.currentPage = page
    },

    changeDirection(direction) {
      this.slideDirection = direction
    },

    getContentPosition() {
      // 获取书本翻滚页容器的位置信息，在后面鼠标移上显示提示框会用到
      const rect = this.$refs.bookList[0].getBoundingClientRect()
      return {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top
      }
    },

    showBookPrompt(book, index) {
      if (!this.contentPosition) {
        this.contentPosition = this.getContentPosition()
      }
      this.currentBookPrompt = book
      // 鼠标移到书本封面时，会弹出显示框，需要计算显示框的宽、高以及显示框在页面所处的位置
      let { width, height, left, top } = this.contentPosition
      width = width * 0.2
      height = height * 0.5
      top = index < 5 ? top - 10 : top + height - 10
      left = (index % 5) * width + width
      this.promptStyle = {
        top: `${top}px`,
        marginLeft: `${left}px`
      }
      if (!this.loadPrompt) {
        // 借用v-if特性，当this.currentBookPrompt为null时不渲染提示框
        this.loadPrompt = true
      }
      this.showPrompt = true
    },

    hideBookPrompt() {
      this.showPrompt = false
    }
  }
}
</script>

<style scoped>
.common-link {
  margin-left: 10px;
}
.book-tag-content-slide {
  float: right;
  margin-top: 5px;
}
.book-tag-content {
  width: 100%;
  height: 489px;
  position: relative;
  overflow: hidden;
  font-size: 13px;
  margin-top: 16px;
}
.book-tag-content-list {
  width: 100%;
  height: 100%;
  position: absolute;
}
.book-tag-content-list li {
  display: inline-block;
  width: 20%;
  height: 50%;
  text-align: center;
}
.book-tag-content-image {
  width: 85%;
  height: 70%;
}
.book-tag-content-author {
  margin: 0 0 6px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.book-tag-content-prompt {
  width: 330px;
  max-height: 220px;
  position: absolute;
  background: #f9f9f7;
  border: 1px solid #acacac;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
  box-shadow: 0 1px 1px #fdfdfd inset, 0 1px 1px #dcdbd4;
}
.book-tag-content-prompt span {
  position: absolute;
  width: 0;
  height: 0;
  top: 45%;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}
.outside-triangle {
  border-right: 8px solid #acacac;
  left: -8px;
}
.inside-triangle {
  border-right: 8px solid #f9f9f7;
  left: -7px;
}
.prompt-title {
  font-size: 14px;
  margin-bottom: 6px;
  color: #666;
}
.prompt-introduce {
  font-size: 12px;
  margin-bottom: 6px;
}
.prompt-summary {
  max-height: 130px;
  font-size: 12px;
  line-height: 1.6;
}
</style>

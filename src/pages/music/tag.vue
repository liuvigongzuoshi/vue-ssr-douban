<template>
  <div class="music-tag-content">
    <div class="music-tags">
      <ul>
        <li v-for="(tag, index) in musicTags" :key="index" class="music-tag-item">
          <a
            :class="{ active: tag === currentMusicTag, 'not-active': tag !== currentMusicTag }"
            @click="changeMusicTag(tag)"
            href="javascript: void(0)"
          >
            {{ tag }}
          </a>
        </li>
      </ul>
    </div>

    <div class="music-list">
      <ul>
        <li v-for="music in currentTagMusics" :key="music.id" class="music-item">
          <div class="cover">
            <a href="javascript: void(0)">
              <img :src="music.image" class="music-image" referrerpolicy="no-referrer" />
            </a>
            <a :href="music.alt" class="image-hover">
              <p v-for="(song, index) in getSongArray(music.attrs.tracks[0])" :key="index">
                {{ song }}
              </p>
            </a>
            <span class="outer-play-btn">
              <i class="inner-play-btn" />
            </span>
          </div>
          <p class="music-singer">
            {{ music.attrs.singer.join() }}
          </p>
          <p class="music-title">
            <a :href="music.alt" :title="music.title" class="music-title-link">
              {{ music.title }}
            </a>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'douban',

  name: 'MusicTagContent',

  computed: {
    musicTags() {
      return this.$store.state.music.musicTags
    },
    currentMusicTag() {
      return this.$store.state.music.currentMusicTag
    },
    tagMusics() {
      return this.$store.state.music.tagMusics
    },
    currentTagMusics() {
      return this.$store.state.music.currentTagMusics
    }
  },

  fetch({ store }) {
    store.commit('CHANGE_CURRENT_MODULE_TYPE', store.state.moduleTypes[2])
    if (store.state.music.currentTagMusics.length === 0) {
      // 默认加载24张专辑
      return store.dispatch('music/getCurrentTagMusics', { count: 24 })
    }
  },

  mounted() {},

  methods: {
    changeMusicTag(tag) {
      this.$store.commit('music/SET_CURRENT_MUSIC_TAG', tag)
      if (!this.tagMusics[tag]) {
        this.$store.dispatch('music/getCurrentTagMusics', { count: 24 })
      } else {
        this.$store.commit('music/SET_CURRENT_TAG_MUSICS', this.tagMusics[tag])
      }
    },

    getSongArray(songs) {
      // 每张专辑只显示前4首歌
      const songArray = songs.split('\n').map((song) => {
        // 截取掉每首歌前面的排序
        return song.slice(3)
      })
      return songArray.slice(0, 4)
    }
  }
}
</script>

<style scoped>
.music-tag-content {
  width: 100%;
  margin-bottom: 60px;
}
.music-tags {
  border-bottom: 2px solid #02a682;
}
.music-tag-item {
  display: inline-block;
  margin-bottom: 5px;
  vertical-align: middle;
}
.music-tag-item::before {
  content: ' | ';
  color: #222;
  padding: 0 3px;
}
.music-tag-item:first-child::before {
  content: ' ';
}
.active {
  color: #138a64;
  font-weight: bolder;
}
.not-active {
  color: #999;
  vertical-align: middle;
}
.not-active:hover {
  color: #138a64;
  text-decoration: underline;
}
.music-list {
  text-align: center;
  background: #f5f7f8;
  padding: 15px 0 15px 20px;
}
.music-item {
  display: inline-block;
  width: 130px;
  margin-right: 20px;
}
.cover {
  position: relative;
  width: 125px;
  height: 125px;
  overflow: hidden;
  background: #fff;
  border: 5px solid #fff;
  box-shadow: 0 0 0 1px #dfdcdc;
  margin-bottom: 10px;
}
.music-image {
  width: 125px;
  height: 125px;
}
.image-hover {
  width: 100%;
  height: 100%;
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  background: #333;
  opacity: 0.85;
  cursor: pointer;
  padding: 14px;
  color: white;
  overflow: hidden;
  box-sizing: border-box;
  text-align: left;
}
.image-hover p {
  margin: 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cover:hover .image-hover {
  display: block;
}
.outer-play-btn {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #222;
  border-radius: 100%;
  right: 10px;
  bottom: 10px;
}
.cover:hover .outer-play-btn {
  background: #fff;
  opacity: 1;
}
.inner-play-btn {
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 7px;
  border-color: transparent transparent transparent #fff;
  margin: 5px 0 0 4px;
  opacity: 0.95;
}
.cover:hover .inner-play-btn {
  border-color: transparent transparent transparent #000;
}
.music-singer,
.music-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 6px;
  color: #999;
}
.music-title-link {
  color: #138a64;
  font-size: 14px;
}
.music-title-link:hover {
  color: #fff;
  background-color: #138a64;
}
</style>

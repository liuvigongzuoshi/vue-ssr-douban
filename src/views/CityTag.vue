<template>
  <aside class="aside-content">
    <h2 class="content-header">
      城市列表
    </h2>
    <ul>
      <li
        v-for="(city, index) in cities"
        :key="index"
        :class="{ active: city === currentCity }"
        @click="changeCurrentCity(city)"
        class="aside-item"
      >
        {{ city.name }}
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'CityTag',

  computed: {
    cities() {
      return this.$store.state.city.cities
    },
    currentCity() {
      return this.$store.state.city.currentCity
    }
  },

  mounted() {},

  methods: {
    changeCurrentCity(city) {
      this.$store.commit('city/SET_CURRENT_CITY', city)
    }
  }
}
</script>

<style scoped>
.aside-item:hover {
  background: #f6f5f2;
}
.active {
  background: #f6f5f2;
}
</style>

<template>
  <div>
    <div class="left-content">
      <city-events-item
        v-for="(activityType, index) in activityTypes"
        :key="index"
        :activity-type="activityType"
        :day-types="dayTypes"
      />
    </div>
    <CityTag />
  </div>
</template>

<script>
import CityEventsItem from '@/views/CityEventsItem.vue'
import CityTag from '@/views/CityTag.vue'

export default {
  layout: 'douban',
  name: 'CityEventsContent',
  components: {
    CityEventsItem,
    CityTag
  },

  computed: {
    activityTypes() {
      return this.$store.state.city.activityTypes
    },
    dayTypes() {
      return this.$store.state.city.dayTypes
    }
  }
}
</script>

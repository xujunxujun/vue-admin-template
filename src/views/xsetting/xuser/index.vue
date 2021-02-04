<template>
  <div class="user-container">
    <h1>User</h1>
    <h1>{{ phone }}</h1>
    <h1> {{ cachedViews }}</h1>

  </div>
</template>
<style scoped>

</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'User',
  computed: {
    ...mapGetters([

      'name',
      'phone',
      'cachedViews'
    ])
  },
  watch: {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.user {
  &-container {
    margin: 10px;
  }

}
</style>

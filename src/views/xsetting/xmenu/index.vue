<template>
  <div class="menu-container">
    <h1>Menu</h1>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Menu',
  computed: {
    ...mapGetters([

      'name'
    ])
  },
  watch: {

  },

  methods: {

  }
}
</script>
<style lang="scss" scoped>
.menu {
  &-container {
    margin: 10px;
  }
}
</style>

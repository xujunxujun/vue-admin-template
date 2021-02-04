<template>
  <div class="department-container">
    <h1>Department</h1>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Department',
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
.department {
  &-container {
    margin: 10px;
  }
}
</style>

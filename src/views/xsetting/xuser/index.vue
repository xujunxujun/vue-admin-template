<template>
  <div class="user-container">
    <label>User</label>
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
.user {
  &-container {
    margin: 10px;
  }

}
</style>

<template>
  <div class="user-container">121211</div>
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
  }
}
</script>

<style lang="scss" scoped>
.user {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

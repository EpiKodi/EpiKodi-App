<template>
  <v-container class="my-container" fill-height fluid>
    <nuxt />
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
}
</script>

<style>
body {
  margin: 0 !important;
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica, Arial,
    sans-serif;
  color: #dfdfdf !important;
  background-color: #242424;
}

.my-container {
  min-height: 997px;
  align-items: inherit !important;
  padding: 0;
}
</style>

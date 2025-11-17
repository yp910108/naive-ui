<script lang="ts">
import { defineComponent } from 'vue'
import Site from './Site.vue'
import { siteSetup } from './store'

export default defineComponent({
  name: 'SiteProvider',
  components: {
    Site,
  },
  setup() {
    return siteSetup()
  },
})
</script>

<template>
  <component :is="configProvider">
    <Site />
  </component>
</template>

import { NConfigProvider } from 'naive-ui'
import { computed } from 'vue'

const configProviderRef = computed(() => NConfigProvider)

export function siteSetup() {
  return {
    configProvider: configProviderRef,
  }
}

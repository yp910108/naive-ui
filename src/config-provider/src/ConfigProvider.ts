import { defineComponent } from 'vue'

export const configProviderProps = {} as const

export default defineComponent({
  name: 'ConfigProvider',
  alias: ['App'],
  props: configProviderProps,
  render() {
    return this.$slots.default?.()
  },
})

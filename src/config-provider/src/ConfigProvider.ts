import type { ComputedRef, PropType } from 'vue'
import type { GlobalTheme, GlobalThemeOverrides } from './interface'
import type { RtlEnabledState, RtlProp } from './internal-interface'
import { hash } from 'css-render'
import { merge } from 'lodash-es'
import { useMemo } from 'vooks'
import { computed, defineComponent, inject, markRaw, provide } from 'vue'
import { defaultClsPrefix } from '../../_mixins'
import { configProviderInjectionKey } from './context'

export const configProviderProps = {
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  clsPrefix: String,
  rtl: Array as PropType<RtlProp>,
  theme: Object as PropType<GlobalTheme | null>,
  themeOverrides: Object as PropType<GlobalThemeOverrides | null>,
  preflightStyleDisabled: Boolean,
  styleMountTarget: Object as PropType<ParentNode | null>,
  inlineThemeDisabled: {
    type: Boolean,
    default: undefined,
  },
} as const

export default defineComponent({
  name: 'ConfigProvider',
  alias: ['App'],
  props: configProviderProps,
  setup(props) {
    const NConfigProvider = inject(configProviderInjectionKey, null)
    const mergedThemeRef = computed(() => {
      const { theme } = props
      if (theme === null)
        return undefined
      const inheritedTheme = NConfigProvider?.mergedThemeRef.value
      return theme === undefined
        ? inheritedTheme
        : inheritedTheme === undefined
          ? theme
          : Object.assign({}, inheritedTheme, theme)
    })
    const mergedThemeOverridesRef = computed(() => {
      const { themeOverrides } = props
      // stop inheriting themeOverrides
      if (themeOverrides === null)
        return undefined
      // use inherited themeOverrides
      if (themeOverrides === undefined) {
        return NConfigProvider?.mergedThemeOverridesRef.value
      }
      else {
        const inheritedThemeOverrides
          = NConfigProvider?.mergedThemeOverridesRef.value
        if (inheritedThemeOverrides === undefined) {
          // no inherited, use self overrides
          return themeOverrides
        }
        else {
          // merge overrides
          return merge({}, inheritedThemeOverrides, themeOverrides)
        }
      }
    })
    const mergedBorderedRef = useMemo(() => {
      const { bordered } = props
      return bordered === undefined
        ? NConfigProvider?.mergedBorderedRef.value
        : bordered
    })
    const mergedClsPrefixRef = computed(() => {
      const { clsPrefix } = props
      if (clsPrefix !== undefined)
        return clsPrefix
      if (NConfigProvider)
        return NConfigProvider.mergedClsPrefixRef.value
      return defaultClsPrefix
    })
    const mergedRtlRef: ComputedRef<RtlEnabledState | undefined> = computed(
      () => {
        const { rtl } = props
        if (rtl === undefined) {
          return NConfigProvider?.mergedRtlRef.value
        }
        const rtlEnabledState: RtlEnabledState = {}
        for (const rtlInfo of rtl) {
          rtlEnabledState[rtlInfo.name] = markRaw(rtlInfo)
          rtlInfo.peers?.forEach((peerRtlInfo) => {
            if (!(peerRtlInfo.name in rtlEnabledState)) {
              rtlEnabledState[peerRtlInfo.name] = markRaw(peerRtlInfo)
            }
          })
        }
        return rtlEnabledState
      },
    )
    const inlineThemeDisabled
      = props.inlineThemeDisabled || NConfigProvider?.inlineThemeDisabled
    const preflightStyleDisabled
      = props.preflightStyleDisabled || NConfigProvider?.preflightStyleDisabled
    const styleMountTarget
      = props.styleMountTarget || NConfigProvider?.styleMountTarget
    const mergedThemeHashRef = computed(() => {
      const { value: theme } = mergedThemeRef
      const { value: mergedThemeOverrides } = mergedThemeOverridesRef
      const hasThemeOverrides
        = mergedThemeOverrides && Object.keys(mergedThemeOverrides).length !== 0
      const themeName = theme?.name
      if (themeName) {
        if (hasThemeOverrides) {
          return `${themeName}-${hash(
            JSON.stringify(mergedThemeOverridesRef.value),
          )}`
        }
        return themeName
      }
      else {
        if (hasThemeOverrides) {
          return hash(JSON.stringify(mergedThemeOverridesRef.value))
        }
        return ''
      }
    })
    provide(configProviderInjectionKey, {
      mergedThemeHashRef,
      mergedRtlRef,
      mergedBorderedRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      mergedThemeOverridesRef,
      inlineThemeDisabled: inlineThemeDisabled || false,
      preflightStyleDisabled: preflightStyleDisabled || false,
      styleMountTarget,
    })
  },
  render() {
    return this.$slots.default?.()
  },
})

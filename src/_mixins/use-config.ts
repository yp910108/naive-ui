import type { ComputedRef, Ref } from 'vue'
import type { RtlEnabledState } from '../config-provider/src/internal-interface'
import { computed, inject, shallowRef } from 'vue'
import { configProviderInjectionKey } from '../config-provider/src/context'

type UseConfigProps = Readonly<{
  bordered?: boolean
  [key: string]: unknown
}>

export const defaultClsPrefix = 'n'

export default function useConfig(
  props: UseConfigProps = {},
  options: {
    defaultBordered?: boolean
  } = {
    defaultBordered: true,
  },
): {
  inlineThemeDisabled: boolean | undefined
  mergedRtlRef: Ref<RtlEnabledState | undefined> | undefined
  mergedBorderedRef: ComputedRef<boolean>
  mergedClsPrefixRef: Ref<string>
} {
  const NConfigProvider = inject(configProviderInjectionKey, null)
  return {
    inlineThemeDisabled: NConfigProvider?.inlineThemeDisabled,
    mergedRtlRef: NConfigProvider?.mergedRtlRef,
    mergedBorderedRef: computed(() => {
      const { bordered } = props
      if (bordered !== undefined)
        return bordered
      return (
        NConfigProvider?.mergedBorderedRef.value
        ?? options.defaultBordered
        ?? true
      )
    }),
    mergedClsPrefixRef: NConfigProvider ? NConfigProvider.mergedClsPrefixRef : shallowRef(defaultClsPrefix),
  }
}

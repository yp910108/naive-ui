import type { CNode } from 'css-render'
import type { Ref } from 'vue'
import type { ButtonTheme } from '../../button/styles'

export interface GlobalThemeWithoutCommon {
  Button?: ButtonTheme
}

export interface RtlItem {
  name: keyof GlobalThemeWithoutCommon
  style: CNode
  peers?: RtlItem[]
}

export type RtlEnabledState = Partial<
  Record<keyof GlobalThemeWithoutCommon, RtlItem>
>

export interface ConfigProviderInjection {
  mergedClsPrefixRef: Ref<string>
  mergedBorderedRef: Ref<boolean | undefined>
  mergedRtlRef: Ref<RtlEnabledState | undefined>
  mergedThemeHashRef: Ref<string>
  // non-reactive
  inlineThemeDisabled: boolean
  styleMountTarget: ParentNode | undefined
}

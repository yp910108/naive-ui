import type { CNode } from 'css-render'
import type { Ref } from 'vue'
import type { ButtonTheme } from '../../button/styles'
import type { GlobalTheme, GlobalThemeOverrides } from './interface'

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
  mergedThemeRef: Ref<GlobalTheme | undefined>
  mergedThemeOverridesRef: Ref<GlobalThemeOverrides | undefined>
  mergedRtlRef: Ref<RtlEnabledState | undefined>
  mergedThemeHashRef: Ref<string>
  // non-reactive
  inlineThemeDisabled: boolean
  preflightStyleDisabled: boolean
  styleMountTarget: ParentNode | undefined
}

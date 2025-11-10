import type { PropType } from 'vue'
import type { ThemeCommonVars } from '../_styles/common'

export interface Theme<N, T = Record<string, unknown>, R = any> {
  name: N
  common?: ThemeCommonVars
  peers?: R
  self?: (vars: ThemeCommonVars) => T
}

export interface ThemeProps<T> {
  theme: PropType<T>
  themeOverrides: PropType<ExtractThemeOverrides<T>>
  builtinThemeOverrides: PropType<ExtractThemeOverrides<T>>
}

export type ExtractThemeVars<T>
  = T extends Theme<unknown, infer U, unknown>
    ? unknown extends U // self is undefined, ThemeVars is unknown
      ? Record<string, unknown>
      : U
    : Record<string, unknown>

export type ExtractPeerOverrides<T>
  = T extends Theme<unknown, unknown, infer V>
    ? {
        peers?: {
          [k in keyof V]?: ExtractThemeOverrides<V[k]>
        }
      }
    : T

export type ExtractThemeOverrides<T> = Partial<ExtractThemeVars<T>>
  & ExtractPeerOverrides<T> & { common?: Partial<ThemeCommonVars> }

function useTheme() {}

useTheme.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object,
} as const

export default useTheme

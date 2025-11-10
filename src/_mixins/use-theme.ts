import type { ThemeCommonVars } from '../_styles/common'

export interface Theme<N, T = Record<string, unknown>, R = any> {
  name: N
  common?: ThemeCommonVars
  peers?: R
  self?: (vars: ThemeCommonVars) => T
}

function useTheme() {}

useTheme.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object,
} as const

export default useTheme

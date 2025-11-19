import type { ExtractThemeOverrides } from '../../_mixins/use-theme'
import type { ThemeCommonVars } from '../../_styles/common'
import type { GlobalThemeWithoutCommon } from './internal-interface'

export interface CustomThemeCommonVars {}

export interface GlobalTheme extends GlobalThemeWithoutCommon {
  name: string
  common?: ThemeCommonVars
}

export type GlobalThemeOverrides = {
  common?: Partial<ThemeCommonVars & CustomThemeCommonVars>
} & {
  [key in keyof GlobalThemeWithoutCommon]?: ExtractThemeOverrides<
    GlobalThemeWithoutCommon[key]
  >
}

import type { PropType, VNodeChild } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { MaybeArray } from '../../_utils'
import type { ButtonTheme } from '../styles'
import type { Size, Type } from './interface'
import { defineComponent, h, ref, watchEffect } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import { warnOnce } from '../../_utils'
import { isSafari } from '../../_utils/env/browser'

export const buttonProps = {
  ...(useTheme.props as ThemeProps<ButtonTheme>),
  color: String,
  textColor: String,
  text: Boolean,
  block: Boolean,
  loading: Boolean,
  disabled: Boolean,
  circle: Boolean,
  size: String as PropType<Size>,
  ghost: Boolean,
  round: Boolean,
  secondary: Boolean,
  tertiary: Boolean,
  quaternary: Boolean,
  strong: Boolean,
  focusable: {
    type: Boolean,
    default: true,
  },
  keyboard: {
    type: Boolean,
    default: true,
  },
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'button',
  },
  type: {
    type: String as PropType<Type>,
    default: 'default',
  },
  dashed: Boolean,
  renderIcon: Function as PropType<() => VNodeChild>,
  iconPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: 'left',
  },
  attrType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  onClick: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  nativeFocusBehavior: {
    type: Boolean,
    default: !isSafari,
  },
}

const Button = defineComponent({
  name: 'Button',
  props: buttonProps,
  setup(props) {
    if (__DEV__) {
      watchEffect(() => {
        const { dashed, ghost, text, secondary, tertiary, quaternary } = props
        if (
          (dashed || ghost || text)
          && (secondary || tertiary || quaternary)) {
          warnOnce('button', '`dashed`, `ghost` and `text` props can\'t be used along with `secondary`, `tertiary` and `quaternary` props.')
        }
      })
      const selfElRef = ref<HTMLElement | null>(null)
      const { inlineThemeDisabled, mergedClsPrefixRef, mergedRtlRef }
        = useConfig(props)

      return { selfElRef }
    }
  },
  render() {
    const { tag: Component } = this
    return <Component ref="selfElRef">this is button.</Component>
  },
})

export default Button

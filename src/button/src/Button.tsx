import type { PropType, VNodeChild } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { MaybeArray } from '../../_utils'
import type { ButtonTheme } from '../styles'
import type { Size, Type } from './interface'
import { defineComponent, h } from 'vue'
import { useTheme } from '../../_mixins'
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
  setup() {

  },
  render() {
    return <div>this is button.</div>
  },
})

export default Button

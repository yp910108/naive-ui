import { defineComponent, h } from 'vue'
import { useTheme } from '../../_mixins'

export const buttonProps = {
  ...useTheme.props,
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

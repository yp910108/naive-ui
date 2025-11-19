import { plugin as BemPlugin } from '@css-render/plugin-bem'
import { CssRender } from 'css-render'

const namespace = 'n'
const prefix = `.${namespace}-`
const elementPrefix = '__'
const modifierPrefix = '--'

const cssr = CssRender()
const { c } = cssr
const plugin = BemPlugin({
  blockPrefix: prefix,
  elementPrefix,
  modifierPrefix,
})
cssr.use(plugin)
const { cB, cE, cM, cNotM } = plugin

function createKey<P extends string, S extends string>(
  prefix: P,
  suffix: S,
): S extends 'default' ? P : `${P}${Capitalize<S>}` {
  return (prefix
    + (suffix === 'default'
      ? ''
      : suffix.replace(/^[a-z]/, startChar =>
          startChar.toUpperCase()))) as any
}

export { c, cB, cE, cM, cNotM, createKey }

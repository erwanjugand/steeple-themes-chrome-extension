/** @type {import('stylelint').Config} */
// oxlint-disable-next-line no-anonymous-default-export
export default {
  extends: ['stylelint-config-recess-order', 'stylelint-config-standard-scss'],
  plugins: ['stylelint-plugin-use-baseline'],
  rules: {
    'plugin/use-baseline': [true, { available: 'newly' }],
  },
}

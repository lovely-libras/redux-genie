module.exports = (modelNames) => {
  return (
`import { combineReducers } from 'redux'
${modelNames.map(model => {
  return `import ${model}_state from './${model}/${model}_reducer'`
}).join('\n')}\n
export default combineReducers({
${modelNames.map(model => ` ${model}_state,`).join('\n')}
})`
  )
}
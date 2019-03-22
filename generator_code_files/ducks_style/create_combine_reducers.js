module.exports = (modelNames) => {
  return (
`import { combineReducers } from 'redux'
${modelNames.map(model => {
  return `import ${model}_state from './${model}/reducer_for_${model}'`
}).join('\n')}\n
export default combineReducers({
${modelNames.map(model => ` ${model}_state,`).join('\n')}
})`
  )
}
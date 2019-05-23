const fs = require('fs');
const parser = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require("@babel/types");
const prettier = require('prettier');
const chalk = require('chalk')

module.exports = (componentFile, componentName, models, stateObject) => {

  // note: theres an annotated version in this folder

  let file = fs.readFileSync(componentFile).toString();

  let directory = componentFile.slice(0, componentFile.lastIndexOf('/') + 1)

  fs.writeFile(`${directory}unconnected_${componentName}.js`, file, (err) => {
    if (err) throw new Error(err)
  });

  if(file.includes('export default')){

    const exportText = file.indexOf('export default')
    file = file.slice(0, exportText)
                .concat(file.slice(exportText+14))
                  .concat('export default ' + componentName)
  }
  else{

    throw 'No export statement detected in' + componentFile
  }

  const fileAST = parser(file, {sourceType: 'module', plugins: ['jsx']});

  let componentNode

  let componentType

  traverse(fileAST, {
    FunctionDeclaration(path){

      if(path.node.id.name === componentName){
        componentNode = path.node
        componentType = 'function'
      }
    },
    ClassDeclaration(path){

      if(path.node.id.name === componentName){
        componentNode = path.node
        componentType = 'class'
      }
    }
  })
 
  let Structure

  try {
  
    Structure = JSON.parse(fs.readFileSync("./.lamp-lock.json", "utf8")).Structure
    
  } catch (err) {

    console.error(chalk.red('.lamp-lock.json not found- please make connect call inside root project directory'))
  }

  if(typeof models === 'string') models = [ models ]

  let mapStateItems = ''
  let mapStateParams = ''

  models.forEach(model => {

    let reducerFilePath = Structure === 'Ducks' ? `./store/${model}/reducer_for_${model}.js` : 
                        `./store/reducers/reducer_for_${model}.js`

    let file = fs.readFileSync(reducerFilePath).toString();

    const fileAST = parser(file, {sourceType: 'module', plugins: ['jsx']});

    let stateNode

    traverse(fileAST, {
      
      VariableDeclaration(path){
        if(path.node.declarations[0].id.name === 'initialState' || path.node.declarations[0].id.name === stateObject){
          stateNode = path.node
        }
      }
    })

    if(!stateNode){
      console.error(chalk.red('No domain object found for ' + 
        model + 
        '.\nThe state object in the Redux store must be named "initialState", or you can specify the name by appending -s <State Object Name> to the connect call.' 
        + '\nIf your state object names are inconsistent across multiple models/domains, this method wont work.'))
    }

    let thisModelProps = ''

    stateNode.declarations[0].init.properties.forEach((prop, i, arr)=>{

      thisModelProps += ` ${prop.key.name} : ${model}_state.${prop.key.name},`
    })

    mapStateItems += thisModelProps
    mapStateParams += `${model}_state, `
  })

  mapStateItems = "{" + mapStateItems + "}"

  let mapStateFunction = `const mapStateToProps = ({ ${mapStateParams.slice(0, -2)} }) =>{
      return ${mapStateItems}
     }`

  let importStatements = []

  let actions = []

  models.forEach(model => {

    let actionFilePath = Structure === 'Ducks' ? `./store/${model}/actions_for_${model}.js` : 
                        `./store/actions/actions_for_${model}.js`

    let file = fs.readFileSync(actionFilePath).toString();

    const fileAST = parser(file, {sourceType: 'module', plugins: ['jsx']});

    let theseActions = []

    traverse(fileAST, {
      ExportDefaultDeclaration(path){

        path.node.declaration.properties.forEach(prop=>{
          
          theseActions.push(prop.key.name)
          actions.push(prop.key.name)
        })
      }
    })

    let relativeFilePath = componentFile.replace(/[^/]/g, "").replace(/[/]/gi, '../')
    importStatements.push(`import { ${theseActions.join(' , ')} } from "${relativeFilePath + actionFilePath.slice(2)}"`)
  })

  const mapDispatchFunction = `const mapDispatchToProps = dispatch => ({
      ${actions.reduce((a,c)=>{

        a += `${c}: () => dispatch( ${c}() ),\n`
        return a
      }, '') }
      
    });`

  let theCode = fileAST.program.body

  importStatements.forEach(importStatement => {

    theCode.unshift(parser(importStatement, {sourceType: 'module'} ))
  })

  theCode.splice(theCode.length- 1, 0, parser(mapStateFunction, {sourceType: 'module'}))

  theCode.splice(theCode.length-1, 0, parser(mapDispatchFunction, {sourceType: 'module'}))

  theCode.unshift(parser(`import { connect } from "react-redux"`, {sourceType: 'module'}))
  
  let theExport

  traverse(fileAST, {
    ExportDefaultDeclaration(path) {
      theExport = path
    },
  })

  theExport.replaceWith(parser(`export default connect(mapStateToProps, mapDispatchToProps)(${componentName})`, {sourceType: 'module'}));

  const newCode = generate(fileAST).code;

  const prettifiedCode = prettier.format(newCode, { parser: 'babel' })

  console.log(require('chalk').yellow('\nGenerated Connected React Component for ' + componentName + '.\nAn unconnected version has been saved in the same directory for reference.\n'))

  let providerCode = `You will also need to wrap your root component in the Provider wrapper. Here's the code for that:
  import { Provider } from 'react-redux' 
  import store from '.../../path/to/store'
  ...
  <Provider store={store}>
    <App />
  </Provider>
  `
  console.log(require('chalk').red(providerCode))

  fs.writeFile(componentFile, prettifiedCode, (err) => {
    if (err) throw new Error(err)
  });
}
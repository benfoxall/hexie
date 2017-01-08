import UI from './ui.js'

const Hex = (buffer) => {

  const cols = 16
  const rows = buffer.byteLength / cols

  const ui = UI(rows, cols)

  
  //console.time('build')
  const view = new DataView(buffer)
  //console.timeEnd('build')

  //console.time('render')
  ui(view)
  //console.timeEnd('render')

}


export default Hex

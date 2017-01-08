import UI from './ui.js'

const Hex = (buffer) => {

  const cols = 16
  const rows = buffer.byteLength / cols

  const ui = UI(rows, cols)

  // render
  const view = new DataView(buffer)
  ui(view)

}


export default Hex

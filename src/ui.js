const padZero = (str, i) => {
  while(str.length < i)
    str = `0${str}`

  return str
}


const UI = (rows, cols) => {

  const root = document.createElement('aside')

  const number_root = document.createElement('section')
  const hex_root    = document.createElement('section')
  const text_root   = document.createElement('section')

  root.appendChild(number_root)
  root.appendChild(hex_root)
  root.appendChild(text_root)

  for(let i = 0; i < rows; i++) {
    const number = document.createElement('div')
    number.innerText = i

    const hexes = document.createElement('div')
    const texts = document.createElement('div')

    for(let j = 0; j < cols; j++) {

      const hex  = document.createElement('span')
      const text = document.createElement('span')

      hex.innerText = '__'
      text.innerText = '.'

      hexes.appendChild(hex)
      texts.appendChild(text)

    }

    number_root.appendChild(number)
    hex_root.appendChild(hexes)
    text_root.appendChild(texts)

  }

  document.body.appendChild(root)

  // display data to this
  return function(view) {

    let idx, j, value

    for (let i = 0; i < rows; i++) {
      // populate number
      number_root.children[i].innerText =  padZero((i*cols).toString(16), 5)

      for(j = 0; j < cols; j++) {

        idx = i * cols + j

        if(idx >= view.byteLength) {
          hex_root.children[i].children[j].innerText = '__'
          text_root.children[i].children[j].innerText = '_'


        } else {
          value = view.getUint8(i * cols + j)

          // populate hex
          hex_root.children[i].children[j].innerText =
            padZero(value.toString(16), 2)

          // populate text
          text_root.children[i].children[j].innerText =
            String.fromCharCode(value)


        }

      }

    }

  }

}

export default UI

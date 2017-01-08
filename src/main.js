const padZero = (str, i) => {
  while(str.length < i)
    str = `0${str}`

  return str
}

const norm = str => {
  switch (str) {
  case '\t':
    return '.'
  case '\n':
    return '.'
  case ' ':
    return '.'
  default:
    return str
  }
}


class Hex {

  constructor (buffer) {
    this.buffer = buffer
    this.view = new DataView(buffer)

    this.element = document.createElement('p')
    this.element.style.fontFamily = 'monospace'
    document.body.appendChild(this.element)
  }

  render() {
    const items = this.buffer.byteLength

    const rowSize = 16

    var rows = Math.ceil(items/rowSize)


    let rowText = ''

    for (let i = 0; i < rows; i++) {
      rowText += padZero((i*rowSize).toString(16), 5) + '\n'
    }

    document.querySelector('#addr').innerText = rowText

    let hexText = ''

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rowSize; j++) {
        try {
          hexText +=
            padZero(
              this.view.getUint8(i*rowSize + j)
              .toString(16), 2
            ) + ' '
        } catch (e) {
          hexText += '-- '
        }
      }

      hexText += '\n'
    }

    document.querySelector('#hex').innerText = hexText


    let textText = ''

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rowSize; j++) {
        try {
          textText += norm(String.fromCharCode(this.view.getUint8(i*16 + j)))
        } catch (e) {
          textText += ' '
        }
      }

      textText += '\n'
    }

    document.querySelector('#text').innerText = textText

    return this
  }

}

export default Hex

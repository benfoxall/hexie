const padZero = (str, i) => {
  while(str.length < i)
    str = `0${str}`

  return str
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

    this.element.textContent = ''

    for (var i = 0; i < items; i++) {
      this.element.textContent += padZero(this.view.getUint8(i).toString(16), 2) + ' '
    }

    this.textContent += '    \n'
    for (var i = 0; i < items; i++) {
      this.element.textContent += String.fromCharCode(this.view.getUint8(i))
    }

    return this
  }

}

export default Hex

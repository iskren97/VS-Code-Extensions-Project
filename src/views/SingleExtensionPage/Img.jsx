import React from 'react'

function Img(src) {
  const info = Object.keys(src)

  const url = info[3] + '//' + info[4] + '.' + info[5] + '.' + info[6] + '/' + info[7] + '/' + info[8] + '/' + info[9] + '/' + info[10] + '/' + info[11] + '.' + info[12]

  return (
    <img src={typeof src.src !== 'string' ? url : src.src} width={src.width} height={src.height} alt="Extension logo" />
  )
}

export default Img
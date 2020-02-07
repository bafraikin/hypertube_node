function time(): string {
  let iso = new Date().toISOString()

  let day = iso.replace(/-/g, '/').substring(0, iso.indexOf('T'))
  let time = iso.substring(iso.indexOf('T') + 1, iso.length - 5)

  return `${day} ${time}`
}

export default {
  info: (msg: any) => {
    console.info(`[${time()}] [INFO] ${decodeURI(msg)}`)
  },

  warn: (msg: any) => {
    console.warn(`[${time()}] [WARNING] ${decodeURI(msg)}`)
  },

  error: (msg: any) => {
    console.error(`[${time()}] [ERROR] ${decodeURI(msg)}`)
  }
}


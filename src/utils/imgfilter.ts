export const imgfilter = (url: string) => {
  if (url && url.startsWith('http')) {
    return url
  } else {
    url = `http://127.0.0.1${url}`
    return url
  }
}

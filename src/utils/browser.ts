export const copyToClipboard = (str: string) => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(str)
  }
  return Promise.reject(new Error('The Clipboard API is not available.'))
}

export const b64EncodeUnicode = (str: string) => {
  return btoa(encodeURIComponent(str))
}

export const UnicodeDecodeB64 = (str: string) => {
  return decodeURIComponent(atob(str))
}

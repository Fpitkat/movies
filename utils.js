const debounce = (func, delay = 1000) => {
  let timoutId
  return (...args) => {
    if (timoutId) {
      clearTimeout(timoutId)
    }
    timoutId = setTimeout(() => {
      func.apply(null, args)
    }, delay)
  }
}

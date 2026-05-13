export const formatCurrency = (value) => {
  if (value == null) return '0.00'

  const [intPart, decPart = ''] = String(value).split('.')

  // nessun decimale
  if (decPart.length === 0) {
    return `${intPart}.00`
  }

  // 1 solo decimale
  if (decPart.length === 1) {
    return `${intPart}.${decPart}0`
  }

  // 2 decimali esatti
  if (decPart.length === 2) {
    return `${intPart}.${decPart}`
  }

  // 3 di due decimali
  let cents = Number(decPart.slice(0, 2))

  if (Number(decPart[2]) >= 5) {
    cents++
  }

  // gestione 9.999 -> 10.00
  if (cents === 100) {
    return `${Number(intPart) + 1}.00`
  }

  return `${intPart}.${String(cents).padStart(2, '0')}`
}

export const roundCurrency = (value) => {
  const result = Math.round(value * 100) / 100
  return result > 0 ? result : 0
}

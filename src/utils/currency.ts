export const currencyValues = ['RUB', 'USD', 'EUR'] as const
export type Currency = typeof currencyValues[number]

const RATE = {
  RUB: 1,
  USD: 60,
  EUR: 62,
}

const SIGN = {
  RUB: '₽',
  USD: '$',
  EUR: '€',
}

export const priceString = (priceRub: number, currency: Currency = 'RUB') => {
  const priceValue = priceRub / RATE[currency]
  const integerPart = Math.trunc(priceValue)
  const fractionalPart = priceValue - integerPart
  const chunks = []

  for (let v = integerPart; v > 0; v = Math.trunc(v / 1000)) {
    const chunk = (v % 1000).toString()
    chunks.push(`${'0'.repeat(3 - chunk.length)}${chunk}`)
  }

  //clear leading zeroes
  chunks[chunks.length - 1] = parseInt(chunks[chunks.length - 1]).toString()

  const fractionStr = fractionalPart.toFixed(2)

  return `${chunks.reverse().join(' ')}${
    fractionStr === '0.00' ? '' : fractionStr.slice(1)
  } ${SIGN[currency]}`
}

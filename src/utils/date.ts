export const utcDate = (ruDate: string) => {
  const [day, month, year] = ruDate.split('.')
  return `20${year}-${month}-${day}`
}

const MONTH: Record<number, string> = {
  1: 'янв',
  2: 'февр',
  3: 'март',
  4: 'апр',
  5: 'май',
  6: 'июнь',
  7: 'июль',
  8: 'авг',
  9: 'септ',
  10: 'окт',
  11: 'нояб',
  12: 'дек',
}

const DAY: Record<number, string> = {
  1: 'Пн',
  2: 'Вт',
  3: 'Ср',
  4: 'Чт',
  5: 'Пт',
  6: 'Сб',
  0: 'Вс',
}

export const formatDate = (dateStr: string) => {
  // 2018-12-17

  const date = new Date(dateStr)
  return `${date.getDate()} ${MONTH[date.getMonth() + 1]} ${date.getFullYear()}, ${
    DAY[date.getDay()]
  }`
}

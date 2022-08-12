const LUT: Record<number, string> = {
  0: 'Без пересадок',
  1: '1 пересадка',
  2: '2 пересадки',
  3: '3 пересадки',
  4: '4 пересадки',
}

export const stopsString = (stopsCount: number) => {
  return LUT[stopsCount] ?? `${stopsCount} пересадок`
}

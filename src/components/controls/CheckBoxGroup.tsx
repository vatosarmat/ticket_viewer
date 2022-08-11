import { useState } from 'react'
import './CheckBoxGroup.css'

type CheckBoxGroupProps<Value extends string | number> = {
  labeledValues: (readonly [Value, string])[]
  valuesSelected: Record<Value, boolean>
  onChange: (selected: Record<Value, boolean>) => void
}

const CheckBoxGroup = <Value extends string | number>({
  labeledValues,
  valuesSelected,
  onChange,
}: CheckBoxGroupProps<Value>) => {
  const getAll = (check: boolean) =>
    labeledValues.reduce(
      (table, [value]) => ({ ...table, [value]: check }),
      {} as Record<Value, boolean>
    )

  const [valueHovered, setValueHovered] = useState<Value | undefined>(undefined)

  const allChecked = labeledValues.every(([value]) => valuesSelected[value])

  const onChecked: React.ChangeEventHandler<HTMLInputElement> = event => {
    const value = event.target.value as Value
    onChange({ ...valuesSelected, [value]: event.target.checked })
  }

  return (
    <div className="CheckBoxGroup">
      <label className="CheckBox">
        <input
          type="checkbox"
          className="CheckBox__input"
          value={'all'}
          checked={allChecked}
          onChange={() => onChange(getAll(!allChecked))}
        />
        <span className="CheckBox__label">ВСЕ</span>
      </label>
      {labeledValues.map(([value, label]) => (
        <label
          key={value.toString()}
          className="CheckBox"
          onMouseEnter={() => setValueHovered(value)}
          onMouseLeave={() => setValueHovered(undefined)}
        >
          <input
            type="checkbox"
            className="CheckBox__input"
            value={value}
            checked={valuesSelected[value] ?? false}
            onChange={onChecked}
          />
          <span className="CheckBox__label">{label}</span>
          {valueHovered === value && (
            <button
              className="CheckBox__only"
              onClick={() => onChange({ ...getAll(false), [value]: true })}
            >
              ТОЛЬКО
            </button>
          )}
        </label>
      ))}
    </div>
  )
}

export default CheckBoxGroup

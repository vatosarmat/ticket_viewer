import './ToggleButtonGroup.css'

type ToggleButtonGroupProps<Variant extends string> = {
  variants: readonly Variant[]
  value: Variant
  onChange: (variant: Variant) => void
}

const ToggleButtonGroup = <Variant extends string>({
  variants,
  value,
  onChange,
}: ToggleButtonGroupProps<Variant>) => {
  const buttonClass = 'ToggleButton typography-normal-upper'
  return (
    <div className="ToggleButtonGroup">
      {variants.map(variant => (
        <button
          key={variant}
          className={
            variant === value ? `${buttonClass} ToggleButton_checked` : buttonClass
          }
          onClick={() => onChange(variant)}
        >
          {variant}
        </button>
      ))}
    </div>
  )
}

export default ToggleButtonGroup

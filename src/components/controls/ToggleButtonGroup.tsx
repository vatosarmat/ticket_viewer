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
  return (
    <div className="ToggleButtonGroup">
      {variants.map(variant => (
        <button
          key={variant}
          className={
            variant === value ? 'ToggleButton ToggleButton_checked' : 'ToggleButton'
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

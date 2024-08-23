export const Color = ({name}) => {
  return(
    {
    name: name,
    type: "custom",
    render: ({ name, onChange, value }) => (
      <div>
      <label for="customRange1" class="form-label">{name}</label>
      <input
        type="color"
        class="form-color"
        defaultValue={value}
        name={name}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      {value}
      </div>
    ),
    }
  )
  }
export const Color = (name) => {
  return(
    {
    label: name,
    type: "custom",
    render: ({ label, onChange, value }) => (
      <div>
      <label for="colorfield" class="form-label">{name}</label>
      <br/>
      <input
        type="color"
        class="form-color form-control-color"
        id="colorfield"
        defaultValue={value}
        name={name}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <input
        type="text"
        class="form-control"
        defaultValue={value}
        name={name}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      </div>
    ),
    }
  )
  }
export const Range = {
    name: "Font Size",
    type: "custom",
    render: ({ name, onChange, value }) => (
      <div>
      <label for="customRange1" class="form-label">{name}</label>
      <input
        type="range"
        class="form-range"
        min="10"
        max="100"
        defaultValue={value}
        name={name}
        onChange={(e) => onChange(e.currentTarget.value+"px")}
      />
      {value}
      </div>
    ),
  }
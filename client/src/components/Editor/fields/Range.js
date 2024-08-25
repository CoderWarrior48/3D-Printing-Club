export const Range = (name,min,max) => {

    return ({
      label: name,
      type: "custom",
      render: ({ label, onChange, value }) => (
        <div>
        <label for="rangefield" class="form-label">{label}</label>
        <input
          type="range"
          class="form-range"
          id="rangefield"
          min={min}
          max={max}
          defaultValue={value}
          name={name}
          onChange={(e) => onChange(e.currentTarget.value+"px")}
        />
        {value}
        </div>
      ),
    })
   
  }
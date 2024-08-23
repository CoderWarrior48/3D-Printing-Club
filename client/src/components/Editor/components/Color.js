export default Color = (name, onChange, value) => {
    return (
        <div>
            <input
            defaultValue={value}
            type='color'
            name={name}
            onChange={(e) => onChange(e.currentTarget.value)}
            />
            <h2>Color</h2>
        </div>
    )
}
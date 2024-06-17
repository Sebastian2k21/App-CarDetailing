const CommonSelect = ({name, options, onSelect}) => {
    return (
        <select id={name} name={name} onChange={e => onSelect(e.target.value)}>
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
}

export default CommonSelect;
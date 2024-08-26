

const CommonSelect = ({name, options, onSelect=()=>{}, selectedValue=null}) => {

    return (
        <select id={name} name={name} onChange={e => onSelect(e.target.value)} value={selectedValue}>
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
}

export default CommonSelect;
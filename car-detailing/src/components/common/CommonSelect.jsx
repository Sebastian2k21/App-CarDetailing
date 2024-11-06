import { InputLabel, MenuItem, Select } from "@mui/material";


const CommonSelect = ({name, label, options, onSelect=()=>{}, selectedValue=null}) => {
    return (  
        <>
            <Select
                labelId="common-select-label"
                id={name}
                value={selectedValue}
                label={label}
                color="primary"
                sx={{
                    m: 1, minWidth: 240,
  
                    '& .MuiSelect-select': {
                        color: '#ffffff', 
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff', 
                        color: '#ffffff', 
                    },             

                }}
                onChange={e => onSelect(e.target.value)}
            >
                {options.map(option => <MenuItem value={option.value}>{option.label}</MenuItem>)}
            </Select>
        </>

      )
}

export default CommonSelect;
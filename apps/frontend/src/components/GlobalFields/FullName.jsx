import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react'

export default function FullName({setToDefault, disabled, value=''}){
    const [fieldValue, setFieldValue] = useState(value)

    useEffect(() =>{
        setToDefault ? setFieldValue(value) : null
    }
    ,[setToDefault])

    return (
        <div>
            <TextField 
                sx={{width: '70%', margin: '10px'}}
                name="fullname"
                id="fullname"
                label="Full Name"
                variant="standard"
                autoComplete="off"
                disabled={disabled}
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
            />
        </div>
    )
}
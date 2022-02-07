import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';

export default function Email({setToDefault, onChange, disabled, value=''}) {
    const [fieldValue, setFieldValue] = useState(value);

    useEffect(() =>
    setToDefault ? setFieldValue(value) : null
    ,[setToDefault])

    return (
        <div className="email-field">
            <TextField sx={{width: '70%', margin: '10px'}}
                id="standard-basic"
                label="Email"
                name="email"
                variant="standard"
                placeholder="Enter your email address"
                onChange={(e) => setFieldValue(e.target.value)}
                type="email"
                autoComplete="off"
                disabled={disabled}
                value={fieldValue}
            />
        </div>
    )
}
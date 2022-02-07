import { useCallback } from 'react';
export default function Thumbnail({disabled=false, value}) {

    const onChange= useCallback((event) => {
        console.log(event.target.value);
    })
    return (
        <div className="thumbnail-upload-btn">
            <label style={disabled ? {color: 'rgba(0, 0, 0, 0.38)'} : null}>
                Thumbnail:
                <input style={disabled ? {color: 'rgba(0, 0, 0, 0.38)'} : null} disabled={disabled} accept="image/*" onChange={onChange} name="thumbnail" type="file"/>
            </label>
        </div>
    )
}
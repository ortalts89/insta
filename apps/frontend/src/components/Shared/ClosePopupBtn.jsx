import CloseIcon from '@mui/icons-material/Close';
import './ClosePopupBtn.css'

export default function ClosePopupBtn({onClick}) {
    return (
        <div onClick={onClick} className="btn-container">
            <CloseIcon fontSize={'small'}/>
        </div>
    )
}
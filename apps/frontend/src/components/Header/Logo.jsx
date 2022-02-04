import { Link } from 'react-router-dom';
import myFeedLogo from '/myFeedLogo.png'

export default function Logo({nextPage}) {
    return(
        <div className="logo-container">
            <Link to={nextPage}>
                <img src={myFeedLogo} />
            </Link>
        </div>
    )
}
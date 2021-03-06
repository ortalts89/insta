import { Link } from 'react-router-dom';
import { useCallback, useState, useRef, useMemo} from 'react'
import {useHistory} from 'react-router-dom'
import Button from '@mui/material/Button';
import { useSetRecoilState } from 'recoil'
import { loggedInUserState, isLoggedInState } from '../store/users'
import Username from '../components/GlobalFields/Username'
import Password from '../components/GlobalFields/Password'
import './Login.css'
import { validateUsername, validatePassword } from '../compositions/validations'
import { socket } from '../socket';



export default function Login(){
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [loginError, setLoginError] = useState('');
    const usernameChanged = useRef(false);
    const passwordChanged = useRef(false);
    let history = useHistory();
    const setLoggedInUser = useSetRecoilState(loggedInUserState);
    const setIsLoggedIn = useSetRecoilState(isLoggedInState);



    const onChange = useCallback((event) => {
        event.preventDefault();
        if(event.target.name === 'username'){
            setIsUsernameValid(validateUsername(event));
            usernameChanged.current = true;
        }else if(event.target.name === 'password'){
            setIsPasswordValid(validatePassword(event));
            passwordChanged.current = true;
        }
        setLoginError('');
    })

    const isSubmitDisabled = useMemo(() => {
        if(isUsernameValid && isPasswordValid){
            return false;
        }
        else{
            return true;
        }
    },[isUsernameValid, isPasswordValid])

    const onSubmit = useCallback(async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        await fetch('/api/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: formData.get('username'),
                password: formData.get('password')
            })
        }).then((res) => {
            if(res.status === 200) 
            {
                setIsLoggedIn(true);
                history.push('/');
                return res.json()
            }
            else{
               setLoginError('Invalid username or password');
            }
        })
        .then((user) => {
            setLoggedInUser({id: user.id, fullname: user.fullname, thumbnail: user.thumbnail})
            socket.emit('login', user.id);
        })
}, []);

    return (
        <div>
            <div className="login-background"></div>
            <div className="login-foreground">
                <div className="login-container">
                    <div className="title">MyFeed</div>
                    <form onSubmit={onSubmit}>
                        <Username onChange={onChange}/>
                        <Password onChange={onChange}/>
                        <Button variant="contained" 
                            className="submit-button"
                            type="submit"
                            disabled={isSubmitDisabled}
                            sx={{
                                width: '40%',
                                marginTop:'40px'}}>
                            Log In
                        </Button>
                        <div className="login-error">{loginError}</div>
                    </form>
                    <div className="reset-password">
                        <Link to='/reset-password'>
                            <span>Forgot Password?</span>
                        </Link>
                    </div>
                    <div className="sign-up">
                        New User?&nbsp; 
                        <a href="/signUp"><span>Sign Up</span></a>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
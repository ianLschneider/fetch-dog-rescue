import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { User } from '../interfaces/User'
import authorize from '../api/login'
import './Login.scss'

const LoginPage = () => {

    // const [toggleError, setToggleError] = useState<boolean>(false)
     const [errorMessage, setErrorMessage] = useState<string>('')

    const [user, setUser] = useState<User>({
        email: '',
        name: '' 
    })

    const { login } = useAuth();
    const navigate = useNavigate();
  
    const handleLogin = async () => {
        setErrorMessage('')
        const authenticated = await authorize(user)

        if(!authenticated){
            setErrorMessage("Hmmm. Something doesn't look right.")
            return
        }
        login();

        navigate("/", { replace: true });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleLogin()
    }

    return (
        <section className="login--container">
        <div className="login">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input 
                        type="text"
                        id="name"
                        name="name"
                        placeholder="enter name"
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                    /> 
                </label>
                <label>
                    Email:
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        placeholder="enter email"
                        onChange={handleChange}
                        autoComplete="false"
                        required />
                </label>
                
                <h5 className='errorMsg min-h-[30px]'>{errorMessage}</h5>

                <input type="Submit" value="Log in" readOnly />

            </form>
        </div>
</section>
    )
}
export default LoginPage
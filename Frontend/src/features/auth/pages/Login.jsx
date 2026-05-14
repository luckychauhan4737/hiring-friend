import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import logo from '../../../assets/logo.png'


const EyeIcon = () => (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
)

const EyeSlashIcon = () => (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 3 18 18" />
        <path d="M10.6 10.7a3 3 0 0 0 4 4" />
        <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-3 4.2" />
        <path d="M6.6 6.7C4.2 8.3 2.8 10.9 2 12c0 0 3.5 7 10 7 1.8 0 3.4-.5 4.8-1.3" />
    </svg>
)

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ showPassword, setShowPassword ] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")
        try {
            await handleLogin({email,password})
            navigate('/')
        } catch (error) {
            setErrorMessage(error.message || "Invalid email or password")
        }
    }

    if(loading){
        return (<main><h1>Loading.......</h1></main>)
    }


    return (
        <main className='auth-page-responsive'>
            
            <div className="form-container auth-form-responsive">
                <img
                 src={logo}
                 alt="logo"
                 className="mx-auto object-contain"
                 style={{ width: "80px", height: "80px" }}
                />

                <h1 className='auth-heading-responsive'>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-field">
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name='password'
                                placeholder='Enter password' />
                            <button
                                aria-controls="password"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                aria-pressed={showPassword}
                                className="password-toggle"
                                onClick={() => { setShowPassword((current) => !current) }}
                                type="button"
                            >
                                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </button>
                        </div>
                    </div>
                    <button className='button primary-button' >Login</button>
                </form>
                {errorMessage && (
                    <p className='auth-error-message'>{errorMessage}</p>
                )}
                <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
            </div>
        </main>
    )
}

export default Login



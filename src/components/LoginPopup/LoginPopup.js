import React, { useState, useRef } from 'react';
import './LoginPopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

const LoginPopup = ({ setShowLogin, setIsAuthenticated, setIsAdmin }) => {
    const [currState, setCurrState] = useState("Login");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userType, setUserType] = useState("Cliente");
    const [message, setMessage] = useState(null);
    const nombreRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const showMessage = (text, type = 'error') => {
        setMessage({ text, type });
        setTimeout(() => setMessage(null), 5000);
    };

    const handleAuth = async (url, body) => {
        setIsLoading(true);
        try {
            const response = await axios.post(url, body);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);

                // Verificar si es administrador
                if (response.data.user && response.data.user.role === "admin") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }

                setShowLogin(false);
                showMessage('¡Inicio de sesión exitoso!', 'success');
            } else {
                showMessage(response.data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Error inesperado');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUp = () => {
        const nombre = nombreRef.current.value;
        const correo = emailRef.current.value;
        const contraseña = passwordRef.current.value;
        if (!nombre || !correo || !contraseña) {
            showMessage('Todos los campos son requeridos');
            return;
        }
        handleAuth('http://localhost:3001/api/auth/registerCliente', { nombre, correo, contraseña });
    };

    const handleLogin = () => {
        const correo = emailRef.current.value;
        const contraseña = passwordRef.current.value;
        if (!correo || !contraseña) {
            showMessage('Correo y contraseña son requeridos');
            return;
        }
        const url = userType === "Cliente" ? 'http://localhost:3001/api/auth/loginCliente' : 'http://localhost:3001/api/admin/login';
        handleAuth(url, { correo, contraseña });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSocialLogin = (provider) => {
        console.log(`Iniciar sesión con ${provider}`);
    };

    const handleStateChange = (newState) => {
        setCurrState(newState);
        setUserType("Cliente");
    };

    const handleUserTypeChange = (type) => {
        setUserType(type);
        setCurrState("Login");
    };

    return (
        <div className='login-popup'>
            <form onSubmit={(e) => { e.preventDefault(); currState === "Sign Up" ? handleSignUp() : handleLogin(); }} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <FontAwesomeIcon icon={faTimes} onClick={() => setShowLogin(false)} />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && <input type="text" placeholder='Tu nombre' ref={nombreRef} required />}
                    <input type="email" placeholder='Tu Email' ref={emailRef} required />
                    <div className="password-container">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder='Contraseña' 
                            ref={passwordRef} 
                            required 
                        />
                        <FontAwesomeIcon 
                            icon={showPassword ? faEyeSlash : faEye} 
                            onClick={toggleShowPassword} 
                            className="password-toggle-icon" 
                        />
                    </div>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Cargando..." : (currState === "Sign Up" ? "Crear cuenta" : "Iniciar sesión")}
                </button>
                {message && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>Al continuar, acepto los términos de uso y la política de privacidad.</p>
                </div>
                <div className="social-login">
                    <p>Inicia sesión con tus redes sociales:</p>
                    <div className="social-login-icons">
                        <button type="button" className="google" onClick={() => handleSocialLogin('Google')}>
                            <FontAwesomeIcon icon={faGoogle} />
                        </button>
                        <button type="button" className="facebook" onClick={() => handleSocialLogin('Facebook')}>
                            <FontAwesomeIcon icon={faFacebook} />
                        </button>
                        <button type="button" className="twitter" onClick={() => handleSocialLogin('Twitter')}>
                            <FontAwesomeIcon icon={faTwitter} />
                        </button>
                    </div>
                </div>
                {currState === "Login"
                    ? (
                        <>
                            <p>¿Crear una nueva cuenta? <b onClick={() => handleStateChange("Sign Up")}>Crear Cuenta</b></p>
                            <p>¿Eres administrador? <b onClick={() => handleUserTypeChange("Administrador")}>Iniciar sesión como Administrador</b></p>
                        </>
                    )
                    : (
                        <>
                            <p>¿Ya tienes cuenta? <b onClick={() => handleStateChange("Login")}>Iniciar Sesion</b></p>
                            <p>¿Eres administrador? <b onClick={() => handleUserTypeChange("Administrador")}>Iniciar sesión como Administrador</b></p>
                        </>
                    )}
            </form>
        </div>
    );
};

export default LoginPopup;

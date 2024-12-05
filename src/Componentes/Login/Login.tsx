/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { LoginData } from "../../Interfaces/LoginData";
import { LoginAPI } from "../../Servicos/MercadoFacilAPI";
import './Login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    const handleSubmit = async (event: React.MouseEventHandler<HTMLButtonElement> | any) => {
        event.preventDefault();
        try {
            const response = await LoginAPI(loginData);
            if (response.data && response.status === 200) {
                alert('Login realizado com sucesso');
                sessionStorage.setItem('token', response.data.token);    
                navigate("/HomePage");            
                const testeRecuperaDado = sessionStorage.getItem('token');
                alert('Dado Recuperado do session storage: ' + testeRecuperaDado);
            } else {
                alert('Falha no login');
            }
        } catch (e: Error | any) {
            console.error('Falha no login: ' + e.message);
        }
    }

    return (
        <div>
            <div className="login-container">
                <div className="image-container">
                    <img src="src/assets/money-icon-vector-283590515.jpg" alt="Logo" />
                </div>
                <div className="spacer">
                    <h3>Lar do Investidor</h3>
                </div>
                <div className="LoginForm">
                    <form className="login-form-inline">
                        <input
                            id="text_mail"
                            type="text"
                            name="email"
                            placeholder="E-mail"
                            value={loginData.email}
                            onChange={handleLogin}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Senha"
                            value={loginData.password}
                            onChange={handleLogin}
                        />
                        <button className="submit-button" onClick={handleSubmit}>
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
            <footer className="footer">
                <p>© 2024 Lar do Investidor. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
    
}

export default Login;

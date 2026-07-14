import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const { login: loginUser } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        try {

            const user = await login({

                email,

                password

            });

            loginUser(user);

            toast.success("Welcome back!");

            navigate("/");

        }

        catch {

            toast.error("Invalid email or password");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="login-container">

            <div className="login-left">

                <h1>Attendance Management System</h1>

                <p>

                    Track attendance efficiently with a modern dashboard.

                </p>

            </div>

            <div className="login-right">

                <form
                    className="login-card"
                    onSubmit={handleSubmit}
                >

                    <h2>Welcome Back</h2>

                    <p>Please login to continue.</p>

                    <div className="input-group">

                        <FaEnvelope />

                        <input

                            type="email"

                            placeholder="Email"

                            value={email}

                            onChange={(e) => setEmail(e.target.value)}

                            required

                        />

                    </div>

                    <div className="input-group">

                        <FaLock />

                        <input

                            type={showPassword ? "text" : "password"}

                            placeholder="Password"

                            value={password}

                            onChange={(e) => setPassword(e.target.value)}

                            required

                        />

                        <span

                            className="toggle-password"

                            onClick={() => setShowPassword(!showPassword)}

                        >

                            {

                                showPassword

                                    ? <FaEyeSlash />

                                    : <FaEye />

                            }

                        </span>

                    </div>

                    <div className="login-options">

                        <label>

                            <input type="checkbox"/>

                            Remember Me

                        </label>

                        <Link to="#">

                            Forgot Password?

                        </Link>

                    </div>

                    <button disabled={loading}>

                        {

                            loading

                                ? "Logging in..."

                                : "Login"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;
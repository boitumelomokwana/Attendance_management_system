import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const demoAccounts = [
    { email: "admin@attendance.com", password: "password123", role: "Admin", firstName: "Admin" },
    { email: "lecturer@attendance.com", password: "password123", role: "Lecturer", firstName: "Jane" },
    { email: "student@attendance.com", password: "password123", role: "Student", firstName: "John" }
];

import { login, register } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const { login: loginUser } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [isRegistering, setIsRegistering] = useState(false);

    const [firstName, setFirstName] = useState("");

    const [lastName, setLastName] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        try {
            const demoUser = demoAccounts.find((account) => account.email === email && account.password === password);

            if (demoUser) {
                loginUser({
                    ...demoUser,
                    lastName: "User"
                });
                toast.success(`Welcome ${demoUser.role}!`);
                navigate("/");
                return;
            }

            if (isRegistering) {
                const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
                if (storedUsers.some((user) => user.email === email)) {
                    toast.error("User already exists");
                    setLoading(false);
                    return;
                }

                const newUser = {
                    _id: Date.now().toString(),
                    firstName,
                    lastName,
                    email,
                    password,
                    role: "Student"
                };

                storedUsers.push(newUser);
                localStorage.setItem("users", JSON.stringify(storedUsers));
                loginUser(newUser);
                toast.success("Registration successful!");
                navigate("/");
                return;
            }

            const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
            const localUser = storedUsers.find((user) => user.email === email && user.password === password);

            if (localUser) {
                loginUser(localUser);
                toast.success("Welcome back!");
                navigate("/");
                return;
            }

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

                    <h2>{isRegistering ? "Create Account" : "Welcome Back"}</h2>

                    <p>{isRegistering ? "Register a new student account." : "Please login to continue."}</p>

                    {isRegistering && (
                        <>
                            <div className="input-group">
                                <FaEnvelope />
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <FaEnvelope />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}

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

                                ? isRegistering ? "Creating account..." : "Logging in..."

                                : isRegistering ? "Register" : "Login"

                        }

                    </button>

                    <p style={{ marginTop: "0.75rem", textAlign: "center" }}>
                        <button type="button" onClick={() => setIsRegistering(!isRegistering)} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer" }}>
                            {isRegistering ? "Already have an account? Login" : "Need an account? Register"}
                        </button>
                    </p>

                </form>

            </div>

        </div>

    );

}

export default Login;
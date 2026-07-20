import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaUser
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login, register, verifyOTP, resendOTP } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import "../styles/Login.css";

const demoAccounts = [
  { _id: "demo-admin", firstName: "Admin", lastName: "User", email: "admin@attendance.com", password: "password123", role: "Admin", token: "demo-token-admin" },
  { _id: "demo-lecturer", firstName: "Jane", lastName: "Smith", email: "lecturer@attendance.com", password: "password123", role: "Lecturer", token: "demo-token-lecturer" },
  { _id: "demo-student", firstName: "John", lastName: "Doe", email: "student@attendance.com", password: "password123", role: "Student", token: "demo-token-student" }
];

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

  // OTP state
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpEmail, setOtpEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // ── Demo accounts (always work, no OTP) ──
      const demoUser = demoAccounts.find(
        (a) => a.email === email && a.password === password
      );
      if (demoUser) {
        loginUser(demoUser);
        toast.success(`Welcome ${demoUser.role}!`);
        navigate("/");
        return;
      }

      // ── Registration ──
      if (isRegistering) {
        const result = await register({ firstName, lastName, email, password });

        if (result.needsVerification) {
          setOtpEmail(result.email);
          setShowOTP(true);
          if (result.fallbackOtp) {
            toast.info(`Email service unavailable. Fallback OTP: ${result.fallbackOtp}`);
          } else {
            toast.success(result.message || "OTP sent to your email");
          }
        } else if (result.token) {
          loginUser(result);
          toast.success("Registered successfully!");
          navigate("/");
        }
        return;
      }

      // ── Login ──
      try {
        const user = await login({ email, password });
        loginUser(user);
        toast.success("Welcome back!");
        navigate("/");
      } catch (err) {
        const data = err.response?.data;

        if (data?.needsVerification) {
          setOtpEmail(data.email);
          setShowOTP(true);
          toast.info("Please verify your email first");
          return;
        }

        toast.error(data?.message || "Invalid email or password");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOTP(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await verifyOTP({ email: otpEmail, otp });
      loginUser(result);
      toast.success("Email verified! Welcome.");
      setShowOTP(false);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  }

  async function handleResendOTP() {
    setLoading(true);
    try {
      const result = await resendOTP(otpEmail);
      toast.success("OTP resent");
      if (result.fallbackOtp) {
        toast.info(`Fallback OTP: ${result.fallbackOtp}`);
      }
    } catch {
      toast.error("Could not resend OTP");
    } finally {
      setLoading(false);
    }
  }

  // ── OTP verification screen ──
  if (showOTP) {
    return (
      <div className="login-container">
        <div className="login-left">
          <h1>Attendance Management System</h1>
          <p>Verify your email to complete registration.</p>
        </div>
        <div className="login-right">
          <form className="login-card" onSubmit={handleVerifyOTP}>
            <h2>Verify Email</h2>
            <p>Enter the 6-digit OTP sent to <strong>{otpEmail}</strong></p>

            <div className="input-group">
              <FaKey />
              <input
                type="text"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                required
                maxLength={6}
              />
            </div>

            <button disabled={loading || otp.length < 6}>
              {loading ? "Verifying..." : "Verify Email"}
            </button>

            <p style={{ marginTop: "0.75rem", textAlign: "center" }}>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading}
                style={{
                  background: "none",
                  border: "none",
                  color: "#2563eb",
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
              >
                Resend OTP
              </button>
            </p>

            <p style={{ marginTop: "0.5rem", textAlign: "center" }}>
              <button
                type="button"
                onClick={() => {
                  setShowOTP(false);
                  setOtp("");
                  setIsRegistering(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#666",
                  cursor: "pointer"
                }}
              >
                Back to Login
              </button>
            </p>
          </form>
        </div>
      </div>
    );
  }

  // ── Main Login / Register screen ──
  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Attendance Management System</h1>
        <p>Track attendance efficiently with a modern dashboard.</p>
      </div>
      <div className="login-right">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2>{isRegistering ? "Create Account" : "Welcome Back"}</h2>
          <p>
            {isRegistering
              ? "Register a new student account."
              : "Please login to continue."}
          </p>

          {isRegistering && (
            <>
              <div className="input-group">
                <FaUser />
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <FaUser />
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
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
          </div>

          <button disabled={loading}>
            {loading
              ? isRegistering
                ? "Creating account..."
                : "Logging in..."
              : isRegistering
              ? "Register"
              : "Login"}
          </button>

          <p style={{ marginTop: "0.75rem", textAlign: "center" }}>
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setShowOTP(false);
              }}
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                cursor: "pointer"
              }}
            >
              {isRegistering
                ? "Already have an account? Login"
                : "Need an account? Register"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

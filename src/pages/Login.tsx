import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        const success = await login(email, password);
        if (success) {
            navigate("/");
        } else {
            setError("Invalid email or password");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">

            <div className="max-w-md w-full space-y-8 p-8">
                <div>
                    <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
                        Sign in to JobTrack
                    </h2>
                </div>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <div className="text-red-500 text-center">{error}</div>
                )}

                <div className="space-y-4">
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />

                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                    Sign In
                </button>

                <div className="text-center">
                    <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">Don't have an account? Sign up
                    </Link>
                </div>
            </form>

        </div>
    );


}

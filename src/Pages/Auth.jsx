import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
    const [activeTab, setActiveTab] = useState("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { login, register } = useAuth();
    const navigate = useNavigate();


    const resetState = () => {
        setEmail("");
        setPassword("");
        setName("");
        setPhone("");
        setError("");
        setLoading(false);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const credentials = {
            Email: email,
            Password: password,
        };

        const result = await login(credentials);

        if (result === true) {
            resetState();
            navigate("/");
            return;
        }

        setError(result || "Login failed");
        setLoading(false);
    };


    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!name || !email || !password || !phone) {
            setError("Complete all fields");
            setLoading(false);
            return;
        }

        const result = await register({
            Name: name,
            Email: email,
            Password: password,
            Phone: phone
        });
        if (result !== true) {
            setError(result || "This email is already registered.");
            setLoading(false);
            return;
        }

        resetState();
        navigate("/");
    };

    return (
        <section className="flex flex-col min-h-screen bg-background text-foreground font-sans">
            <div className="flex items-center justify-center flex-1 px-5 py-12">
                <div className="w-full max-w-md">
                    <div className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-md">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold font-heading mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Log in or create a new account
                            </p>
                        </div>

                        <div className="flex mb-6 bg-secondary rounded-xl p-1">
                            <button
                                onClick={() => {
                                    setActiveTab("signin");
                                    setError("");
                                }}
                                className={`flex-1 py-3 rounded-lg transition-all duration-300 font-semibold text-sm ${activeTab === "signin"
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab("signup");
                                    setError("");
                                }}
                                className={`flex-1 py-3 rounded-lg transition-all duration-300 font-semibold text-sm ${activeTab === "signup"
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                New Account
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl p-3 text-center">
                                {error}
                            </div>
                        )}

                        {activeTab == "signin" ? (
                            <form onSubmit={handleSignIn} className="space-y-4">
                                <div>
                                    <label className="block mb-2 text-sm font-semibold">Email</label>
                                    <input
                                        value={email}
                                        type="email"
                                        required
                                        placeholder="example@gmail.com"
                                        className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-all"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setError("");
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-semibold">Password</label>
                                    <input
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError("");
                                        }}
                                        type="password"
                                        required
                                        placeholder="**********"
                                        className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-all"
                                    />
                                </div>
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full bg-primary text-primary-foreground rounded-lg p-3 font-semibold shadow-md hover:opacity-90 active:opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Please Wait..." : "Login"}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleSignUp} className="space-y-4">
                                <div>
                                    <label className="block mb-2 text-sm font-semibold">Name</label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        required
                                        placeholder="Full Name"
                                        className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-semibold">Phone</label>
                                    <input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        type="text"
                                        required
                                        placeholder="07XXXXXXXX"
                                        className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-semibold">Email</label>
                                    <input
                                        value={email}
                                        type="email"
                                        required
                                        placeholder="example@gmail.com"
                                        className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-all"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setError("");
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-semibold">Password</label>
                                    <input
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError("");
                                        }}
                                        type="password"
                                        required
                                        placeholder="**********"
                                        className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-all"
                                    />
                                </div>

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full bg-primary text-primary-foreground rounded-lg p-3 font-semibold shadow-md hover:opacity-90 active:opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Please Wait..." : "Register"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Auth;
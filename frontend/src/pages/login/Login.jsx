import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials, setError, clearError } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    dispatch(clearError());

    try {
      const userData = await login({ emailAddress, password }).unwrap();

      dispatch(
        setCredentials({
          token: userData.token,
          userId: userData.user.UserId,
        })
      );

      localStorage.setItem("token", userData.token);
      localStorage.setItem("userId", userData.user.UserId);
      navigate("/dashboard");
    } catch (err) {
      const message = err?.data?.message || "Failed to login.";
      setLocalError(message);
      dispatch(setError(message));
    }
  };

  return (
    <div className="h-[700px] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-md shadow-md w-full max-w-xs"
      >
        {localError && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
            {localError}
          </div>
        )}

        <h2 className="text-xl font-semibold mb-3 text-center">Login</h2>

        <label
          htmlFor="email"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="password"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-3 py-2 border border-gray-300 rounded-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-sm hover:bg-blue-700 transition disabled:bg-blue-300"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

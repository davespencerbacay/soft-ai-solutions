import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials, setError, clearError } from "../../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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
    <div className="flex items-center justify-center h-[700px]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        {localError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded-lg">
            {localError}
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-1 text-gray-700"
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
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-1 text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <div className="mt-5 text-center">
          <Link
            to="/register"
            className="text-blue-500 hover:underline"
          >
            Don&apos;t have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

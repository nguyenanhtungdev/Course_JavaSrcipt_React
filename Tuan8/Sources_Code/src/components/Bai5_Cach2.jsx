// AuthUseReducer.jsx
import React, { useReducer, useState } from "react";
import { User, LogIn, LogOut, Mail, Lock, Eye, EyeOff } from "lucide-react";

// Action types
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_USER_INFO = "SET_USER_INFO";

// Initial state
const initialState = {
  user: null,
  isLoggedIn: false,
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    case SET_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

const AuthUseReducer = () => {
  // Auth state with reducer
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const { user, isLoggedIn } = authState;

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Actions
  const login = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Mock successful login
    const userData = {
      id: 1,
      email,
      name: email.split("@")[0],
      joinDate: new Date().toISOString(),
    };

    dispatch({ type: LOGIN, payload: userData });
    setError("");

    // Reset form
    setEmail("");
    setPassword("");
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const setUserInfo = (newUserInfo) => {
    dispatch({ type: SET_USER_INFO, payload: newUserInfo });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
        <User className="mr-2 text-green-500" />
        Auth System (useReducer)
      </h2>

      {isLoggedIn ? (
        // Logged in view
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold mb-1">Welcome, {user.name}!</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">
                Member since: {new Date(user.joinDate).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={logout}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>

          {/* User profile update form */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Update Profile</h4>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUserInfo({ name: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Enter your name"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() =>
                  setUserInfo({ lastUpdated: new Date().toISOString() })
                }
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 text-sm"
              >
                Save Changes
              </button>
            </div>

            {user.lastUpdated && (
              <p className="text-xs text-gray-500 mt-2">
                Last updated: {new Date(user.lastUpdated).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      ) : (
        // Login form
        <form onSubmit={login} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded border border-red-200 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Enter your email"
              />
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Enter your password"
              />
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2" />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center justify-center"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </button>

          <div className="text-center text-sm text-gray-500">
            <p>Use any email format and password (min 6 chars)</p>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthUseReducer;

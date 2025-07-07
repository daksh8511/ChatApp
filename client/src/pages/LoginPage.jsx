import { Eye, EyeClosed, KeyRound, Loader2, Mail } from "lucide-react";
import React, { useState } from "react";
import useAuth from "../store/useAuthStore";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(true);

  const {isLoggingIng, login} = useAuth()

  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <form onSubmit={handleSubmit} className="mt-20 space-y-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className={`border rounded input-bordered w-full p-2 pl-10`}
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="size-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`border rounded input-bordered w-full p-2 pl-10`}
                placeholder="Enter Your Name"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
            </div>
          </div>
          <button type="submit" disabled={isLoggingIng} className="btn btn-primary w-full">
            {
              isLoggingIng ? <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </> : "Sign In"
            }
          </button>
          <h4 className="text-sm text-center">Don't Have An Account? <Link className="text-primary" to={'/signup'}>Sign Up</Link></h4>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

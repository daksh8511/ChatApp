import { useState } from "react";
import {
  Eye,
  EyeClosed,
  KeyRound,
  Loader2,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuth();

  const validateForm = () => {
    if(!formData.fullName.trim() === ""){
      return toast.error("Name Are Required")
    }

    if(!formData.email.trim() === ""){
      return toast.error("Email Are Required")
    }

    if(!formData.password.trim() === ""){
      return toast.error("Password Are Required")
    }

    if(formData.password.length < 6){
      return toast.error("Password length must be required 6 character.")
    }

    return true
  }

  const handleForm = (e) => {
    e.preventDefault();

    const success = validateForm()

    if(success == true) signup(formData)

  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Create Account</h2>
              <p className="text-sm text-gray-400">
                Get started with your free account
              </p>
            </div>
          </div>
          <form onSubmit={handleForm} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`border rounded input-bordered w-full p-2 pl-10`}
                  placeholder="Enter Your Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

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
                  placeholder="Enter Your Name"
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

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Already Have An Account?
              <Link to={"/login"} className="link link-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div>
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved once"
        />
      </div>
    </div>
  );
};

export default SignUpPage;

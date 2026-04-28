import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";

import { setToken } from "../lib/auth";

const AuthSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error("Google login failed");
      navigate("/");
      return;
    }

    setToken(token);
    toast.success("Logged in successfully");
    navigate("/");
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center text-primary">
      Finishing Google login...
    </div>
  );
};

export default AuthSuccessPage;

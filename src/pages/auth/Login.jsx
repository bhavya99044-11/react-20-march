import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { api } from "@/utils/api";
import { AUTH_SESSION_KEY } from "@/utils/constants";
import { loginRules } from "@/utils/validation";
import { decodeGoogleCredential } from "../../utils/helpers";
import { errorToast, successToast } from "@/utils/toastMessage";
import { checkButtonDisable, checkValidation } from "@/utils/helpers";
import { Button, Checkbox, Input, LinkRef, PasswordInput } from "@/components/common";


const Login = () => {
  const navigate = useNavigate();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim();
  const initialFormData =
 {
    email: "",
    password: "",
  };

  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState({});

  const onChangeValue = (e) => {
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [e.target.name]: e.target.value.replace(/^\s+/, ""),
      };
      checkButtonDisable(updatedData, setIsLoginDisabled);
      checkValidation(
        {
          [e.target.name]: [e.target.value.replace(/^\s+/, "")],
        },
        loginRules,
        error,
        setError,
      );
      return updatedData;
    });
  };

  useEffect(() => {
    const rawSession = localStorage.getItem(AUTH_SESSION_KEY);

    if (!rawSession) {
      return;
    }

    try {
      const data = JSON.parse(rawSession);
      if (data) {
        setFormData({
          email: data?.email || "",
          password: data?.password || "",
        });
        setRememberMe(Boolean(data?.rememberMe));
      }
      setIsLoginDisabled(false);
    } catch (parseError) {
      console.error("Failed to parse stored auth session:", parseError);
    }
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();

    const errorData = await checkValidation(
      formData,
      loginRules,
      error,
      setError,
    );

    const hasEmptyField = Object.keys(errorData).every((key) => {
      return errorData[key] == "";
    });

    if (!hasEmptyField) {
      return;
    }
    setIsSubmitting(true);
    try {
      const user = await api.get(`/users?email=${formData.email}`, {});
      if (user?.data?.length > 0) {
        if (user.data[0].password == formData.password) {
          const currentUser = user.data[0];
          successToast("You are logged in");
          const authSession = {
            token: currentUser.email,
            userId: currentUser.id,
            email: currentUser.email,
            name: currentUser.name,
            password: formData.password,
            time: new Date().toISOString(),
            rememberMe,
            provider: currentUser.provider || "password",
          };

          localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(authSession));
          navigate("/dashboard");
          setError({});
        } else {
          errorToast("Incorrect password. Please try again.");
        }
      } else {
        errorToast("User does not exists");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const googleUser = decodeGoogleCredential(credentialResponse?.credential)

    setIsGoogleSubmitting(true);

    try {
      const existingUsersResponse = await api.get("/users", {
        params: { email: googleUser.email },
      });

      let currentUser = existingUsersResponse.data?.[0];

      if (!currentUser) {
        const response = await api.post("/users", {
          name: googleUser.name || googleUser.given_name || "Google User",
          email: googleUser.email,
          password: "",
          provider: "google",
          avatar: googleUser.picture || "",
          cart: [],
        });
        currentUser = response.data;
      }
     
      const authSession = {
        token: currentUser.email,
        userId: currentUser.id,
        email: currentUser.email,
        name: currentUser.name,
        password: "",
        time: new Date().toISOString(),
        rememberMe: true,
        provider: currentUser.provider || "google",
      };

      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(authSession));
      successToast("Signed in with Google");  
      navigate("/dashboard");
    } catch (googleError) {
      console.error("Google sign-in failed:", googleError);
      errorToast("Google sign-in failed. Please try again.");
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <form onSubmit={formSubmit} className="auth-page geist-font dark:text-slate-100">
      <div className="auth-card">
        <div>
          <img src="/images/adjoe-logo.png"></img>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold tracking-[0.2px] text-heading dark:text-slate-100">
            Hi, Welcome
          </h1>
          <p className="text-light-gray auth-subtext dark:text-slate-300">
            Please login to your account
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Input
            label="email"
            placeholder="example@email.com"
            className="auth-input-width"
            startIcon="mail-icon"
            name="email"
            value={formData.email}
            error={error?.email}
            required
            onChange={onChangeValue}
          />
          <PasswordInput
            className="auth-input-width"
            label="password"
            placeholder="Input your password"
            name="password"
            value={formData.password}
            required={true}
            error={error?.password}
            onChange={onChangeValue}
          />
        </div>
        <div className="flex justify-between items-center">
          <Checkbox
            name="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            wrapClassName="cursor-pointer"
            labelClassName="text-light-gray cursor-pointer dark:text-slate-300"
            checkLabel="Remember me"
          />
          <LinkRef
            className="text-light-gray decoration-light-gray dark:text-slate-300 dark:decoration-slate-400"
            href="/forgot-password"
            text="Forgot Password?"
          />
        </div>
        {error?.api ? (
          <p className="text-sm text-red-600">{error.api}</p>
        ) : null}
        <div>
          <Button
            text="Login"
            className="w-full"
            loading={isSubmitting}
            type="submit"
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className="h-[1px] w-full bg-border-gray"></div>
          <div className="text-sm text-light-gray tracking-[-0.2px] min-w-[80px] dark:text-slate-300">
            Or login with
          </div>
          <div className="h-[1px] w-full bg-border-gray"></div>
        </div>
        {googleClientId ? (
          <div className="flex justify-center">
            {isGoogleSubmitting ? (
              <Button
                text="Connecting Google..."
                className="w-full"
                color="black"
                loading={true}
              />
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => errorToast("Failed google login")}
                text="signin_with"
                theme="outline"
                size="large"
                shape="pill"
                width="360"
              />
            )}
          </div>
        ) : (
          <p className="text-sm text-center text-red-600">
            Add `VITE_GOOGLE_CLIENT_ID` in `.env` to enable Google sign-in.
          </p>
        )}
        <div className="flex items-center justify-center gap-3">
          <div className="text-light-gray dark:text-slate-300">
            Don’t have an account?
          </div>
          <LinkRef
            href="/register"
            text="Register"
            className="text-primary font-medium"
          />
        </div>
      </div>
    </form>
  );
};

export default Login;

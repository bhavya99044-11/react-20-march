import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Button, Input, LinkRef, PasswordInput } from "@/components/common";
import { useNavigate } from "react-router-dom";
import { AUTH_SESSION_KEY } from "@/utils/constants";
import {
  capitalizeWords,
  checkValidation,
} from "../../utils/helpers";
import { registerRules } from "../../utils/validation";
import { api } from "../../utils/api";
import { decodeGoogleCredential } from "../../utils/helpers";
import { errorToast, successToast } from "@/utils/toastMessage";

const Register = () => {
  const navigate = useNavigate();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const initialFormData = {
    name: "",
    email: "",
    password: "",
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState({});

  const onChangeValue = (e) => {
    setFormData((prev) => {
      let nextValue = e.target.value.replace(/^\s+/, "");

      if (e.target.name === "name") {
        nextValue = capitalizeWords(nextValue);
      }

      const updatedData = {
        ...prev,
        [e.target.name]: nextValue,
      };
      checkValidation(
        {
          [e.target.name]: [nextValue],
        },
        registerRules,
        error,
        setError,
      );
      return updatedData;
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const errorData = await checkValidation(
      formData,
      registerRules,
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
      const existingUsersResponse = await api.get("/users", {
        params: { email: formData.email },
      });
      if (existingUsersResponse.data.length > 0) {
        setError((prev) => ({
          ...prev,
          email: "Email already exists",
        }));
        return;
      }

      await api.post("/users", {
        ...formData,
        cart: [],
      });
      setFormData(initialFormData);
      setError({});
      navigate("/login");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const googleUser = decodeGoogleCredential(credentialResponse?.credential);

    setIsGoogleSubmitting(true);

    try {
      const existing = await api.get("/users", {
        params: { email: googleUser.email },
      });

      let currentUser = existing.data?.[0];

      if (!currentUser) {
        const response = await api.post("/users", {
          name: googleUser.name || "Google User",
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
    } catch (error) {
      console.error(error);
      errorToast("Please try again.");
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
            Create your account
          </h1>
          <p className="text-light-gray auth-subtext dark:text-slate-300">
            Please register your account
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Input
            label="Name"
            placeholder="First and Last name"
            className="auth-input-width"
            startIcon="user"
            name="name"
            value={formData.name}
            required={true}
            error={error?.name}
            onChange={onChangeValue}
          />
          <Input
            label="email"
            placeholder="example@email.com"
            className="auth-input-width"
            startIcon="mail-icon"
            name="email"
            value={formData.email}
            error={error?.email}
            required={true}
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
        {error?.api ? (
          <p className="text-sm text-red-600">{error.api}</p>
        ) : null}
        <div>
          <Button
            text="Signup"
            className="w-full"
            loading={isSubmitting}
            type="submit"
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className="h-[1px] w-full bg-border-gray"></div>
          <div className="text-sm text-light-gray tracking-[-0.2px] min-w-[94px] text-center dark:text-slate-300">
            Or sign up with
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
                onError={() => errorToast("Error while signup")}
                text="signup_with"
                theme="outline"
                size="medium"
                shape="pill"
                width="360"
              />
            )}
          </div>
        ) : null}
        <div className="flex items-center justify-center gap-3">
          <div className="text-light-gray dark:text-slate-300">
            Do you have an account?
          </div>
          <LinkRef
            href="/login"
            text="login"
            className="text-primary font-medium"
          />
        </div>
      </div>
    </form>
  );
};

export default Register;

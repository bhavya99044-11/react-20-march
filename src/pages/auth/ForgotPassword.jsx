import React, { useState } from "react";
import { Button, IconComponent, Input, LinkRef } from "@/components/common";
import { useNavigate } from "react-router-dom";
import { checkValidation } from "../../utils/helpers";
import { forgotPasswordRules } from "../../utils/validation";

const ForgotPassword = () => {
  const initialFormData = {
    email: "",
  };

  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const onChangeValue = (e) => {
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [e.target.name]: e.target.value.replace(/^\s+/, ""),
      };
      checkValidation(
        {
          [e.target.name]: [e.target.value.replace(/^\s+/, "")],
        },
        forgotPasswordRules,
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
      forgotPasswordRules,
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
      
      setFormData(initialFormData);
      setError({});
      navigate("/login");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <form
      onSubmit={(e) => formSubmit(e)}
      className="auth-page geist-font dark:text-slate-100"
    >
      <div className="auth-card">
        <div>
          <img src="/images/adjoe-logo.png"></img>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold tracking-[0.2px] text-heading dark:text-slate-100">
            Forget Password
          </h1>
          <p className="text-light-gray auth-subtext dark:text-slate-300">
            No worries, we'll send you reset instructions
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Input
            label="email"
            placeholder="example@email.com"
            className="auth-input-width"
            startIcon="mail-icon"
            name="email"
            required={true}
            onChange={(e) => onChangeValue(e)}
          />
        </div>
        <div>
          <Button
            text="Send"
            type="submit"
            loading={isSubmitting}
            className="w-full"
            color="primary"
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <IconComponent icon="left-arrow" className="h-5 w-5" />
          <LinkRef
            href="/login"
            text="back"
            className="text-primary !no-underline font-medium"
          />
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;

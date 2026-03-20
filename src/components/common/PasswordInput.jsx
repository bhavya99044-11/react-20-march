import React, { useState } from "react";
import Input from "./Input";
import IconComponent from "./IconComponent";

const PasswordInput = 
  (
    {
      endIconClassName = "h-4 w-4",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        {...props}
        ref={ref}
        type={showPassword ? "text" : "password"}
        startIcon='password'
        endIcon={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="cursor-pointer"
          >
            <IconComponent
              icon={showPassword ? "close-eye" : "eye"}
              className={endIconClassName}
            />
          </button>
        }
      />
    );
  }
;

export default PasswordInput;

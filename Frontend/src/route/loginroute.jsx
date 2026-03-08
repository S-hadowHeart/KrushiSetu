import React from "react";
import { Login } from "../users/login/login";
import { RestPassworld } from "../users/login/resetPassword";
import { OtpVerify } from "../users/login/otpVerify";
import { ForgotPassworld } from "../users/login/forgetPassword";
import { Route, Routes} from "react-router-dom";

export default function LoginRoute() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="password/forgot" element={<ForgotPassworld />} />
      <Route path="password/otpverify" element={<OtpVerify />} />
      <Route path="password/reset" element={<RestPassworld />} />
    </Routes>
  );
}

import React from "react";
import { Route, Routes } from "react-router-dom";
import { Register } from "../users/Registration/registration";
import { BasicInfo } from "../users/Registration/basicinfo";
import { FarmDetails } from "../users/Registration/farmmer/farmDetails";
import { Verification } from "../users/Registration/verification";
import { Success } from "../users/Registration/success";
import { BuyerDetails } from "../users/Registration/buyer/buyerDetails";

export function RegisterRoute()
{
    return (
      <Routes>
        <Route path="/registration" element={<Register />} />

        <Route path="/farmmer/registration" element={<BasicInfo />} />
        <Route path="/buyer/registration" element={<BasicInfo />} />

        <Route path="/farmmer/farmdetails" element={<FarmDetails />} />
        <Route path="/buyer/buyerdetails" element={<BuyerDetails />} />

        <Route path="/farmmer/verification" element={<Verification />} />
        <Route path="/buyer/verification" element={<Verification />} />

        <Route path="/registration/success" element={<Success />} />
      </Routes>
    );
}
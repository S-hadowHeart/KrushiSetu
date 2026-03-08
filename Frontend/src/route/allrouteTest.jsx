import React from "react";
import CoreRoute from "./allroute";
import LoginRoute from "./loginroute";
import { NotFoundRoute } from "./notfoundRoute";




export function AllRoute()
{
    return (
      <>
        <CoreRoute />
        <LoginRoute />
        
      </>
    );
}
import { Reducer } from "@reduxjs/toolkit";
import profile from "./profile"

// Record<string, Reducer>
// “an object where each key is a string and each value is a reducer.”
// {[key: string]: Reducer}

export const slices: Record<string, Reducer> = {
    profile
}
import { Reducer } from "@reduxjs/toolkit";
import profile from "./profile"
import projects from "./projects"
import shapes from "./shapes"
import viewport from "./viewport"
// Record<string, Reducer>
// “an object where each key is a string and each value is a reducer.”
// {[key: string]: Reducer}

export const slices: Record<string, Reducer> = {
    profile,
    projects,
    shapes,
    viewport
}
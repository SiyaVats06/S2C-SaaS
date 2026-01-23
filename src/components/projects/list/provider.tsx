'use client'
import { fetchProjectsSuccess } from "@/redux/slice/projects";
import { useAppDispatch } from "@/redux/store";
import React, { useEffect } from "react";

type props = {
  children: React.ReactNode;
  initialProjects: any;
};

const ProjectsProvider = ({ children, initialProjects }: props) => {
    const dispatch= useAppDispatch()
    
  useEffect(() => {
    if(initialProjects?._valueJSON){
        const projectsData= initialProjects?._valueJSON
        dispatch(fetchProjectsSuccess({
            project: projectsData,
            total: projectsData.length
        }))
    }
  },[dispatch,initialProjects]);
  return <div>{children}</div>;
};

export default ProjectsProvider;

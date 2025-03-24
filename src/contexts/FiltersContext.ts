"use client";
import React, { Dispatch, SetStateAction } from "react";

interface FilterContextType {
  salaryRange: number[];
  setSalaryRange: Dispatch<SetStateAction<number[]>>;
  jobType: string | undefined;
  setJobType: Dispatch<SetStateAction<string | undefined>>;
  experienceLevel: string | undefined;
  setExperienceLevel: Dispatch<SetStateAction<string | undefined>>;
  datePosted: string | undefined;
  setDatePosted: Dispatch<SetStateAction<string | undefined>>;
  workMode: string | undefined;
  setWorkMode: Dispatch<SetStateAction<string | undefined>>;
  countryName: string;
  setCountryName: Dispatch<SetStateAction<string>>;
}

const FilterContext = React.createContext<FilterContextType>(
  {} as FilterContextType
);

export default FilterContext;

"use client";
import FilterContext from "@/contexts/FiltersContext";
import React, { PropsWithChildren, useContext, useState } from "react";

const FiltersProvider = ({ children }: PropsWithChildren) => {
  const [salaryRange, setSalaryRange] = useState<number[]>([]);
  const [jobType, setJobType] = useState<string>();
  const [experienceLevel, setExperienceLevel] = useState<string>();
  const [datePosted, setDatePosted] = useState<string>();
  const [workMode, setWorkMode] = useState<string>();
  const [countryName, setCountryName] = useState<string>("");

  return (
    <FilterContext.Provider
      value={{
        countryName,
        datePosted,
        experienceLevel,
        jobType,
        salaryRange,
        setCountryName,
        setDatePosted,
        setExperienceLevel,
        setJobType,
        setSalaryRange,
        setWorkMode,
        workMode,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);

export default FiltersProvider;

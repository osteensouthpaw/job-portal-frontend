import React, { PropsWithChildren } from "react";
import FiltersProvider from "./Provider";

const JobListingsLayout = ({ children }: PropsWithChildren) => {
  return <FiltersProvider>{children}</FiltersProvider>;
};

export default JobListingsLayout;

"use client";

import { createContext, ReactNode, useContext } from "react";
import { Parameter } from "@/app/core/types";

type AuthProviderProps = {
  children: ReactNode;
  data: Parameter[];
};

type ParameterContextData = {
  get(uid: string): string;
};

export function ParameterProvider({ children, data }: AuthProviderProps) {
  function get(uid: string): string {
    const parameter = data.find((parameter) => parameter.uid === uid);
    if (!parameter) {
      throw new Error(`Parameter "${uid}" not found`);
    }
    return parameter.value;
  }
  return (
    <ParameterContext.Provider
      value={{
        get,
      }}
    >
      {children}
    </ParameterContext.Provider>
  );
}

export const ParameterContext = createContext({} as ParameterContextData);
export function useParameter() {
  return useContext(ParameterContext);
}

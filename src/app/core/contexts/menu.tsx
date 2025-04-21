"use client";

import { createContext, ReactNode, useContext } from "react";
import { Menu } from "@/app/core/types";

type AuthProviderProps = {
  children: ReactNode;
  data: Menu[];
};

type ParameterContextData = {
  get(uid: string): Menu;
};

export function MenuProvider({ children, data }: AuthProviderProps) {
  function get(uid: string): Menu {
    const menu = data.find((menu) => menu.uid === uid);
    if (!menu) {
      throw new Error(`Menu "${uid}" not found`);
    }
    return menu;
  }
  return (
    <MenuContext.Provider
      value={{
        get,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export const MenuContext = createContext({} as ParameterContextData);
export function useMenu() {
  return useContext(MenuContext);
}

"use client";

import { createContext, useContext, useState } from "react";

interface HeroLoadingContextType {
  isHeroLoading: boolean;
  setIsHeroLoading: (value: boolean) => void;
}

const defaultValue: HeroLoadingContextType = {
  isHeroLoading: false,
  setIsHeroLoading: () => {},
};

const HeroLoadingContext = createContext<HeroLoadingContextType>(defaultValue);

export function HeroLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isHeroLoading, setIsHeroLoading] = useState(false);
  return (
    <HeroLoadingContext.Provider value={{ isHeroLoading, setIsHeroLoading }}>
      {children}
    </HeroLoadingContext.Provider>
  );
}

export function useHeroLoading() {
  return useContext(HeroLoadingContext);
}

import React, { useState, useContext, FC, ReactNode } from "react";

export const LoadingProviderContext = React.createContext<any>(null);

type loadingType = boolean;

export interface LoadingContextType {
  loading: loadingType;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = React.createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
});

interface Props {
  children: ReactNode;
}

export const ProfessionalNavbar = () => {};

const LoadingProvider: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <LoadingProviderContext.Provider value={{ loading, setLoading }}>
        {children}
      </LoadingProviderContext.Provider>
    </>
  );
};

export default LoadingProvider;

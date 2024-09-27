import React, { useState, useContext, FC, ReactNode } from "react";

export const ReplyProviderContext = React.createContext<any>(null);

type replyType = string | false;

export interface ReplyContextType {
  reply: replyType;
  setReply: React.Dispatch<React.SetStateAction<string | false>>;
}

export const ReplyContext = React.createContext<ReplyContextType>({
  reply: false,
  setReply: () => {},
});

interface Props {
  children: ReactNode;
}

export const ProfessionalNavbar = () => {};

const ReplyProvider: FC<Props> = ({ children }) => {
  const [reply, setReply] = useState<string | false>(false);

  return (
    <>
      <ReplyProviderContext.Provider value={{ reply, setReply }}>
        {children}
      </ReplyProviderContext.Provider>
    </>
  );
};

export default ReplyProvider;

import { createContext, useState, ReactNode } from "react";

type DashboardContextProps = {
  eventName: string;
  setEventName: (eventName: string) => void;
};

export const DashboardContext = createContext<DashboardContextProps>({
  eventName: "",
  setEventName: () => {},
});

type DashboardProviderProps = {
  children: ReactNode;
};

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const [eventName, setEventName] = useState("");

  return (
    <DashboardContext.Provider value={{ eventName, setEventName }}>
      {children}
    </DashboardContext.Provider>
  );
};

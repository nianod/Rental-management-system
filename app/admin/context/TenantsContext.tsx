"use client";
import { createContext, useContext, useState } from "react";

export interface Tenant {
  _id: string;
  name: string;
  email: string;
  phone: string;
  roomNumber: string;
  rentAmount: number;
  moveInDate: string;
  gender: "male" | "female";
  lastPayment: string;
}

type TenantsContextType = {
  tenants: Tenant[];
  setTenants: React.Dispatch<React.SetStateAction<Tenant[]>>;
};

const TenantsContext = createContext<TenantsContextType | null>(null);

export function TenantsProvider({ children }: { children: React.ReactNode }) {
  const [tenants, setTenants] = useState<Tenant[]>([]);

  return (
    <TenantsContext.Provider value={{ tenants, setTenants }}>
      {children}
    </TenantsContext.Provider>
  );
}

export function useTenants() {
  const context = useContext(TenantsContext);
  if (!context) {
    throw new Error("useTenants must be used inside TenantsProvider");
  }
  return context;
}

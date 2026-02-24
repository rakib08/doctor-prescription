import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { DoctorInfo } from "../types/prescription";


interface DoctorContextType {
  doctorInfo: DoctorInfo;
  updateDoctorInfo: (data: DoctorInfo) => void;
}

const defaultDoctor: DoctorInfo = {
  name: "",
  degree: "",
  clinicName: "",
};

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorProvider = ({ children }: { children: ReactNode }) => {
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>(defaultDoctor);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("doctorInfo");
    if (stored) {
      setDoctorInfo(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("doctorInfo", JSON.stringify(doctorInfo));
  }, [doctorInfo]);

  const updateDoctorInfo = (data: DoctorInfo) => {
    setDoctorInfo(data);
  };

  return (
    <DoctorContext.Provider value={{ doctorInfo, updateDoctorInfo }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error("useDoctor must be used within DoctorProvider");
  }
  return context;
};
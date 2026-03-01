export interface Citizen {
  id: string;
  name: string;
  state: string;
  district: string;
  income: number;
  occupation: string;
  categories: string[];
  bpl: boolean;
  age: number;
  gender: string;
}

export const citizens: Record<string, Citizen> = {
  "CIT-001": {
    id: "CIT-001",
    name: "Savitri Devi",
    state: "Maharashtra",
    district: "Pune",
    income: 4000,
    occupation: "Unemployed",
    categories: ["Widow"],
    bpl: true,
    age: 45,
    gender: "Female",
  },
  "CIT-002": {
    id: "CIT-002",
    name: "Ramesh Patil",
    state: "Maharashtra",
    district: "Kolhapur",
    income: 9000,
    occupation: "Farmer",
    categories: [],
    bpl: false,
    age: 38,
    gender: "Male",
  },
  "CIT-003": {
    id: "CIT-003",
    name: "Lakshmi Bai",
    state: "Uttar Pradesh",
    district: "Lucknow",
    income: 3000,
    occupation: "Daily Wage",
    categories: ["Senior Citizen"],
    bpl: true,
    age: 65,
    gender: "Female",
  },
  "CIT-004": {
    id: "CIT-004",
    name: "Arjun Kumar",
    state: "Bihar",
    district: "Patna",
    income: 5500,
    occupation: "Student",
    categories: [],
    bpl: true,
    age: 22,
    gender: "Male",
  },
};

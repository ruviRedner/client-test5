export interface Iorg  {
    orgName: string;
    resources: {
      name: string | null;
      amount: number;
    }[];
  
    budget: number;
  }
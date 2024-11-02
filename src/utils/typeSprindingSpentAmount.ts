import { Expenditure } from "@src/models/Expenditure";

export default function spentAmount(expenditures: Expenditure[]) {
  if (expenditures.length <= 0) return 0;

  const totalExpenditure = expenditures.reduce((total, expenditure) => {
    const amount = typeof expenditure.amount === 'string' 
                    ? parseFloat(expenditure.amount) 
                    : expenditure.amount;
    return total + amount; 
  }, 0);

  return totalExpenditure; 
}

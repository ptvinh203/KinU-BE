import { AppDataSource } from "@src/config/data-source";
import NotFoundError from "@src/errors/NotFoundError";
import { Expenditure } from "@src/models/Expenditure"
import { TypeSprinding } from "@src/models/TypeSprinding";

export default async function spentAmount(tsId: number) {
  try{
    const tsRepository = AppDataSource.getRepository(TypeSprinding)
    const typeSprinding = await tsRepository.findOne({where: {id: tsId}, relations: ['expenditure']})
    if(!typeSprinding){
      throw new NotFoundError("Không tìm thấy loại chi tiêu!")
    }
    
    let expenditures: Expenditure[] = []
    if(typeSprinding.expenditure){
      expenditures = typeSprinding.expenditure
    }
    if (expenditures.length <= 0) return 0

    const totalExpenditure = expenditures.reduce((total, expenditure) => {
      const amount = typeof expenditure.amount === 'string' 
                      ? parseFloat(expenditure.amount) 
                      : expenditure.amount;
      return total + amount; 
    }, 0);

    return totalExpenditure; 
  }catch(error){
    throw error
  }
}

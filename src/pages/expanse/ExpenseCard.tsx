import React from "react";
import { expenseDataType } from "../../redux/expanseSlice";
import { GeneralPropType } from "../../routes/AuthRoutes";

interface PropType extends GeneralPropType {
  expanse: expenseDataType;
}

function ExpenseCard({ expanse }: PropType) {
  console.log(expanse);
  return <div>ExpenseCard</div>;
}

export default ExpenseCard;

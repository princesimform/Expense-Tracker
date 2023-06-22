import React from 'react'
import { useSelector } from 'react-redux';
import { Rootstate } from '../../redux/store';
import { GeneralPropType } from '../../routes/AuthRoutes';
interface PropType extends GeneralPropType {
  groupName : string
}
function GroupWiseSetttlement({groupName , userData} : PropType) {
  const { expenseList } = useSelector(
    (state: Rootstate) => state.expenseReducer
  );

  return (
    <></>
  )
}

export default GroupWiseSetttlement
import { useEffect, useState } from "react";
const ExpenseList = (props)=>{
    const myExpenses = props.expenses.map(item=>{return(
        <li key={Math.random().toString()}>
            {item.money}{item.description}{item.category}
        </li>)
    });


    return(
        <>
        <ul>
            {myExpenses}
        </ul>
        <div>{console.log(myExpenses)}</div>
        </>
    );
}

export default ExpenseList;
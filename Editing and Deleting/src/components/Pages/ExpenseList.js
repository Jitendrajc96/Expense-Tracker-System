import { useEffect, useState } from "react";
import classes from './ExpenseList.module.css';

const ExpenseList = (props)=>{
    const myExpenses = props.expenses.map(item=>{return(
        <li key={Math.random().toString()}>
            {item.money}{item.description}{item.category}
        </li>)

        <li className={classes.list} key={Math.random().toString()}>
            <span className={classes.subList}>{item.money}</span>
            <span className={classes.subList}>{item.description}</span>
            <span className={classes.subList}> {item.category}</span>
            <button className={classes.subList1} onClick={()=>{props.deleteExpense(item)}}>Delete</button>
            <button className={classes.subList1} onClick={()=>{props.editExpense(item)}}>Edit</button>

        </li>

        )
    });


    return(
        <>
        <ul>

        <ul className={classes.mainList}>
            {myExpenses}
        </ul>


        <div>{console.log(myExpenses)}</div>
        </>
    );
}
export default ExpenseList;
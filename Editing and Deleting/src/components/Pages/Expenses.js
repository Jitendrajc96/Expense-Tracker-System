import classes from './Expenses.module.css';
import { useRef, useState, useEffect } from 'react';
import ExpenseList from './ExpenseList';
const Expenses = (props)=>{
    const enteredEmail = localStorage.getItem('email').replace('@','').replace('.','')
    console.log(enteredEmail)
    const moneyInputRef = useRef();
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();
    const [expenses, setExpenses] = useState([]);

    const deleteExpense = (item)=>{
        const filteredList = expenses.filter((lst)=>lst.description===item.description);
        for( let i = 0; i < expenses.length; i++){ 

            if ( expenses[i] === filteredList[0]) { 

                expenses.splice(i, 1); 
            }

        }
        reqPUT(expenses).then(res=>{setExpenses([...expenses])})

    }

    const editExpense = (item)=>{
        const filteredList = expenses.filter((lst)=>lst.description===item.description);
        for( let i = 0; i < expenses.length; i++){ 

            if ( expenses[i] === filteredList[0]) { 

                const money = prompt('Enter the Amount', expenses[i].money)
                const description  = prompt('Enter the Description', expenses[i].description)
                const category = prompt('Enter the Category', expenses[i].category)
                expenses.splice(i, 1,{money:money,description:description,category:category});

            }
            reqPUT(expenses).then(res=>{setExpenses([...expenses])})

        }



    }


    async function reqPUT(expenseList){
        const response = await fetch(`https://expense-tracker-244bf-default-rtdb.firebaseio.com/${enteredEmail}.json`,
        {
            method:'PUT',
            body:JSON.stringify(expenseList)
        })


    }



    async function reqPOST(expense){
        const response = await fetch(`https://expense-tracker-244bf-default-rtdb.firebaseio.com/${enteredEmail}.json`,
        {
            method:'POST',
            body:JSON.stringify(expense)
        })
        
    }
    function getInitialData(){
        const response = fetch(`https://expense-tracker-244bf-default-rtdb.firebaseio.com/${enteredEmail}.json`).
        then(res => {
            
            if(res.ok){
              return res.json()
            }else{
              return res.json().then(data => {
                let errorMessage = 'Authentication Failed';
              
                throw new Error(errorMessage);
                
              })
            }
          }).then((data) => {
            if(data===null){
                setExpenses([])

            }
            else{
                const storedData = [];
                for(let vals of Object.values(data)){
                  storedData.push(vals)
                }
                setExpenses(storedData)
            }

              const storedData = [];
              for(let vals of Object.values(data)){
                storedData.push(vals)
              }
              setExpenses(storedData)



        })
          .catch((err) =>{
            alert(err.errorMessage)
          })
        }





   useEffect(()=>{getInitialData()},[])
    function submitHandler(event){
        event.preventDefault();
        const enteredMoney = moneyInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredCategory = categoryInputRef.current.value;
        setExpenses([...expenses,{money:enteredMoney,description: enteredDescription,category:enteredCategory}])
        reqPOST({money:enteredMoney,description: enteredDescription,category:enteredCategory})
        
    }
    return(
        <>
        <section className={classes.auth}>
        <h1>EXPENSES</h1>
        
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='money'>Amount</label>
            <input type='number' id='money' required ref={moneyInputRef}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='description'>Description</label>
            <input type='text' id='description' required ref={descriptionInputRef}/>
          </div>
          <div className={classes.control}>
          <label htmlFor="cars">Choose a Category:</label>
                <select className={classes.mainSelect} id="Expense" ref={categoryInputRef}>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Bill">Bill</option>
                <option value="Other">Other</option>
                </select>
          </div>
          <div className={classes.actions}>
            <button type='submit'>Add Expense</button>
          </div>
        </form>
      </section>
      <ExpenseList expenses = {expenses}></ExpenseList>
      <ExpenseList expenses = {expenses} deleteExpense = {deleteExpense}  editExpense = {editExpense}></ExpenseList>
      </>
    );
};
export default Expenses;
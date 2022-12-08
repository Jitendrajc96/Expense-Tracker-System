import classes from './Expenses.module.css';
import { useRef, useState, useEffect } from 'react';
import ExpenseList from './ExpenseList';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store';


const Expenses = (props)=>{
    const enteredEmail = localStorage.getItem('email').replace('@','').replace('.','')
    console.log(enteredEmail)
    const moneyInputRef = useRef();
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();
    const [expenses, setExpenses] = useState([]);
    const [editingMode, setEditingMode] = useState(false)
    const [defMoney, setDefMoney] = useState('');
    const [defDes, setDefDes] = useState('');
    const [defCat, setDefCat] = useState('');
    const [splicePos, setSplicePos] = useState(null);
    const dispatch = useDispatch();
    const initialExpenses = useSelector(state=> state.Expenses)
    const totalExpense = initialExpenses.reduce((accumulator,curValue)=>parseInt(curValue.money) + accumulator,0)
    const [showPremium,setshowPremium] = useState(false);
    const premium = useSelector(state=>state.premium)




    const deleteExpense = (item)=>{
        const filteredList = expenses.filter((lst)=>lst.description===item.description);
        for( let i = 0; i < expenses.length; i++){ 
      const expensesDel = [...initialExpenses]
        const filteredList = expensesDel.filter((lst)=>lst.description===item.description);
        for( let i = 0; i < expensesDel.length; i++){ 

            if ( expenses[i] === filteredList[0]) { 
            if ( expensesDel[i] === filteredList[0]) { 

                expenses.splice(i, 1); 
                expensesDel.splice(i, 1); 
            }

        }
        reqPUT(expenses).then(res=>{setExpenses([...expenses])})
        reqPUT(expensesDel).then(res=>{dispatch(authActions.deleteExpense(expensesDel))})

    }

    const editExpense = (item)=>{
        const filteredList = expenses.filter((lst)=>lst.description===item.description);
        for( let i = 0; i < expenses.length; i++){ 
      console.log('%c' +item.category,'color:red;font-Weight:1000')
      setEditingMode(true)
      setDefMoney(item.money);
      setDefDes(item.description);
      setDefCat(item.category);
        const expenseEd = [...initialExpenses]
        const filteredList = expenseEd.filter((lst)=>lst.description===item.description);
        for( let i = 0; i < expenseEd.length; i++){ 

            if ( expenses[i] === filteredList[0]) { 
            if ( expenseEd[i] === filteredList[0]) { 

                const money = prompt('Enter the Amount', expenses[i].money)
                const description  = prompt('Enter the Description', expenses[i].description)
                const category = prompt('Enter the Category', expenses[i].category)
                expenses.splice(i, 1,{money:money,description:description,category:category});

              setSplicePos(i);

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
                //setExpenses([])
                dispatch(authActions.initialExpenses([]))

            }
            else{
                const storedData = [];
                for(let vals of Object.values(data)){
                  storedData.push(vals)
                }
                setExpenses(storedData)
                //setExpenses(storedData)
                dispatch(authActions.initialExpenses(storedData))
            }


            
            
        })
          .catch((err) =>{
            alert(err.errorMessage)
          })

          const premiumStatus = !!localStorage.getItem('premiumStatus')
          dispatch(authActions.checkPremium(premiumStatus))
        }





   useEffect(()=>{getInitialData()},[])

    function submitHandler(event){
        event.preventDefault();
        const enteredMoney = moneyInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredCategory = categoryInputRef.current.value;
        setExpenses([...expenses,{money:enteredMoney,description: enteredDescription,category:enteredCategory}])
        reqPOST({money:enteredMoney,description: enteredDescription,category:enteredCategory})
        if(editingMode===false){
            const enteredMoney = moneyInputRef.current.value;
            const enteredDescription = descriptionInputRef.current.value;
            const enteredCategory = categoryInputRef.current.value;
            //setExpenses([...expenses,{money:enteredMoney,description: enteredDescription,category:enteredCategory}])
            if(parseInt(enteredMoney) + totalExpense<1000 || premium  ){
              dispatch(authActions.addExpense({money:enteredMoney,description: enteredDescription,category:enteredCategory}))
              reqPOST({money:enteredMoney,description: enteredDescription,category:enteredCategory})
            }else{
              //setPremium(true)
              //dispatch(authActions.premiumToggle())

              setshowPremium(true);

            }

        }
        else{
          const expensesEd = [...initialExpenses];
            const enteredMoney = moneyInputRef.current.value;
            const enteredDescription = descriptionInputRef.current.value;
            const enteredCategory = categoryInputRef.current.value;
            expensesEd.splice(splicePos, 1,{money:enteredMoney,description:enteredDescription,category:enteredCategory});
            reqPUT(expensesEd).then(res=> {dispatch(authActions.editExpense(expensesEd))}).then(res=>{setEditingMode(false)})



        }


    }

    function premiumFeatures(){

      dispatch(authActions.premiumToggle());
      alert('Premium Activated!')
      setshowPremium(false);
      localStorage.setItem('premiumStatus',true)

    }


    return(
        <>
        <section className={classes.auth}>
        <h1>EXPENSES</h1>
         <h1>{editingMode ?  'EDIT EXPENSE' :'EXPENSES' }</h1>


        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='money'>Amount</label>
            <input type='number' id='money' required ref={moneyInputRef}/>
            <input type='number' id='money' required ref={moneyInputRef} defaultValue={defMoney} style={{backgroundColor: editingMode ? 'lightpink' : '#f1e1fc'}}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='description'>Description</label>
            <input type='text' id='description' required ref={descriptionInputRef}/>
            <input type='text' id='description' required ref={descriptionInputRef} defaultValue={defDes} style={{backgroundColor: editingMode ? 'lightpink' : '#f1e1fc'}}/>
          </div>
          <div className={classes.control}>
          <label htmlFor="cars">Choose a Category:</label>
                <select className={classes.mainSelect} id="Expense" ref={categoryInputRef}>
                <select className={classes.mainSelect} id="Expense" ref={categoryInputRef} defaultValue={defCat} style={{backgroundColor: editingMode ? 'lightpink' : '#f1e1fc'}}>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Travel" >Travel</option>
                <option value="Bill">Bill</option>
                <option value="Other">Other</option>
                </select>

          </div>
          <div className={classes.actions}>
            <button type='submit'>Add Expense</button>
            <button type='submit'>{editingMode ?  'DONE' :'ADD EXPENSE' }</button>
          </div>
          {showPremium && <div className={classes.actions}>
            <button onClick={premiumFeatures}> Activate Premium</button>
          </div>}
        </form>
      </section>
      <ExpenseList expenses = {expenses} deleteExpense = {deleteExpense}  editExpense = {editExpense}></ExpenseList>
   <ExpenseList expenses ={initialExpenses} /*{expenses}*/   deleteExpense = {deleteExpense}  editExpense = {editExpense}></ExpenseList>

      </>
    );
};
export default Expenses;
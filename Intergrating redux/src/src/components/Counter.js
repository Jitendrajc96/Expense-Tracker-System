import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux/es/exports';

const Counter = () => {
  const toggleCounterHandler = () => {};
  const counter = useSelector(state=>state.counter);
  const dispatch = useDispatch();
  const IncrementHandler = ()=>{
    dispatch({type:'increment'})

  };
  const DecrementHandler = ()=>{
    dispatch({type:'decrement'})

  };
  const Increment2Handler = ()=>{
    dispatch({type:'increment2'})

  };
  const Decrement2Handler = ()=>{
    dispatch({type:'decrement2'})

  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
      <div>
        <button onClick={IncrementHandler} >Increment</button>
        <button onClick={DecrementHandler}>Decrement</button>
        <button onClick={Increment2Handler}>Increment2</button>
        <button onClick={Decrement2Handler}>Decrement2</button>
      </div>
    </main>
  );
};

export default Counter;
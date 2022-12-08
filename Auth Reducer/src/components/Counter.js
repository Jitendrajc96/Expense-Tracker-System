import { useSelector, useDispatch } from 'react-redux';

import { counterActions } from '../store/index';
import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux/es/exports';

const Counter = () => {
  const toggleCounterHandler = () => {};
  const counter = useSelector(state=>state.counter);
  const dispatch = useDispatch();
  const IncrementHandler = ()=>{
    dispatch({type:'increment'})
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };
  const DecrementHandler = ()=>{
    dispatch({type:'decrement'})

  const increaseHandler = () => {
    dispatch(counterActions.increase(10)); // { type: SOME_UNIQUE_IDENTIFIER, payload: 10 }
  };
  const Increment2Handler = ()=>{
    dispatch({type:'increment2'})

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };
  const Decrement2Handler = ()=>{
    dispatch({type:'decrement2'})

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={IncrementHandler} >Increment</button>
        <button onClick={DecrementHandler}>Decrement</button>
        <button onClick={Increment2Handler}>Increment2</button>
        <button onClick={Decrement2Handler}>Decrement2</button>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
export default Counter;
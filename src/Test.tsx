// import { useReducer } from "react";

// type State = {
//   count: number;
// }

// type Action = | { type: "increment"} | { type: "decrement"} | { type: "reset" }

// const reducerFunction = (state: State, action: Action) => {
//   switch (action.type) {
//     case "increment":
//       return { count: state.count + 1};
//     case "decrement":
//       return { count: state.count - 1};
//     case "reset":
//       return { count: 0};
//   }
// }


// const TestComponent: React.FC = () => {

//   const [state, dispatch] = useReducer(reducerFunction, { count: 0 });

//   return (
//     <>
//       <button onClick={() => dispatch({type: "increment"})}>+ 1</button>
//       <button onClick={() => dispatch({type: "decrement"})}>- 1</button>
//       <button onClick={() => dispatch({type: "reset"})}>0</button>
//     </>
//   );
// }

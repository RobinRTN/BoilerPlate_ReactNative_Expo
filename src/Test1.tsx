// // import { useState, useMemo, useEffect } from "react";

// // const ParsedDataComponent: React.FC = () => {
// //   const [data, setData] = useState([]);
// //   const [query, setQuery] = useState('');

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await fetch('https://jsonplaceholder.typicode.com/posts');
// //         const data = response.json();
// //         setData(data);
// //       } catch {
// //         console.error("Error")
// //       }
// //     }
// //     fetchData();
// //   }, []);

// //   const parsedData = useMemo(() => {
// //     console.log("Parsing data...");
// //     return data.map(item => ({id: item.id, title: item.title.toUpperCase() }));
// //   }, [data]);

// //   const filteredData = useMemo(() => {
// //     console.log("Filtering data...");
// //     return parsedData.filter(item => item.title.includes(query.toUpperCase()))
// //   }, [parsedData, query]);


// //   return (
// //     <div>
// //       <input type="text"
// //       placeholder="Enter here"
// //       onChange={(e) => setQuery(e.target.value)}
// //       value={query}
// //       />
// //       {filteredData.map(item => (
// //         <li>{item.title}</li>
// //       ))}
// //     </div>
// //   )
// // }

// // import React from 'react'

// // type ItemComponentProps = {
// //   name: string;
// //   count: number;
// //   onIncrement: () => void;
// // }

// // const ItemComponent: React.FC<ItemComponentProps> = React.memo(({name, count, onIncrement}) => {
// //   return (
// //     <div>
// //       <p>{name}: {count}</p>
// //       <button onClick={onIncrement}>Increment</button>
// //     </div>
// //   );
// // })


// // export default ItemComponent;

// import React, { useState, useCallback } from 'react';
// import ItemComponent from './ItemComponent';

// const ListComponent: React.FC = () => {
//   const [items, setItems] = useState([
//     {id: 1, name: 'Robin', count: 0},
//     {id: 2, name: 'Thomas', count: 3},
//     {id: 3, name: 'Nicolas', count: 2}
//   ])

//   const handleIncrement = useCallback((id: number) => {
//     setItems((prevItems =>
//       prevItems.map(item => item.id === id ? { ...item, item.count + 1} : item)
//     ))
//   }, []);

//   return (
//     <div>
//       {items.map(item => (
//         <ItemComponent  />
//       ))}
//     </div>
//   )
// }

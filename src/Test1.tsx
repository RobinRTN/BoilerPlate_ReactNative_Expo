// import { useState, useMemo, useEffect } from "react";

// const ParsedDataComponent: React.FC = () => {
//   const [data, setData] = useState([]);
//   const [query, setQuery] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//         const data = response.json();
//         setData(data);
//       } catch {
//         console.error("Error")
//       }
//     }
//     fetchData();
//   }, []);

//   const parsedData = useMemo(() => {
//     console.log("Parsing data...");
//     return data.map(item => ({id: item.id, title: item.title.toUpperCase() }));
//   }, [data]);

//   const filteredData = useMemo(() => {
//     console.log("Filtering data...");
//     return parsedData.filter(item => item.title.includes(query.toUpperCase()))
//   }, [parsedData, query]);


//   return (
//     <div>
//       <input type="text"
//       placeholder="Enter here"
//       onChange={(e) => setQuery(e.target.value)}
//       value={query}
//       />
//       {filteredData.map(item => (
//         <li>{item.title}</li>
//       ))}
//     </div>
//   )
// }

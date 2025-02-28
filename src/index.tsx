// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// import {
//   ApolloClient,
//   InMemoryCache,
//   // ApolloProvider,
//   // gql,
// } from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import App from "./App";

// let client = new ApolloClient({
//   uri: "http://localhost:4000/",
//   cache: new InMemoryCache(),
// });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* <ApolloProvider client={client}> */}
    <RouterProvider router={router} />
    {/* </ApolloProvider> */}
  </React.StrictMode>
);

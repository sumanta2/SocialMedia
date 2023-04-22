import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux"
import store from "./store/ReduxStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {QueryClient,QueryClientProvider} from "@tanstack/react-query"

ReactDOM.render(
  <Provider store={store}>
    {/* <QueryClientProvider  client={new QueryClient()}> */}
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App/>}/>
        </Routes>
        </BrowserRouter>
      {/* </QueryClientProvider> */}
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

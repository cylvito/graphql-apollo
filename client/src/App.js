import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/layout/Home";
import DetailList from "./components/layout/DetailList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/people/:id" element={<DetailList />} />
          </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

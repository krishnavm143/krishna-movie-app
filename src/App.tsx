import { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { getApiConfigurationStart } from "./redux/slice/homeSlice";

import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Details } from "./pages/details";
import { SearchResult } from "./pages/search-result";
import { Explore } from "./pages/explore";
import { PageNotFound } from "./pages/page-not-found";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { constants } from "./constants";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getApiConfigurationStart({ url: constants?.CONFIG_PATH, params: "" })
    );
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

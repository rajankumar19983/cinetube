import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import MyAccount from "./pages/MyAccount";
import Details from "./pages/Details";
import SearchResult from "./pages/SearchResults";
import Explore from "./pages/Explore";
import PageNotFound from "./pages/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromApi } from "./utils/fetchData";
import { getApiConfiguration, getGenres } from "./store/homePageSlice";

function App() {
  const dispatch = useDispatch();
  const url = useSelector((store) => store.home.url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
      .then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };
        dispatch(getApiConfiguration(url));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};
    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };

  return (
    <main className="bg-black_1">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/signin"
          element={<SignIn />}
        />
        <Route
          path="/account"
          element={<MyAccount />}
        />
        <Route
          path="/:mediaType/:id"
          element={<Details />}
        />
        <Route
          path="/search/:query"
          element={<SearchResult />}
        />
        <Route
          path="/explore/:mediaType"
          element={<Explore />}
        />
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;

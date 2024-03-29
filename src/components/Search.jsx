import { useEffect, useState } from "react";
import { BoxLoading } from "react-loadingg";
import Items from "./items";
import axios from "axios";
function Search() {
  const [Movie, setMovie] = useState({});
  const [input, setInput] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(true);

  useEffect(() => setMovie({}), []);
  // useEffect(() => setFound(true), []);
  setTimeout(() => {
    setError("");
  }, 3000);

  const handleInput = (event) => {
    setInput(event.target.value);
  };
  const key = "5fe4318a";
  let url = `http://www.omdbapi.com/?t=${input}&apikey=${key}`;
  function validateForm() {
    if (input === null || input === "" || input === " ") {
      alert("Type in a movie Name");

      return false;
    } else searchMovie();

    setLoading(true);
  }
  // const handleClick = () => {}
  function isEmptyObject(obj) {
    if (
      typeof obj === "object" &&
      obj != null &&
      Object.keys(obj).length !== 0
    ) {
      // setFound(false);

      console.log(Object.keys(obj).length);
    } else {
      // setFound(true);
      console.log(Object.keys(obj).length);
    }
  }

  const searchMovie = () => {
    axios
      .get(url)
      .then((response) => {
        if (response.data.Response === "False") {
          setError(response.data.Error);
        }
        setMovie(response.data);
        setLoading(false);
        isEmptyObject(Movie);
        console.log(response);
      })
      .catch((e) => {
        console.log(e.response);
        setError("NETWORK ERROR");
        setLoading(false);
      });
  };
  const handleKeypress = (e) => {
    if (e.keyCode === "Enter") {
      validateForm();
      console.log("dtfyguhkj");
    }
  };

  // const searchMovie = () => {
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       setMovie(response.data);
  //       setLoading(false);
  //       isEmptyObject(Movie);
  //     })
  //     .catch((e) => {
  //       console.log(e.response);
  //     });
  // };

  return (
    <div className="w-full min-h-[20px] py-4 bg-blue-400   flex items-center flex-col  justify-center h-fit ">
      <div className="flex justify-center">
        <div className=" xl:w-96">
          <div className="input-group relative flex space-x-6  items-stretch w-full ">
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Search for Movies"
              aria-label="Search"
              aria-describedby="button-addon2"
              onChange={handleInput}
              onKeyPress={handleKeypress}
            />
            <button
              className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  items-center"
              type="submit"
              id="button-addon2"
              onClick={validateForm}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {Loading ? (
        <div className="relative pt-6 mt-6">
          <BoxLoading class="abs" color="#010101" />;
        </div>
      ) : (
        <div className=" pt-2  gap-4 ">
          <Items Movie={Movie} />
        </div>
      )}

      {Movie && <p className="text-4xl font-bold text-red-800">{Error}</p>}
      {/* {!Loading && <div> {Movie && <div>NOTHING WAS FOUND</div>}</div>} */}
      {/* {!Loading && !Found && Movie && <div> NOTHING WAS FOUND </div>} */}
    </div>
  );
}
export default Search;

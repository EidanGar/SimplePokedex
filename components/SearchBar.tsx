import { Form } from "react-bootstrap";
import { ReducerTypes, Pokemon } from "../pages";
import PokemonAppData from "../pages/PokemonContext";
import PokemonData from "../public/pokemon";
import { useContext } from "react";

const SearchBar = () => {
  const { dispatch } = useContext(PokemonAppData);

  const setSearch = (val: string) => {
    dispatch({
      type: ReducerTypes.SET_SEARCH,
      payload: String(val)
    });
    dispatch({
      type: ReducerTypes.SET_PAGE,
      payload: 1
    });

    const filteredPokemonArray = PokemonData.filter((p: Pokemon) =>
      p.name.english.toLowerCase().includes(String(val).toLowerCase())
    );

    dispatch({
      type: ReducerTypes.SET_DATA,
      payload: filteredPokemonArray
    });
  };

  return (
    <Form.Control
      onChange={(e) => setSearch(e.target.value)}
      type="text"
      placeholder="Pokemon name"
      className="mb-3 w-50 mx-auto"
    />
  );
};

export default SearchBar;

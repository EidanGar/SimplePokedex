import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import PokemonData from "../public/pokemon";
import React from "react";
import PokemonAppData from "./PokemonContext";

// All App Components
import SearchBar from "../components/SearchBar";
import PokemonList from "../components/PokemonList";
import PokemonInfoCard from "../components/PokemonInfoCard";
import Pagination from "../components/Pagination";

// Types, Interfaces, and Enums
interface PokemonNames {
  english: string;
  japanese?: string;
  chinese?: string;
  french?: string;
}

interface PokemonStats {
  HP: number;
  Attack: number;
  Defense: number;
  "Sp. Attack": number;
  "Sp. Defense": number;
  Speed: number;
}

export type Pokemon = {
  id: number;
  name: PokemonNames;
  type: string[];
  base: PokemonStats;
};

export type StateObject = {
  search: string;
  page: number;
  selected: Pokemon;
  data: Pokemon[];
};

export enum ReducerTypes {
  SET_SEARCH = "SET_SEARCH",
  SET_PAGE = "SET_PAGE",
  SET_SELECTED = "SET_SELECTED",
  SET_DATA = "SET_DATA"
}

type ReducerPayloads = {
  [ReducerTypes.SET_SEARCH]: string;
  [ReducerTypes.SET_PAGE]: number;
  [ReducerTypes.SET_SELECTED]: Pokemon;
  [ReducerTypes.SET_DATA]: Pokemon[];
};

export type StateAction = {
  type: ReducerTypes;
  payload: ReducerPayloads[ReducerTypes];
};

export const initialState: StateObject = {
  search: "",
  page: 1,
  selected: PokemonData[0],
  data: PokemonData
};

// Handle all possible values of the ReducerTypes enum in the reducer function
function reducer(state: StateObject, action: StateAction): StateObject {
  switch (action.type) {
    case ReducerTypes.SET_SEARCH:
      return { ...state, search: String(action.payload) };
    case ReducerTypes.SET_PAGE:
      return { ...state, page: +action.payload };
    case ReducerTypes.SET_SELECTED:
      return { ...state, selected: action.payload as Pokemon };
    case ReducerTypes.SET_DATA:
      return { ...state, data: action.payload as Pokemon[] };
    default:
      throw new Error("Not such type");
  }
}

const Home = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { page, selected, data, search } = state;

  const AppProps = {
    page,
    selected,
    data,
    search,
    dispatch
  };

  return (
    <PokemonAppData.Provider value={AppProps}>
      <Container className="p-4 d-flex flex-column min-vh-100 min-vw-100">
        <h1 className="text-center">Pokemon Search</h1>
        <SearchBar />
        <PokemonList />
        <PokemonInfoCard />
        <Pagination />
      </Container>
    </PokemonAppData.Provider>
  );
};

export default Home;

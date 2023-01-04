import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { Pokemon, ReducerTypes } from "../pages";
import PokemonAppData from "../pages/PokemonContext";

const PokemonList = () => {
  const { dispatch, data, page, selected } = useContext(PokemonAppData);
  type PokemonRowProps = {
    pokemon: Pokemon;
  };

  const PokemonRow: React.FC<PokemonRowProps> = React.memo(({ pokemon }) => {
    const rowStyles: React.CSSProperties = {
      userSelect: "none",
      cursor: "pointer"
    };

    return (
      <tr
        onClick={() => {
          const newSelected = data.filter(
            (a: Pokemon) => a["id"] === pokemon.id
          )[0];
          if (JSON.stringify(selected) === JSON.stringify(newSelected)) return;
          dispatch({
            type: ReducerTypes.SET_SELECTED,
            payload: newSelected
          });
        }}
        style={rowStyles}
      >
        {typeof window !== "undefined" && window.innerWidth > 600 && (
          <td>{pokemon.id}</td>
        )}
        <td>{pokemon.name.english}</td>
        <td>{pokemon.type.join(", ")}</td>
      </tr>
    );
  });

  const PokemonArray = data
    ? data
        .slice(+page * 20 - 20, +page * 20)
        .map((pokemon: Pokemon) => (
          <PokemonRow pokemon={pokemon} key={pokemon.id} />
        ))
    : null;

  const NotFoundStyles: React.CSSProperties = {};

  const PokemonNotFound = () => {
    console.log(PokemonArray);
    return (
      <h2 style={NotFoundStyles} className="text-center mt-5 text-danger">
        Pokemon Not Found.
      </h2>
    );
  };

  return (PokemonArray && PokemonArray.length) === 0 ? (
    PokemonNotFound()
  ) : (
    <Table className="w-75 position-relative" bordered striped hover>
      <thead>
        <tr>
          {typeof window !== "undefined" && window.innerWidth > 600 && (
            <th>ID</th>
          )}
          <th>Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>{PokemonArray}</tbody>
    </Table>
  );
};

export default PokemonList;

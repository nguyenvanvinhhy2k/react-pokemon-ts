import React from "react";
import { PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";
import { Detail } from "../App";

interface Props {
  pokemons: PokemonDetail[];
  viewDetail: Detail;
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonColection: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setViewDetail } = props;

  const selecPokemon = (id: number) => {
    if (!viewDetail.isOpened)
      setViewDetail({
        id: id,
        isOpened: true,
      });
  };
  return (
    <>
      <section
        className={
          viewDetail.isOpened
            ? "collection-container-active "
            : "collection-container"
        }
      >
        {viewDetail.isOpened ? (
          <div className="overlay"></div>
        ) : (
          <div className=""></div>
        )}
        {pokemons.map((pokemon) => {
          return (
            <div onClick={() => selecPokemon(pokemon.id)}>
              <PokemonList
                key={pokemon.id}
                viewDetail={viewDetail}
                setViewDetail={setViewDetail}
                name={pokemon.name}
                id={pokemon.id}
                abilities={pokemon.abilities}
                image={pokemon.sprites.front_default}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default PokemonColection;

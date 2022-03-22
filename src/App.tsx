import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import PokemonColection from "./components/PokemonColection";
import { Pokemon } from "./interface";

interface Pokemons {
  name: string;
  url: string;
}

export interface Detail {
  id: number;
  isOpened: boolean;
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetail, setViewDetail] = useState<Detail>({
    id: 0,
    isOpened: false,
  });
  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemon((p) => [...p, poke.data]);
        console.log(poke.data);
        setLoading(false);
      });
    };
    getPokemon();
  }, []);

  const nextPage = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemon((p) => [...p, poke.data]);
      setLoading(false);
    });
  };
  return (
    <div
      className={
        viewDetail.isOpened
          ? "collection-container-active "
          : "collection-container"
      }
    >
      <div className="container">
        <header className="pokemon-header">Top88.com</header>
        <PokemonColection
          pokemons={pokemon}
          viewDetail={viewDetail}
          setViewDetail={setViewDetail}
        />
        {!viewDetail.isOpened && (
          <div className="btn">
            <button onClick={nextPage}>
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

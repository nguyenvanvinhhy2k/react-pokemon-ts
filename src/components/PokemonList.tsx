import { useState, useEffect } from "react";
import "./pokemon.css";
import { Detail } from "../App";

interface Props {
  viewDetail: Detail;
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | any;
  name: string;
  id: number;
  image: string;
}

const PokemonList: React.FC<Props> = (props) => {
  const { name, id, image, abilities, viewDetail, setViewDetail } = props;
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    setIsSelected(id === viewDetail?.id);
  }, [viewDetail]);

  const closeDetail = () => {
    setViewDetail({
      id: 0,
      isOpened: false,
    });
  };
  return (
    <>
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={closeDetail}>
              X
            </p>
            <div className="detai-info">
              <img src={image} alt={name} className="detail-img" />
            </div>
            <p className="detail-name">{name}</p>
            <div className="detail-skill">
              <p className="detail-ability">Ablity:</p>
              {abilities.map((ab: any) => {
                return <div className="">{ab.ability.name}</div>;
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name">{name}</p>
          <img src={image} alt={name} />
        </section>
      )}
    </>
  );
};

export default PokemonList;

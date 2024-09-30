import { useEffect, useState } from "react";

export const PokemonGalleryFetch = () => {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // Función para obtener detalles adicionales de cada Pokémon (como su imagen)
  const fetchPokemonDetails = async (pokemonList) => {
    const pokemonData = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return {
          name: data.name,
          image: data.sprites.front_default, // Imagen del Pokémon
        };
      })
    );
    return pokemonData;
  };

  const fetchData = async (loadMore = false) => {
    try {
      // La API de Pokémon usa offset y limit para la paginación
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`
      );
      const data = await response.json();

      const pokemonDetails = await fetchPokemonDetails(data.results);

      if (loadMore) {
        setPokemons((prevPokemons) => [...prevPokemons, ...pokemonDetails]);
      } else {
        setPokemons(pokemonDetails);
      }
    } catch (error) {
      console.log("Error al realizar la solicitud", error);
      setError("Error al realizar la solicitud");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]); // Cuando la página cambia, carga nuevos datos

  const loadMorePokemons = () => {
    setPage((prevPage) => prevPage + 1); // Avanza a la siguiente página
  };

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center text-white mb-4">Galería de Pokémon</h2>

      {/* Contenedor para mostrar los Pokémon */}
      <div className="row overflow-auto vh-80 scrollable-container">
        {pokemons.map((pokemon, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 d-flex flex-column">
              <img src={pokemon.image} className="fixed-img" alt={pokemon.name} />
              <div className="card-body">
                <h5 className="card-title text-center">{pokemon.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón para cargar más Pokémon */}
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={loadMorePokemons}>
          Cargar más Pokémon
        </button>
      </div>
    </div>
  );
};

'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MovieRoute = ({ data }) => {
  const users = data?.users ?? [];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [visibleCount, setVisibleCount] = useState(6); // Start with 6 movies

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setVisibleCount(6); // Reset count on new search
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setVisibleCount(6); // Reset count on new genre selection
  };

  // Filter movies by title and genre
  const filteredMovies = users.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre
      ? movie.genra.toLowerCase() === selectedGenre.toLowerCase()
      : true;
    return matchesSearch && matchesGenre;
  });

  // Show only a certain number of movies
  const visibleMovies = filteredMovies.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="">
      {/* Search and Genre Filter */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search "
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-md w-2/5"
        />

        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="px-4 py-2 border rounded-md w-2/5"
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Sci-fi">Sci-fi</option>
          <option value="Romantic">Romantic</option>
          {/* Add more genres here */}
        </select>
      </div>
      <div className='container '>
      {/* Movies */}
      {visibleMovies.length > 0 ? (
        visibleMovies.map((item) => (
          
          <div key={item._id} className="card">
            <Link href={`/movies/${encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-'))}`}>
              <div className=" ">
                
                <Image src={item.img} width={300} height={500} alt={item.title}  className='rounded'/>
                <p className="text-lg font-semibold ">{item.title}</p>
              </div>
            </Link>
          </div>
          
        ))
      ) : (
        <p>No movies found</p>
      )}
      </div>



      {/* Load More Button */}
      {visibleCount < filteredMovies.length && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieRoute;

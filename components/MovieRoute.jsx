'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { FaArrowUp, FaSearch } from 'react-icons/fa';

const MovieRoute = ({ data }) => {
  const users = data?.users ?? [];

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  // Show Back to Top Button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setVisibleCount(6);
  };

  const filteredMovies = users.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre
      ? movie.genra.toLowerCase() === selectedGenre.toLowerCase()
      : true;
    return matchesSearch && matchesGenre;
  });

  const visibleMovies = filteredMovies.slice(0, visibleCount);

  return (
    <>
      {/* Search Bar Like Plex */}
      {/* Mobile-only Search Bar */}
<div className="p-4 md:hidden">
  <div className="relative">
    <input
      type="text"
      placeholder="Search movies..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="w-full pl-10 pr-4 py-3 rounded-full bg-white text-gray-900 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
  </div>
</div>


      {/* Genre Filter */}
      <div className="p-4 flex flex-wrap gap-2 justify-center">
        {['All', 'Action', 'Drama', 'Comedy', 'Sci-fi', 'Horror', 'Romantic'].map((genre) => (
          <button
            key={genre}
            onClick={() => {
              setSelectedGenre(genre === 'All' ? '' : genre);
              setVisibleCount(6);
            }}
            className={`px-4 py-2 rounded-full border transition shadow-md ${
              selectedGenre === genre || (genre === 'All' && !selectedGenre)
                ? 'bg-blue-600 text-white shadow-[0_4px_0_#1e40af]'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Movie Grid */}
      <div className="p-4">
        {visibleMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {visibleMovies.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"
              >
                <Link
                  href={`/movies/${encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-'))}`}
                >
                  <div>
                    <Image
                      src={item.img}
                      width={300}
                      height={500}
                      alt={item.title}
                      className="rounded-t-lg w-full object-cover"
                    />
                    <div className="p-2">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-yellow-400 h-4 w-4 ${
                              i < Math.round(item.rating || 15)
                                ? 'fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          ({item.rating ?? '0'})
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">No movies found</p>
        )}
      </div>

      {/* Load More */}
      {visibleCount < filteredMovies.length && (
        <div className="text-center mt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
          title="Back to Top"
        >
          <FaArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default MovieRoute;

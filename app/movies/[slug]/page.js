import Image from 'next/image';

// Mock function, replace with real DB query
const getAllMovies = async () => {
  const res = await fetch('http://localhost:3000/api/movie'); // or your live API
  const data = await res.json();
  return data.users || [];
};

const SingleMoviePage = async ({ params }) => {
  const slug = decodeURIComponent(params.slug).toLowerCase(); // Ensure lowercase and decoding
  const movies = await getAllMovies();

  // Find the movie based on the slug
  const movie = movies.find((m) => m.title.toLowerCase().replace(/\s+/g, '-') === slug);

  if (!movie) return <div className="text-center mt-10">Movie not found</div>;

  // Find related movies based on genre
  const related = movies.filter(
    (m) => m.genra.toLowerCase() === movie.genra.toLowerCase() && m._id !== movie._id
  );

  return (
    <div className="w-8/12 mx-auto mt-8 space-y-4">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <Image src={movie.img} width={600} height={350} alt={movie.title} />
      <p className="text-gray-600 mt-2">{movie.dec}</p>
      <p className="mt-2"><strong>Genre:</strong> {movie.genra}</p>
      <a
        href={movie.link}
        target="_blank"
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        Download ({movie.quality})
      </a>

      {/* Suggested Movies */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">More like this</h2>
        <div className="grid grid-cols-2 gap-4">
          {related.slice(0, 4).map((r) => (
            <a key={r._id} href={`/movies/${encodeURIComponent(r.title.toLowerCase().replace(/\s+/g, '-'))}`}>
              <div className="border rounded-md p-2 hover:shadow-lg">
                <Image src={r.img} width={300} height={150} alt={r.title} />
                <h3 className="mt-1 text-lg font-medium">{r.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleMoviePage;

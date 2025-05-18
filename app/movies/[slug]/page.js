import Image from 'next/image';

// Mock function, replace with real DB query
const getAllMovies = async () => {
  const res = await fetch('https://www.starxmovies.in'); //  live API for test https://www.allinoneitservice.shop/
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
          <h1 className="text-3xl font-bold ">{movie.title}</h1>
          <Image src={movie.img} width={600} height={350} alt={movie.title} />
          <p className="text-gray-600 mt-2">{movie.dec}</p>
          
          {/* Additional Images */}
          <div className="grid gap-4">
      {/* Main Image */}
      <div>
        <Image
          className="h-auto max-w-full rounded-lg"
          src={movie.img}
          alt={movie.title}
          width={800}
          height={450}
        />
      </div>
      
      {/* Thumbnail Images */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movie.img1 && (
          <Image
            className="h-auto max-w-full rounded-lg"
            src={movie.img1}
            alt={`${movie.title} image 1`}
            width={200}
            height={120}
          />
        )}
        {movie.img2 && (
          <Image
            className="h-auto max-w-full rounded-lg"
            src={movie.img2}
            alt={`${movie.title} image 2`}
            width={200}
            height={120}
          />
        )}
        {movie.img3 && (
          <Image
            className="h-auto max-w-full rounded-lg"
            src={movie.img3}
            alt={`${movie.title} image 3`}
            width={200}
            height={120}
          />
        )}
        {/* Add more images if available */}
      </div>
    </div>
    
          {/* Movie Details */}
          <div className="mt-4">
            <p><strong>Genre:</strong> {movie.genra}</p>
            <p><strong>Runtime:</strong> {movie.runtime}</p>
            <p><strong>Language:</strong> {movie.language}</p>
            <p><strong>Release Date:</strong> {movie.date}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <h3><strong>Tags:</strong>  {[movie.tag, movie.tag2, movie.tag3].filter(Boolean).join(', ')}</h3>
          </div>
    
          {/* Download Link */}
          <a
            href={movie.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
          >
            Download
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

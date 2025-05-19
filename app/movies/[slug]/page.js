import Image from 'next/image';
import Script from 'next/script';

const getAllMovies = async () => {
  const res = await fetch('https://www.allinoneitservice.shop/api/movie', {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data.users || [];
};

// ✅ SEO metadata
export async function generateMetadata({ params }) {
  const slug = params.slug.toLowerCase();
  const movies = await getAllMovies();
  const movie = movies.find(
    (m) => m.title.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!movie) {
    return {
      title: 'Movie Not Found',
      description: 'No movie found for the requested page.',
    };
  }

  return {
    title: `${movie.title} | Download & Watch`,
    description: movie.dec || `Watch or download ${movie.title}`,
    openGraph: {
      title: `${movie.title} | Download & Watch`,
      description: movie.dec,
      images: [
        {
          url: movie.img,
          width: 1200,
          height: 630,
          alt: movie.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${movie.title} | Download & Watch`,
      description: movie.dec,
      images: [movie.img],
    },
  };
}

const SingleMoviePage = async ({ params }) => {
  const slug = params.slug.toLowerCase();
  const movies = await getAllMovies();
  const movie = movies.find(
    (m) => m.title.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!movie)
    return (
      <div className="text-center mt-10 text-red-500">Movie not found</div>
    );

  const related = movies.filter(
    (m) =>
      m.genra.toLowerCase() === movie.genra.toLowerCase() &&
      m._id !== movie._id
  );

  return (
    <div className="w-11/12 lg:w-8/12 mx-auto mt-10 text-gray-800 dark:text-gray-1000">

      {/* JSON-LD Schema for SEO */}
      <Script id="json-ld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Movie",
          name: movie.title,
          image: movie.img,
          description: movie.dec,
          genre: movie.genra,
          datePublished: movie.date,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: movie.rating,
            bestRating: "10",
            worstRating: "0",
            ratingCount: 1,
          },
          actor: [
            movie.tag && { "@type": "Person", name: movie.tag },
            movie.tag2 && { "@type": "Person", name: movie.tag2 },
            movie.tag3 && { "@type": "Person", name: movie.tag3 },
          ].filter(Boolean),
        })}
      </Script>

      <h1 className="text-4xl font-bold mb-6 text-center">{movie.title}</h1>

      <div className="rounded-lg overflow-hidden shadow-lg mb-6">
        <Image
          src={movie.img}
          width={900}
          height={500}
          alt={movie.title}
          className="w-full h-auto"
        />
      </div>

      <p className="text-lg mb-8 leading-relaxed">{movie.dec}</p>

      {/* Full-screen screenshots one by one */}
      {[movie.img1, movie.img2, movie.img3].filter(Boolean).map((img, index) => (
        <div key={index} className="mb-6">
          <Image
            src={img}
            alt={`${movie.title} screenshot ${index + 1}`}
            width={1920}
            height={1080}
            className="w-full h-auto rounded-lg shadow"
          />
        </div>
      ))}

      <div className="space-y-2 mb-10">
        <p><strong>🎬 Genre:</strong> {movie.genra}</p>
        <p><strong>⏱️ Runtime:</strong> {movie.runtime}</p>
        <p><strong>🌍 Language:</strong> {movie.language}</p>
        <p><strong>📅 Release Date:</strong> {movie.date}</p>
        <p><strong>⭐ Rating:</strong> {movie.rating}</p>
        <p><strong>🏷️ Tags:</strong> {[movie.tag, movie.tag2, movie.tag3].filter(Boolean).join(', ')}</p>
      </div>

      <a
        href={movie.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        📥 Download Movie
      </a>

      {/* Related Movies */}
      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-2xl font-semibold mb-4">More like this</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {related.slice(0, 4).map((r) => (
              <a
                key={r._id}
                href={`/movies/${encodeURIComponent(
                  r.title.toLowerCase().replace(/\s+/g, '-')
                )}`}
                className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition"
              >
                <Image
                  src={r.img}
                  width={400}
                  height={250}
                  alt={r.title}
                  className="rounded-t-lg w-full h-auto"
                />
                <div className="p-3">
                  <h3 className="text-lg  text-blue-400 font-medium truncate">{r.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleMoviePage;

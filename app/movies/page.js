// app/movie/page.tsx (if using Next.js 13+ with App Router)

import MovieRoute from "@/components/MovieRoute";

const Movie = async () => {
  // https://www.allinoneitservice.shop
  const response = await fetch("https://starxmovies.in/", {
   
    cache: "no-store", 
  });

  if (!response.ok) {
   
    throw new Error("Failed to fetch data , soory server down ples try some time later contuct us in talegram");
  }

  const data = await response.json();

  return (
    <div>
      <MovieRoute data={data} />
    </div>
  );
};

export default Movie;

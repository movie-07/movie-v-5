// // import Home from "@/components/Home"
// import MovieRoute from "@/components/MovieRoute"

// function Homepage() {
//   return (
//     <div>
//      <MovieRoute/>
//     </div>
//   )
// }

// export default Homepage





import MovieRoute from "@/components/MovieRoute";

const Homepage = async () => {
  // https://www.allinoneitservice.shop
  const response = await fetch("https://www.starxmovies.in/api/movie", {
   
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

export default Homepage;

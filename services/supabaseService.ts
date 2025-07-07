import { supabase } from "@/lib/supabase";

export const updateSearchCount = async (query: string, movie?: Movie) => {
  // check if a record of that search has already been stored
  try {
    let { data: Metrics, error } = await supabase
      .from("Metrics")
      .select()
      .eq("searchTerm", query);

    // console.log("metrics..", Metrics, movie);

    if (Metrics && Metrics.length > 0) {
      const existingMovie = Metrics?.[0];

      const { data, error } = await supabase
        .from("Metrics")
        .update({ count: existingMovie.count + 1 })
        .eq("id", existingMovie.id)
        .select();
    } else {
      const { error } = await supabase.from("Metrics").insert({
        count: 1,
        searchTerm: query,
        title: movie?.title,
        poster_url: `https://image.tmdb.org/t/p/w500${
          movie?.poster_path ?? movie?.backdrop_path
        }`,
        movie_id: movie?.id,
      });
      //   console.log(query, movie?.poster_path ?? movie?.backdrop_path, movie?.id);
      if (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
    // @ts-ignore
    throw new Error(error instanceof Error ? error : "an error");
  }

  // if a document is found, increment the searchcount field
  // if no document
  // create a new row in supabase table
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    let { data: trendingMovies, error } = await supabase
      .from("Metrics")
      .select()
      .limit(5)
      .order("count", { ascending: false });

    // console.log("trending    --    ", trendingMovies?.[0]);

    return trendingMovies as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

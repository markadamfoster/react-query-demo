import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const [shouldPoll, setShouldPoll] = useState(false);

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
    setShouldPoll(false);
  };

  const { isLoading, isFetching, data, isError, error, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
      // cacheTime: 5000,
      // staleTime: 30000,
      // refetchOnMount: true,
      // refetchOnWindowFocus: true,
      refetchInterval: shouldPoll ? 1000 : false,
      // refetchIntervalInBackground: false,
      // enabled: false,
      select: (data) => {
        const superHeroNames = data.data.map((hero) => hero.name);
        return superHeroNames;
      },
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>

      <button onClick={refetch}>
        {isFetching ? "Fetching..." : "Fetch Heroes"}
      </button>

      {/* {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })} */}
      {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </>
  );
};

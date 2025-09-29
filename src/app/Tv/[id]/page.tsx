export default async function TvPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
      cache: "no-store", // optional, avoids caching issues
    }
  );

  if (!res.ok) {
    console.error("TV fetch failed:", res.status, res.statusText);
    throw new Error("Failed to fetch TV details");
  }

  const data = await res.json();

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.overview}</p>
    </div>
  );
}

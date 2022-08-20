import { useEffect, useState } from "react";

export default function LastSelesPage() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://nextjs-course-faf5c-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const transformedSales = [];

        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  if(isLoading) return <p>Loading....</p>

  if(!sales) return <p>No data yet</p>


  return <ul>
    {sales.map(sale => (
        <li key={sale.id}>{sale.username} - ${sale.volume}</li>
    ))}
  </ul>;
}


/*
Now, if we inspect the page source here,then the interesting thing is that we see 
no data yet. And that hopefully makes sense. The pages still pre-rendered by Next.js.
Because I explained earlier in this module that that would be the default page
which does not use get server side props, effectively will be pre-rendered by Next.js.

The key thing here just is that the data used by this page will not be prepared by Next.js
with get static props for example.Hence, when Next.js pre renders this page, it will not 
execute useEffect. It will not wait for this. It will not care about that.

It will just return and pre-render the very basic first version of what this component \
spits out.
*/
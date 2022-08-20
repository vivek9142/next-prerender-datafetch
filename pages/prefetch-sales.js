import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSelesPage(props) {
  /*
  to use the props we get here the pre fetched and pre-rendered sales as our initial state.
  */
  const [sales, setSales] = useState(props.sales);

  const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-course-faf5c-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );
  
  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  if (error) return <p>Failed to load.</p>;

  /*
  initially this year will not return loading because sales will not be undefined.
  However, we should change this from an or to an end operator. If we don't have data 
  and we don't have sales then I wanna show loading.
  */
  if (!data && !sales) return <p>Loading....</p>;

  /*
  So now we'll make it past this if check and render our initial sales here.
  So that's not what will be pre-rendered. And still when this component then runs in the 
  client it will fetch again to fetch the latest sales.
  */
 
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}


/*
Here we are already fetching data on the client. Now I just wanna prepare some data on the 
server or during the build process as well. And therefore we can add one of the two main 
functions we learned about getStaticProps or getServerSideProps.And I'll go for 
getStaticProps to pre generate that during the build process and possibly revalidate it
after deployment with the revalidate key. of 10 s so it will prefetch in every 10 sec.
*/

export async function getStaticProps(){
    return fetch(
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

                return {
                    props: {
                        sales: transformedSales
                    },
                    revalidate: 10
                }
            });
}
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSelesPage() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  /*
  now you can use this hook in your component, so not inside of useEffect,
  but directly in your component, all React hooks must be used directly
  in a component, not in some nested function.And we use it by simply executing it.
  */
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

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       "https://nextjs-course-faf5c-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) return <p>Failed to load.</p>;

  if (!data || !sales) return <p>Loading....</p>;

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

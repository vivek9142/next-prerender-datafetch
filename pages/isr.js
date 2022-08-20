import fs from 'fs/promises';
import path from 'path';

export default function Home(props) {
  const {products} = props;

  return (
    <ul>
      {
        products.map(product => (
          <li key={product.id}>{product.title}</li>
        ))
      }
    </ul>
  )
}



/*
And all you need to do to unlock Utilizing Incremental Static Generation (ISR) is in the 
object, which you return in get static props.

You don't just return props, but you also add a second key, which is called revalidate.
And as a value, you set a number a year,which is the time in seconds that Next.js
should wait until it re-generates this page.

So for example, if I enter 10 here, we would tell Next.js that for every incoming request to 
this page, it should be re-generated unless, it's less than 10 seconds ago that it was 
last re-generated.So it's recreated at most once every 10 seconds.

And of course the higher this number is,the less this page will be re-generated.
*/

export async function getStaticProps(){
    /*
    during development, the revalidate number doesn't matter. It will re-generate it every 
    time.In production it will matter, and then you have the best of both worlds.
    
    You have a pre-rendered page, which then still is updated after deployment,
    just as defined by you.
    */
    console.log('Re-generating...');
  const filePath = path.join(process.cwd(),'data','dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return { props : {
    products:data.products
  },
  revalidate: 10
}
}
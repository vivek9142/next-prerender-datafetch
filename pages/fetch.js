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
We're importing FS but it is  one of the core node JS modules instead.And working with the 
Fs module, would fail if you try to do it on the client site, because browser site Java 
script can't access the file system.

But we can import this here nonetheless and use the file system module inside of get static 
prompts.So we can use Fs here.And next JS is very clever and sees which imports you only 
use in get static props or similar functions, which we'll learn about later.

And then those imports are basically stripped out of the client site code bundle. So when 
the code for the client site,the react app code for the browser site, when that is prepared, 
that import will not be part of it.Next JS will ignore it for the client site,it will split 
your code in a clever way.

So to component code in general will be part of the client site code, this import and 
this code won't be.
*/

export async function getStaticProps(){
  const filePath = path.join(process.cwd(),'data','dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return { props : {
    products:data.products
  }}
}
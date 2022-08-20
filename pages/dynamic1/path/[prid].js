import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
    const {loadedProduct} = props;

  /*
  Fallback Pages & "Not Found" Pages

  we need to add fallback component for this not found id p4
  */

  if(!loadedProduct){
    return <p>Loading...</p>
  }

    return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}


async function getData(){
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}


export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.prid;

  //1- move code to specific function
  // const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  // const jsonData = await fs.readFile(filePath);
  // const data = JSON.parse(jsonData);

  //2 - get the data
  const data = await getData();
  const product = data.products.find((product) => product.id === productId);

  /*
  Fallback Pages & "Not Found" Pages

  Now we don't have any product p4 that is a perfect example for setting the not found 
  property on the object we return in getStaticProps.By setting this, we are able to use 
  fallback true
  and try to find a product for a parameter value which was not predefined here
  and  we then still fail to fetch it we don't want to return to regular page
  with the missing data, which causes an error.But we then wanna show the not found
  the 404 error page instead.
  */
  if(!product){
    return { notFound:true }
  }

  return {
    props :{
        loadedProduct: product
    }
  }
}
/*
So now we learned about getStaticPaths. At the moment the way we use it is still a bit 
unrealistic though because I have hard coded my PID values here into this function.
And in reality, we would be fetching this kind of information from a database or a file 
as well.
*/
export async function getStaticPaths(){
    const data = await getData();

    //3 - get the ids here
    const ids = data.products.map(product => product.id);
    //4- get all params taggedto specific id in array
    const pathsWithParams = ids.map(id => ({params:{prid:id}}));
    
    // return {
    //     paths:[
    //         {params: {projid : 'p1'} },
    //     ],
        
    //     fallback: true
    // }

    //update return statement
    return {
        paths:pathsWithParams,
        fallback: true
      }
    
}

export default ProductDetailPage;

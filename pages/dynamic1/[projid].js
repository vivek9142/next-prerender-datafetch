import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
    const {loadedProduct} = props;
    
    /*
    if fallbaqck comes p as we need a fallback fn

    if fallback is blocking. it will take tke because 
    then NextJS will actually wait for this page to fully be 
    pre-generated on the server

before it serves that.
    */
   
  //  if(!loadedProduct) return <p>Loading...</p>
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}


export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.projid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id === productId);

  return {
    props :{
        loadedProduct: product
    }
  }
}

/*
So let's say we wanna pre-render the page with product ID one. So with P1, 
because that's a highly frequented page, it's visited very often, but we don't wanna 
pre-generate the other two pages.With fallback set to true, that's possible
because now if I save this, you will notice that if I go back to the starting page,
if I click on product three, we still load this page successfully.Even though it was not 
added here to paths.And the reason for that is that with fallback true, we tell NextJS that 
even pages which are not listed here So even parameter values for the PID parameter,
which are not listed here, can be valid.

Values that should be loaded when they are visited.But they're not pre-generated,
instead they're generated just in time when a request reaches the server.And that allows us 
to pre-generate highly visited pages, and postpone the generation to less frequented pages
to the server, so that they are only pre-generated when they're needed.
*/
export async function getStaticPaths(){
    
    return {
        paths:[
            {params: {projid : 'p1'} },
        ],
        //if true will postpone other pages prerenders of other pages which are not decided. 
        //if true then then f fallback is false, then any paths not returned by getStaticPaths 
        //will result in a 404 page.
        /*
        If fallback is 'blocking', new paths not returned by getStaticPaths will wait for 
        the HTML to be generated, identical to SSR (hence why blocking), and then be cached f
        or future requests so it only happens once per path.
         * /
        /* 
        */
        fallback: false
    }
}

export default ProductDetailPage;

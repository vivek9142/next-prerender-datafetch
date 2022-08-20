import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
    const {loadedProduct} = props;
    
    /*
    if fallback is true so you need a fallback component to load the data while 
    you're rendering the data or  even fetching at this point of time.

    if fallback is 'blocking' then you have no need to amke this fallback  component here
    because then NextJS will actually wait for this page to fully be pre-generated on the 
    server before it serves that. So then it will take a little bit longer for the visitor 
    of the page to get a response, but the response which is sent back will be finished.
    So for now reload that still works.
    */

     if(!loadedProduct) return <p>Loading...</p>
  
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
which are not listed here, can be valid
*/
export async function getStaticPaths(){
    
    return {
        paths:[
            {params: {projid : 'p1'} },
        ],
        /*if true we tell NextJS that even pages which are not listed here. So even parameter 
        values for the PID parameter, which are not listed here, can be valid. 
        Values that should be loaded when they are visited. But they're not pre-generated,
        instead they're generated just in time when a request reaches the server. 
        But if we try to open the page with url '/p2'it will give error coannot read property.
        The reason for that, is that this pre-generation,this dynamic pre-generation, when 
        it's needed, does not finish instantly. So therefore instead when using this 
        fallback feature,you should be prepared to return a fallback state in your component.
        
        For example, by simply checking if loaded product is maybe not a thing with if not,
        and then returning something like loading here.

        //if true then then f fallback is false, then any paths not returned by getStaticPaths 
        //will result in a 404 page.
        /*
        If fallback is false, then any paths not returned by getStaticPaths will result in a 
        404 page. When next build is run, Next.js will check if getStaticPaths returned 
        fallback: false, it will then build only the paths returned by getStaticPaths. 
        This option is useful if you have a small number of paths to create, or new page 
        data is not added often.

        If fallback is 'blocking', new paths not returned by getStaticPaths will wait for 
        the HTML to be generated, identical to SSR (hence why blocking), and then be cached f
        or future requests so it only happens once per path.
        */
        fallback: true
    }
}

export default ProductDetailPage;

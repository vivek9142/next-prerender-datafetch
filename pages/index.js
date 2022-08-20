
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
let's say we want to load this product data dynamically but not in the way we would do it 
in a standard react app with useEffect.Instead we wanna prefetch the data before
we create this component.And before this component page gets pre rendered by next JS.
we'll export async getStatiProps() in the component here referring to ex- index.js

So now getStaticProps returns an object with a props key that's always required.You always 
must return an object with a props key and then the data and the props keys up to you but 
it should be an object.And here it's an object with a product key Which holds an array.

And now We'll receive that here on props on this homepage because next JS first calls 
this get static props function,and then executes this component function.And it does both 
things in advance.So non of that code here runs on the client side, instead that all happens 
during built time or in development as part of this development server,
*/
export async function getStaticProps(){

  return { props : {
    products:[
      {id:'p1', title:'Product 1'},
    ]
  }}
}

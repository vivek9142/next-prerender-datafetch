export default function  UserIdPage(props){
    return <h1>{props.id}</h1>
}

/*
we don't need getStaticPaths at all. Here I just returned an object,
and now I'm interested in the concrete param value which I'm getting here.

So we can get access to that through context. From there we can still extract params as I 
mentioned, and from params we can still get our userId by accessing uid, since that's the 
identifier I picked between square brackets.

With getServiceSideProps that's simply not an issue because we run that server side code
for every request anyways.So there is no pre-generation and therefore no need to define those dynamic paths
in advance.
*/

export async function getServerSideProps(context){
    const {params} = context;

    const userid = params.uid;

    return {
        props: {
            id: 'userid-'+userid
        }
    }
}
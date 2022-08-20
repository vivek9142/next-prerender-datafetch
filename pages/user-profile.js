export default function UserProfilePage(props){
    //we get the usrname prop from getServerSideProps which runs for every incoming req.
    return <h1>{props.username}</h1>
}

export async function getServerSideProps(context){

    const {params, req,res} = context ; 
    console.log(params, req,res);
    /*
    we also need to return an object here, and the object which be returned
    actually needs to have the same format as it does in getStaticProps.
    So that return object does not change. It should have a props key,
    it can have a not found key and it can have a redirect key.

    The only difference is the revalidate key. That is not required here and the debts 
    can't be set here because getStaticProps per definition runs for every incoming request.
    So there's no need to revalidate  after a certain amount of seconds because it will 
    always run again.
    */

    return {
        props:{
            username: 'Max'
        }
    }
}
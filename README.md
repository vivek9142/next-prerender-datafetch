## NextJS Pre-renders By Default

In pages you can create  index fiule and you can return ul list and it will be pre-rendered by default in NextJS 

Next.js will automatically pre-render it for you.Which is great because now any content which you encode in your component
will be visible to search engines, and to your website visitors, right from the start.

## Adding "getStaticProps" To Pages

The getStaticProps function can be added to any page file
and only there as I mentioned,and you need to export it.
And when you do so,then next JS will also call this get static props function on your behalf when it pre generate a page.
And the this function also signals to next JS that this is a page that should be pre generated.

Now I just said that that next JS would pre render any page by default and that's true,but we'll later learn about a way of telling next JS to not pre render a page and the offer it's important to understand that that get static props will not tell next JS to not pre render, but instead it of kind of a confirms to next to JS that this page still should be pre-generated.

But in addition to just running through the component and returning the JSx code,next JS will then also call this,
get static prompts function.If it finds one in your component file.

*** Go-To - index.js in pages folder ***

## Running Server-side Code & Using the Filesystem

A more realistic example would be that we have a data file
like this dummy backend Json file from which we wanna load data.
But we do wanna load the data when the page is prepared.We don't wanna reach out to that file through a HTTP request or anything like that from the client site.

And therefore will now utilize the fact that any code inside of get static props is executed on the server site so to say with server site capabilities.And that means that we can now, for example, work with the file system.

*** Go-To - fetch.js in pages folder ***

##  Utilizing Incremental Static Generation (ISR)

We can execute server-side code here, but in the end the code will not run on the actual server, which serves  our application, instead it runs on our machine when the page is 
built when the application is built with next.

So in the end, when you run, NPM run build. you execute that prepared script here,
which executes next build, then this code is executed.Now that's still good because since we have node JS installed all that node JS code does work here.

So that's perfect, but it has one potential downside.What if you have data that changes frequently?Because I mean, pre-generating the pages sounds great if you're building something fairly static.If you're building a blog, where data doesn't change too often, then of course,

whenever you add a new blog post, you can just pre-generate your project again,
you can run NPM run build again,and deploy the updated project.So that would work.

But if you have data that changes more frequently,after the page was deployed, then we have to rebuild and redeploy the page all the time.And that doesn't sound like a great thing to do.

*** Well, Next.js also has 2 solutions for this. ***

* You do pre-build your page, but then you still include standard react code
in your react components, where you use, use effect for then fetching updated data from a server. So you would always serve back a page with some pre-rendered data,

but that data might be outdated.So you fetched a latest data in the background and then update the loaded page after that data arrived.
That's a pattern you could implement.

* This get static props function, as I mentioned does execute when you build your project with next build, so with this build script. Well, that's not entirely true.
It does execute there, but that is not necessarily the only time it executes.

Instead, Next.js has a built in feature, which is called incremental static generation.
It means that you don't just generate your page statically once at build time,
but that it's continuously updated even after deployment without you re-deploying it.

So you pre-generate a page, but then you can also tell Next.js that a given page should be re-generated again for every incoming request at most every X seconds.
So every 60 seconds, for example.
That means that if a request is made

for a certain page and it's, let's say less than 60 seconds since it was last re-generated, the existing page would be served to the visitor.

But if it's past those 60 seconds then this updated page would be pre-generated on the server instead.

*** Go-To - isr.js in pages folder ***

## A Closer Look At "getStaticProps" & Configuration Options
let's take another closer look at getStaticProps.

you can see that I added a parameter called context there.Because indeed this function
which is called by next.js receives an argument.we do actually get an object here as our argument,as a parameter with some extra information about this page when it's executed by next.js.

And for example, we would get any dynamic params, any dynamic path segment values
And we also get a couple of other pieces of information which at the moment though, don't matter to us.

let's take a closer look at this return object again.In there we see props and revalidate.
Now there are two other keys,which you can set on this object.

* The not found key, which wants a Boolean value which is either true or false.
  If you set this to true, this page will return a 404 error and therefore render the 404 error page instead of the normal page. 
  
  Now, why might we want to do that?
  Well, if the code here where you fetch data fails to fetch the data for whatever reason, then you could for example, do that. So we could check if data products, length,if that is zero.So if we have no products, then maybe we want to return an object here in get static props, which has not found set to true. So that we show the not found page and only if we have at least one product in the fetched data, we return the regular page.
  
  That would be a typical use case.

* The redirect key.
  The redirect key allows you to redirect the user. So instead of rendering the page content,
  instead of rendering this component content you can redirect to another page, to another route. 
  
  And that could also be needed because maybe you failed to fetch data.
  Let's say the problem is not that there is no data but instead you weren't able to access the database or anything like that. So if there is no data to begin with so not just no products, then maybe you want to redirect.
  
  Then you can do this by returning an object where the redirect key is set to an object,
  where you then set a destination to some route. 

*** Go-To - gsp.js in pages folder ***

##  Working With Dynamic Parameters

Now there we're rendering some dummy product data and it's very simple dummy product data, of course. 

Now what if our data there was a bit more complex? So every product also had a description, let's say.

*** Go-To - dynamic.js and [pid].js in pages folder ***


##  Working With Fallback Pages

The fallback key can help you if you have a lot of pages that would need to be pre-generated.
Here I only have three dummy products,and I'm currently not even fetching
that data from that file.

If you're building a blog and you have hundreds of articles, you might have some articles which are basically never read.So then, pre-generating such rarely visited pages
is a waste of time and resources.

That's where fallback becomes important.Here we can set this to true,and then for example, we could decide to only pre-render some pages.

*** Go-To - dynamic1.js and [projid].js in pages/components folder ***
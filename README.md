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

*** Go-To - index.js and [projid].js in pages/dynamic1 folder ***

## Loading Paths Dynamically

*** Go-To - index.js and [prid].js in pages/dynamic1/path folder ***

## Fallback Pages & "Not Found" Pages

So now that we understand this concept of having a fallback and of generating certain pages for certain IDs let's take another look at the not found case that we're trying to request a page which doesn't exist. And let's start by simply visiting a page with a product ID of P4.

Now we get a 404 error page here. So a not found page because in our data we only have the IDs P1, P2 and P3.since these are the only IDs that exist in that dummy-backend.json file.
And automatically if we then try to load this page for an ID which was not pre-generated,
we do get this 404 error.

What if we use fallback true though? What if we for example assume that the products
stored in dummy-backend.json might not be all the products for which we are able to fetch data.So we only generate pages for the three product IDs but by setting fallback to true,
we then also tell Next.js that even if an ID value is not found here we still might be able to render a page. That's what the idea behind fallback is.

So We need to define the fallback component here for it to load the data in background and 
update it in front after loading. Now we'll get another error here-
Error : Failed to load static props.

Next trying to load this product page for an ID of P4
for which we just don't have any data because in getStaticProps we are also reaching out to dummy-backend.json and  Next.js tries to load the actual data for this page and it just fails there because we don't have such a product. So that's why we get this error eventually 

*** Go-To - index.js and [prid].js in pages/dynamic1/path folder ***


## Introducing "getServerSideProps" for Server-side Rendering (SSR)

I referred to two forms of pre-rendering: 
* static generation 
* server-side rendering.


Now what we had a look at thus far, that's static generation because we statically pre-generate pages. Even though it's not fully static because of incremental static generation, which I also explained, but generally pages are pre-generated.
And that is really important.

Inside of getStaticProps and also inside of getStaticPaths, we don't have access to the actual request which is incoming. Because these functions are not called for the actual request, at least not only. 

With incremental static generation, they are also called for incoming requests
at least sometimes if they need to be re-validated but they are generally called when your project is built.So inside of getStaticProps,you don't have access to the actual incoming request.Now, very often, you also don't need access.

For example, here in the examples I showed you thus far,we don't need access to the actual request,which is reaching the server.But sometimes static generation is not enough
and instead, you need real server-side rendering,which means that you do need to pre-render 
a page for every incoming request.and/or you need access to the concrete request object
that is reaching the server.Because, for example, you need to extract cookies.

NextJS also supports this run real server-side code use case which means it gives you a function which you can add to your page component files, which is then really executed
whenever a request for this page reaches the server.so that's then not pre-generated in advance during build time or every couple of seconds but it's really code that runs on the server only,so only after you deployed it,and which is then re-executed for every incoming request.

And that code is added to a function called ***getServerSideProps***.
Just like getStaticProps, it's a async function. It needs to be called exactly like this
and it needs to be exported. and you can only add it to your page component files.
But then if you do have such a function in a page component file,
NextJS will execute that function and it will execute it whenever a request for this page is made. 

And therefore, you should only use either getStaticProps or getServerSideProps because they kind of clash. They fulfill the same purpose. They get props for the component
so that NextJS is then able to render that component but they run at different points 
of time.

## Using "getServerSideProps" for Server-side Rendering

So let's say we have a dummy user profile js file here in the pages folder.So a user profile page for which I'll add a component here, the UserProfilePage component.
And in here, we want to get some users specific data and show that on the screen.

Now we could expect a user ID as part of the URL.So we could make this kind of dynamic
and expect to use the ID instead.But then everyone who enters this ID in the browser
is able to see some data for that given user ID.So that's not what I want here.
Instead, we wanna identify the user making the request,let's say with help of a cookie which we set before.Now at the moment we don't have that here. to get that we need to use getServerSideProps(context).

The important thing now really is that this only executes on the server after deployment
and also on our development server here, but it's not statically pre-generated.
And that has a couple of important implications.

## "getServerSideProps" and its Context
The implications can be found in this context object unlike context in getStaticProps
we don't just have access to the params and a couple of other less important fields
instead, we get access to the full request object as well. and also to the response which will be sent back so that we could even manipulate this and add extra headers if you wanted to. 

To be precise we do get a couple of values a couple of keys in this context object
and we do get access still to the params that does not change if we have this on a dynamic page which we don't have here but if this would be on a dynamic page we still would get access to params but in addition, as mentioned, we also get access to the request object and the response object.

you can manipulate the response before it's sent back by adding extra headers, for example
by adding a cookie, for example. In addition, you can also dive into the request object
that reached the server and you can read incoming data from there.

For example, headers that were attached through request and therefore cookie data that was attached to the request. Request and response the objects we're getting here
are your official Node.js default incoming message and response objects.

you really wanna ensure that this function runs for every incoming request
so that it's never static pre-generated.because for example you have highly dynamic data
which changes multiple times every second and therefore, you know, that any old page
you would be serving would already be outdated. That could be another reason for using getServiceSideProps.

*** Go-To - user-profile.js in pages/ folder ***


## Dynamic Pages & "getServerSideProps"

Now getServiceSideProps can sometimes be useful. I also want to mention how you would use it
with a dynamic page. Here before, when we used getStaticProps, we also needed getStaticPaths
to let Next.js know which instances of this page should be pre-generated.
Now when using getServiceSideProps, that's not the case.

*** Go-To - [uid].js in pages/user folder ***


##  "getServerSideProps": Behind The Scenes
 
I also always had a look at the production build to really show you what Next.js does getServerSideProps under the hood.we again run npm run build to build this for production,we see that we again pre-generated a couple of pages and importantly
it's the same number of pages as we generated before.

Now the user profile page was not pre-generated as is in the end signaled by this Lambda symbol here.The UID file also wasn't pre-generated.So this Lambda symbol here shows you that these pages are not pre-generated but instead will be pre-rendered on the server only.

And that makes sense because in user profile we're using get Server Side Props
and then UID we're using get Server Side Props. That's why, those pages are not pre-generated

## Introducing Client-Side Data Fetching (And When To Use It)

When building next JS applications, you will sometimes have data which just doesn't need to be pre-rendered,or which can't be pre-rendered.

Examples would be data that changes with high frequency.
for example, 

* if you have stock data which you show on some page and that data changes multiple times every second,pre fetching and pre rendering might not make too much sense
because you will always see outdated data when you visit this page. So in such a case, just showing a loading spinner when you visit the page, and then fetching the very latest data for you,and maybe updating that data in the background then might be the best user experience.

* Another example would be highly user-specific data.For example, the last orders in an online shop.If you are in your account and your user profile and you view that data,
that could be an example where we don't really need to pre-render a page.
Definitely not for search engines because they won't see your private profile,
and also not necessarily for the user experiencebecause if we go to this page, we might be more than fine with just waiting a second for the data to be loaded
on the client and having a quicker navigation to the page might be more important
than having the data available right from the start.

*  you have partial data. So let's say you have like a dashboard page with a lots of different pieces of data ,lots of different kinds of data, in such a case, loading all these different pieces, which make up the overall dashboard might just slow down the request
if you do that on the server, and pre rendering it statically during build time might also not make sense because it's personal data or because it's changing a lot.

And in such cases, it might make the most sense to use the traditional approach of writing some code in your react components may be with user fact and fetch, fetch data from some API from insidethe client side react application.


##  Implementing Client-Side Data Fetching

*** Go-To - last-sales.js in pages/ folder ***

## Using the "useSWR" NextJS Hook

Now, you can absolutely write this client side data fetching code on your own,
as we did it here, because this, of course, gives you full control over the entire component state, and how exactly data is being fetched.

But this is also such a common pattern that you could consider creating your own custom hook
to outsource this logic into it, or to use a third-party hook created by someone else.
And you can look into the SWR hook.

If you Google for use SWR you will find swr.vercel.app.This is a React hook developed by the Next.js team, but you can use it in non-Next.js projects as well.In the end, this is a hook which,under the hood, still will send a HTTP requestby default using the fetch API, which we also used,but it gives you a couple of nice built in features like caching and automatic revalidation retries on error.And you don't have to write all that code on your own.

Instead, you can use this hook in a much simpler way.The strange name SWR, by the way, stands
for stale-while-revalidate, which is the name of this hook because this hook has a built in features for caching data and revalidating data to give you the most up-to-date data
without you noticing.

In our project, we just need to install it as a package.
With npm install swr we install this SWR hook package into our project.

*** Go-To - swr-sales.js in pages/ folder ***


##  Combining Pre-Fetching With Client-Side Fetching

I wanna combine client-side data fetching with server-side pre-rendering.but because it can be a pattern which you do need in other kinds of applications, where you wanna pre-render a basic snapshot and then still fetch the latest data from the client
and therefore that is a pattern you should also know.

*** Go-To - prefetch-sales.js in pages/ folder ***
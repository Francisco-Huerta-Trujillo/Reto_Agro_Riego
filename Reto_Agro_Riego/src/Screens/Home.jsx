import NavBar from "../Components/NavBar";


//We can use either export or export default 
/*Export allows us to experot many types of components from the page
Meanwhile export default is the base setting if we export just the file*/ 
export default function Home(){
    //Here you can insert all the Javascript you need for functionality
    
    return(
        //This is required as it states specifically where the component starts and ends
        <>
            <NavBar/>
        </>
    )
}
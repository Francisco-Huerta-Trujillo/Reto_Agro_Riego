//We can use either export or export default 
/*Export allows us to experot many types of components from the page
Meanwhile export default is the base setting if we export just the file*/ 
export default function Home(){
    //Here you can insert all the Javascript you need for functionality
    
    return(
        //This is required as it states specifically where the component starts and ends
        <>
        <div className = "home-container">
            <h1> Dashboard AgroRiego </h1>
            <p>Aqui se ven las estadisticas de riego.</p>
        </div>
        </>
    )
}
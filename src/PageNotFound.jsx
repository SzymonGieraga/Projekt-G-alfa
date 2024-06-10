import { useEffect, useState } from "react";

const PageNotFound = ({setTitle}) => {
    setTitle("404")
    const cats = [
        "https://c.tenor.com/us6zO1kU3Y8AAAAC/tenor.gif",
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExemEyZGM3YzIwYWowZDk5aHJzNWloN3FjYmNiNWNlNjV3b3RiczA2YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qpCvOBBmBkble/giphy.gif",
        "https://media.tenor.com/images/d3f43f8fa6e6efa527ce7b68da4ba505/tenor.gif",
        "https://c.tenor.com/7JbbkdTGA38AAAAd/tenor.gif",
        "https://c.tenor.com/609ISt84COwAAAAd/tenor.gif"
    ];

    const [randomCat, setRandomCat] = useState('')

    useEffect(()=>{
        setRandomCat(cats[Math.floor(Math.random()*cats.length)]);
    },[])

    return ( <>
        <p>Nie znaleziono strony :(</p> 
        <img style={{maxWidth:"25em"}} src={randomCat} alt="smutny-kot.gif"/>
    </>);
}
 
export default PageNotFound;
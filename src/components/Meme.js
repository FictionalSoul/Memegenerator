import React from "react"
//import memeData from "./memeData"

export default function Meme(){
    const [meme,setMeme]= React.useState({
        topText:"",
        bottomText:"",
        randomImage:"my-app/src/components/memeData.js"
    });

    const[allMeme,setAllMeme] = React.useState([]);

    React.useEffect(function(){
        async function getMemes(){
            const res =await fetch("https://api.imgflip.com/get_memes")
            const data= await res.json()
            setAllMeme(data.data.memes)
        }
        getMemes()
        // fetch("https://api.imgflip.com/get_memes")
        // .then(res => res.json())
        // .then(data => setAllMeme(data.data.memes))
    },[])

    function getMemeImage(){
        const randomNumber =Math.floor(Math.random()*allMeme.length);
        const url = allMeme[randomNumber].url;
        setMeme(prevMeme =>({
            ...prevMeme,
            randomImage:url
        }));

    }
    function handleChange(event){
        const {name,value}=event.target;
        setMeme(prevMeme =>({
            ...prevMeme,
            [name]:value
        }));

    }
    return(
        <main>
            <div className="form">
                <input className="form--input" placeholder="Top text" type="text"
                    value={meme.topText}
                    name="topText"
                    id="topText"
                    onChange={handleChange}
                     />
                <input className="form--input"  placeholder="Bottom Text" type="text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                    id="bottomText"
                />
                <button className="form--button" type="Submit" onClick={getMemeImage}>Get a new meme image 📸</button>
            </div>
                <div className="meme">
                    <img src={meme.randomImage} alt="Random img" className="meme--image" />
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>

        </main>
    );
}
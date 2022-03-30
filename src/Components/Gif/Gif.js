import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from './Gif.module.css'

const Gif = ({ gif, }) => {
    const [data, setData] = useState([])
    const [imageURL, setImageURL] = useState("")
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                params: {
                    api_key: "oZyNOYTntbcmMhfZi93e5tI38wpQwz7V",
                    limit: 10
                }
            })
            console.log(results.data.data)
            setData(results.data.data)

        }
        fetchData()
    }, [])

    const handleClick = (el) => {
        // console.log(el.images.fixed_height.url)
        setImageURL(el.images.fixed_height.url)
    }
    const handleSearch = async event => {
        setSearch(event.target.value)
        console.log(event.target.value)
        const results = await axios("https://api.giphy.com/v1/gifs/search", {
            params: {
                api_key: "oZyNOYTntbcmMhfZi93e5tI38wpQwz7V",
                limit: 10,
                q: search
            }

        })
        console.log(results.data.data)
        setData(results.data.data)
    }


    return (
        <>
            <div className={styles.body}>
                {!imageURL ? <input type="text" onChange={handleSearch} /> : null}
                {imageURL ? <img src={imageURL} alt="tushar" /> : null}
                {!imageURL && gif ? (data.map((el) => {
                    return (
                        < div key={el.id} onClick={(props) => handleClick(el)}>
                            <img src={el.images.fixed_height.url} alt="GIF" />
                        </div>
                    )
                })) : null}
            </div>



            {/* <div className={styles.body}>
                <input type="text" onChange={handleSearch} />
                {imageURL ? <img src={imageURL} alt="tushar" /> : null}
                {!imageURL ? (data.map((el) => {
                    return (
                        < div key={el.id} onClick={(props) => handleClick(el)}>
                            <img src={el.images.fixed_height.url} alt="GIF" />
                        </div>
                    )
                })) : null}
            </div> */}
        </>
    )
}

export default Gif
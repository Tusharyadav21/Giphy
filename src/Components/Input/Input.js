import React, { useState } from 'react'
import axios from 'axios';

import styles from './Input.module.css';

import avatar from '../../Assets/user.png'
import GIF from '../../Assets/gif-file-format.png'

const Input = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [gif, setGif] = useState(false)
    const [imageURL, setImageURL] = useState('')

    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

    const fetchData = async () => {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
            params: {
                api_key: "oZyNOYTntbcmMhfZi93e5tI38wpQwz7V",
                limit: 10
            }
        })
        // console.log(results.data.data)
        setData(results.data.data)
    }

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
        // console.log(results.data.data)
        setData(results.data.data)
    }

    const showGIF = () => {
        if (gif) {
            setGif(false)
            setImageURL(null)
        }
        else {
            setGif(true)
            fetchData()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message !== '' || imageURL !== '') {
            setMessages([{ id: `${message} - ${Date.now()}`, message, imageURL }, ...messages]);
            document.getElementById('input_field').value = '';
            setImageURL('')
            setMessage('')
            setGif(false)
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <div className={styles.MessageColumn}>
                    <img src={avatar} alt="profile" />
                    <input type="text" id="input_field" placeholder="Type Something.." onChange={(e) => setMessage(e.target.value)} />
                </div>
                {imageURL ? <img src={imageURL} alt="tushar" /> : null}
                <div className={styles.Buttons}>
                    <div onClick={showGIF}>
                        <img src={GIF} alt="GIF ICon" />
                        GIF</div>
                    <button type="submit" >Post</button>
                </div>
            </form>

            {gif ? <div className={styles.GifBody}>
                {!imageURL ? <input type="text" onChange={handleSearch} /> : null}
                {!imageURL && gif ? (data.map((el) => {
                    return (
                        < div className={styles.gifSelector} key={el.id} onClick={(props) => handleClick(el)}>
                            <img src={el.images.fixed_height.url} alt="GIF" />
                        </div>
                    )
                })) : null}
            </div> : null}

            <div className={styles.post_container} >
                {messages.map((m) => (
                    <div className={styles.post} key={m.id}>
                        <h5 >
                            {m.message}
                        </h5>
                        {m.imageURL ? <img src={m.imageURL} alt="POST" /> : null}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Input
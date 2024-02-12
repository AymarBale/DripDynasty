/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/details'
const DetailsModal = ({ propertyName, productId, userId, isLog, onPanier }) => {
    const [produits, setProduits] = useState([])
    const [backendError, setBackendError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [count, setCount] = useState(0)
    const [loginRequired, setLoginRequired] = useState(false)
    const [countError, setCountError] = useState(false)
    const [hasClicked, setHasClicked] = useState(false)
    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:8888/Backend/ServerSender/retournerProduits',
            timeout: 4000
        })
            .then((response) => {
                if (response.status === 200) {
                    setProduits(response.data) // Assuming you want details for the first product
                } else {
                    console.log(backendError + ' ' + errorMessage)
                    setBackendError(true)
                    setErrorMessage('Error connecting to the server.')
                }
            })
            .catch((error) => {
                console.error('timeout exceeded', error)
                setBackendError(true)
                setErrorMessage('Email or password is incorrect.')
            })
    }, [])
    const getProductById = (productId, produits) => {
        return produits.find(product => product.product_id === productId)
    }
    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }

    const ajouterPanier = (product_id, user_id, prix, quantite) => {
        const productData = {
            product_id,
            user_id,
            prix,
            quantite
        }
        axios({
            method: 'post',
            url: 'http://localhost:8888/Backend/ServerSender/ajouterPanier',
            data: productData
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data)
                } else {
                    console.log(backendError + ' ' + errorMessage)
                    setBackendError(true)
                    setErrorMessage('Error connecting to the server.')
                }
            })
            .catch((error) => {
                console.error('timeout exceeded', error)
                setBackendError(true)
                setErrorMessage('Email or password is incorrect.')
            })
    }

    return (
        <div class='details'>
            {getProductById(productId, produits) && (
            <div id='content'>
                <div id='topContent'>
                    <div id='imageContent'><img src={getProductById(productId, produits).image} alt='' /></div>
                    <div id='infoContent'>

                        <div>
                            <h1 className='h1-detail'>{getProductById(productId, produits).nom}</h1>
                            <p>{getProductById(productId, produits).prix}</p><span> + Free shipping</span>
                            <p> Season :{getProductById(productId, produits).saison}</p>
                            <p>{getProductById(productId, produits).description}.</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque voluptas dolorem nam mollitia,
                                praesentium voluptatibus, sapiente, assumenda vel possimus repellat deleniti rerum ipsam aut
                                eius ducimus nulla. Libero, consequatur et!
                            </p>
                            <div id='cubes'>

                                <li>{getProductById(productId, produits).couleur}</li>

                                <li>{getProductById(productId, produits).taille}</li>
                            </div>
                            <p>Quantite disponible {getProductById(productId, produits).quantite}</p>
                        </div>
                        <div><button onClick={decrement}>-</button><span>{count}</span><button onClick={increment}>+</button></div>

                        <div>
                        <button onClick={() => {
    setHasClicked(true)
    if (isLog) { // Check if the user is logged in
        if (count > 0) {
            ajouterPanier(productId, userId, getProductById(productId, produits).prix, count)
            setTimeout(() => {
                onPanier()
              }, 500)
        } else {
            console.log('hasClicked:', hasClicked)
            // Show error message if the count is not greater than 0
            setHasClicked(false) // Reset hasClicked to hide the previous error message
            setCountError(true)
        }
    } else {
        // Show message if the user is not logged in
        setHasClicked(false) // Reset hasClicked to hide the previous error message
        setLoginRequired(true)
    }
}}
                        >
    Ajouter au panier
                        </button>

{hasClicked && count === 0 && <p style={{ color: 'red' }}>Please select a quantity greater than 0.</p>}
{loginRequired && <p style={{ color: 'red' }}>Vous devez etre connectez pour acceder au panier.</p>}

                        </div>
                    </div>
                </div>
            </div>
                )}
        </div>
    )
}

export default DetailsModal

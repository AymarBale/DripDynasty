/* eslint-disable camelcase */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/panier'
// eslint-disable-next-line no-empty-pattern
const PanierModal = ({ uid, pF }) => {
    const [produits, setProduits] = useState([])
    const [panier, setPanier] = useState([])
    const [backendError, setBackendError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const panierData = {
        user_id: uid
    }
    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:8888/Backend/ServerSender/afficherPanier',
            timeout: 4000,
            data: panierData
        })
            .then((response) => {
                if (response.status === 200) {
                    setPanier(response.data)
                } else {
                    console.log(backendError + ' ' + errorMessage)
                    setBackendError(true)
                    setErrorMessage('Error connecting to the server.')
                }
            })
            .catch((error) => {
                console.error('timeout exceeded', error)
            })
    }, [])
    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:8888/Backend/ServerSender/retournerProduits',
            timeout: 4000
        })
            .then((response) => {
                if (response.status === 200) {
                    setProduits(response.data) // Assuming you want details for the first product
                    setLoading(false)
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
    const calculateTotalPrice = () => {
        return panier.reduce((total, item) => total + item.prix, 0).toFixed(2)
      }
      const payer = () => {
        const currentDate = new Date().toISOString()

        panier.forEach((item) => {
          supprimerPanier(item.product_id, item.user_id, item.prix, item.quantite)
        })
        panier.forEach((item) => {
            creerCommand(item.product_id, item.user_id, item.prix, item.quantite, currentDate)
        })
      }
    const supprimerPanier = (product_id, user_id, prix, quantite) => {
        const productData = {
            product_id,
            user_id,
            prix,
            quantite
        }
        axios({
            method: 'post',
            url: 'http://localhost:8888/Backend/ServerSender/supprimerPanier',
            data: productData
        })
            .then((response) => {
                if (response.status === 200) {
                    window.location.reload()
                } else {
                    console.log(backendError + ' ' + errorMessage)
                    setBackendError(true)
                    setErrorMessage('Error connecting to the server.')
                }
            })
            .catch((error) => {
                console.error('timeout exceeded', error)
            })
    }

    const creerCommand = (product_id, user_id, prix, quantite, Command_date) => {
        const commandData = {
          product_id,
          user_id,
          quantite,
          prix,
          Command_date
        }

        axios({
          method: 'post',
          url: 'http://localhost:8888/Backend/ServerSender/creerCommande',
          data: commandData
        })
          .then((response) => {
            if (response.status === 200) {
              console.log('Command created successfully')
              // Optionally, you can perform any additional actions after command creation
            } else {
              console.log('Error connecting to the server')
              // Handle the error appropriately, you may want to set an error state
            }
          })
          .catch((error) => {
            console.error('Timeout exceeded', error)
            // Handle the timeout error, set an error state, or perform other actions
          })
      }

    return !loading
? (
        <>
          <div id='command'>
            {panier.map((item) => (
              <div id='content' key={item.product_id}>
                <img
                    src={
                    (getProductById(item.product_id, produits) || {}).image ||
                    'default_image_url'
                  }
                    alt='Product Image'
                />

                <div>
                  <h1>
                    <h1>
                      {(getProductById(item.product_id, produits) || {}).nom ||
                        'Product Name Not Available'}
                    </h1>
                  </h1>
                  <br />
                  <p>Quantite: {item.quantite}</p>
                  <br />
                  <p>Prix: {item.prix}</p>
                </div>
                <button
                    className='btn'
                    onClick={() =>
                    supprimerPanier(
                      item.product_id,
                      item.user_id,
                      item.prix,
                      item.quantite
                    )}
                >
                  <i className='fa fa-trash' />{' '}
                </button>
              </div>
            ))}
          </div>
          <div id='payer'>
      <p>Total:{calculateTotalPrice()}</p>
      {pF > 0 && (
        <p>
          Vous faites partie de notre programme de fidélité, donc vous avez un rabais de 15%. <br />
          Nouveau prix:
          {/* You may need to adjust the logic based on how the discount is applied */}
          {calculateTotalPrice() - (calculateTotalPrice() * 15) / 100}
        </p>
      )}
      <button onClick={payer}>Payer</button>
          </div>
        </>
      )
: (
        <p>Loading...</p>
      )
}

export default PanierModal

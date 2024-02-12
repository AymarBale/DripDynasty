import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/shop'

const ProductForm = ({ productDetails, onSave, onCancel, seasons, colors, sizes }) => {
    const [formData, setFormData] = useState({
        taille: '',
        prix: '',
        marque: '',
        description: '',
        couleur: '',
        quantite: '',
        saison: '',
        nom: '',
        image: ''
    })

    useEffect(() => {
        if (productDetails) {
            setFormData(productDetails)
        }
    }, [productDetails])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let adress = ''
        if (productDetails) {
            adress = 'http://localhost:8888/Backend/ServerSender/modifierProduits'
        } else {
            adress = 'http://localhost:8888/Backend/ServerSender/ajouterProduits'
        }
        axios({
            method: 'post',
            url: adress,
            timeout: 4000,
            data: formData
        })
            .then(() => {
                onSave()
            })
            .catch((error) => {
                console.error('Error submitting form:', error)
            })
    }

    const handleCancel = () => {
        onCancel()
    }

    return (
        <div className='form-product'>
            <h2>{productDetails ? 'Modifier le produit' : 'Ajouter un produit'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Taille:
                    <select name='taille' value={formData.taille} onChange={handleInputChange}>
                        <option value='' />
                        {sizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Prix:
                    <input
                        type='number'
                        name='prix'
                        value={formData.prix}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Marque:
                    <input
                        type='text'
                        name='marque'
                        value={formData.marque}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Description:
                    <input
                        type='text'
                        name='description'
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Couleur:
                    <select name='couleur' value={formData.couleur} onChange={handleInputChange}>
                        <option value='' />
                        {colors.map((color) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Quantité:
                    <input
                        type='number'
                        name='quantite'
                        value={formData.quantite}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Saison:
                    <select name='saison' value={formData.saison} onChange={handleInputChange}>
                        <option value='' />
                        {seasons.map((season) => (
                            <option key={season} value={season}>
                                {season}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Nom:
                    <input
                        type='text'
                        name='nom'
                        value={formData.nom}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    URL Image:
                    <input
                        type='text'
                        name='image'
                        value={formData.image}
                        onChange={handleInputChange}
                    />
                </label>

                <div className='button-group'>
                    <button type='submit'>
                        {productDetails ? 'Modifier' : 'Ajouter'}
                    </button>
                    <button type='button' onClick={handleCancel}>
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm

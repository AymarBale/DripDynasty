import React, { useState } from 'react'
import axios from 'axios'
import '../css/mon-compte.css'

const MonCompte = ({ utilisateur, compteSuppr }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const handleDeleteUser = () => {
        setIsDeleteModalOpen(true)
    }

    const onConfirm = async (id) => {
        try {
            const response = await axios.post('http://localhost:8888/Backend/ServerSender/afficherPanier', {
                timeout: 4000,
                user_id: id
            })

            const panier = response.data

            // Utilisation de Promise.all pour attendre que toutes les suppressions de panier soient terminées
            await Promise.all(panier.map(async (product) => {
                const productData = {
                    product_id: product.product_id,
                    user_id: product.user_id
                }

                await axios.post('http://localhost:8888/Backend/ServerSender/supprimerPanier', productData)
            }))

            await axios.post('http://localhost:8888/Backend/ServerSender/supprimerUtil', { user_id: id })

            setIsDeleteModalOpen(false)
            compteSuppr()
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    }

    const onCancel = () => {
        setIsDeleteModalOpen(false)
    }

    return (
        <div className='mon-compte'>
            <div className='mon-compte-info'>
                <div>Bonjour {utilisateur.nom}</div>
                <div>Votre email : {utilisateur.email}</div>
                {utilisateur.programmeFidelite
                    ? (
                        <div>Vous faites partie du programme de fidélité</div>
                    )
                    : (
                        <div>Vous ne faites pas partie du programme de fidélité</div>
                    )}
                <button onClick={handleDeleteUser}>Supprimer compte</button>
            </div>
            {isDeleteModalOpen && (
                <div className='delete-confirmation-container'>
                    <div className='delete-confirmation'>
                        <p>Voulez-vous supprimer votre compte</p>
                        <button onClick={() => onConfirm(utilisateur.user_id)}>Oui</button>
                        <button onClick={onCancel}>Non</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MonCompte

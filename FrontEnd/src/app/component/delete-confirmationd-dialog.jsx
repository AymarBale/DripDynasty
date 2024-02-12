import React from 'react'
import '../css/shop'

const DeleteConfirmationDialog = ({ productName, onConfirm, onCancel }) => {
    return (
        <div className='delete-confirmation-container'>
            <div className='delete-confirmation'>
                <p>{"Voulez-vous supprimer l'article sélectionné? (" + productName + ')'}</p>
                <button onClick={onConfirm}>Oui</button>
                <button onClick={onCancel}>Non</button>
            </div>
        </div>
    )
}

export default DeleteConfirmationDialog

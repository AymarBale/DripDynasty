import React, { useState, useEffect } from 'react'

import axios from 'axios'
import '../css/login'
// Composant principal représentant la fenêtre modale de connexion
const LoginModal = ({
    onClose, // Fonction pour fermer la fenêtre modale
    showLoginModal, // Indicateur si la fenêtre modale est visible
    onCreateAccountClick, // Fonction pour gérer le clic sur "Create ID"
    onLoginSuccess, // Fonction à exécuter en cas de connexion réussie
    admin,
    programmeF,
    sendUserId,
    utilisateur,
    userConnection
}) => {
    // Déclaration des états
    const [username, setUsername] = useState('')
    const [motDePasse, setPassword] = useState('')
    const [backendError, setBackendError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    /* const [barreLateraleOuverte] = useState(false) */
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUsername('')
        setPassword('')
    }, [showLoginModal])

    // Fonction pour gérer la tentative de connexion
    const handleLogin = () => {
        const loginData = userConnection !== null
            ? {
                email: userConnection.email,
                password: userConnection.motDePasse
            }
            : {
                email: username,
                password: motDePasse
            }

        axios({
            method: 'post',
            url: 'http://localhost:8888/Backend/ServerSender/verifierUtil',
            timeout: 4000,
            data: loginData
        })
            .then((response) => {
                if (response.status === 200) {
                    setUser(response.data)
                    admin(response.data.isAdmin)
                    console.log(response.data)
                    programmeF(response.data.programmeFidelite)
                    sendUserId(response.data.user_id)
                    utilisateur(response.data)
                    setErrorMessage('Login succesfull.')
                    onLoginSuccess()
                } else {
                    setBackendError(true)
                    setErrorMessage('Error connecting to the server.')
                }
            }).catch((error) => {
                console.error('timeout exceeded', error)
                setBackendError(true)
                setErrorMessage('Email or password is incorrect.')
            })
    }

    // Fonctions pour ouvrir et fermer la barre latérale

    // Effet pour afficher dans la console chaque fois que l'état user change
    useEffect(() => {
    }, [user])

    return (
        <div id='login'>
            {userConnection !== null ? handleLogin() : ''}
            {/* Fenêtre modale de connexion */}
            <div
                className='modal'
                isOpen={showLoginModal}
                onRequestClose={onClose}
                contentLabel='Login Modal'
            >

                <div className='modal-content'>

                    <h1>My account</h1>
                    <div class='box'>
                        <div className='content'>
                            <h2>LOGIN</h2>
                            <input
                                type='email'
                                placeholder='Email'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            /><br />
                            <input
                                type='password'
                                placeholder='Password'
                                value={motDePasse}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {backendError && (
                            // Fenêtre modale d'erreur en cas d'échec de connexion
                                <div className='modal-login-ERROR'>
                                    <p className='error-message'>{errorMessage}</p>
                                    <button>OK</button>
                                </div>
                            )}
                            <div className='modal-BTN'>
                                <button className='login-BTN' onClick={handleLogin}>
                                    LOGIN
                                </button><br />
                                <button className='create-BTN' onClick={onCreateAccountClick}>
                                    CREATE YOUR ACCOUNT
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginModal

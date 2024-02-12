/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'
import '../css/inscription'
const CreateModal = ({ onClose, isOpen, onUserCreated, setAdmin, pf }) => {
    const [email, setEmail] = useState('')
    const [motDePasse, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [nom, setNom] = useState('')
    const [programmeFidelite, setprogrammeFidelite] = useState(false)
    const [isAdmin, setisAdmin] = useState(false)
    const [backendError, setBackendError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleprogrammeF = () => {
        setprogrammeFidelite(!programmeFidelite)
    }

    const handleCreate = () => {
    // validation
        if (
            !email ||
      !motDePasse ||
      !confirmPassword ||
      motDePasse !== confirmPassword ||
      !validateEmail(email)
        ) {
            setBackendError(true)
            setErrorMessage('Please provide valid email or matching passwords.')
            return
        }

        const userData = {
            nom,
            email,
            motDePasse,
            confirmPassword,
            programmeFidelite,
            isAdmin
        }

        axios({
            method: 'post',
            url: 'http://localhost:8888/Backend/ServerSender/creerUtil',
            data: userData
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data)
                    onUserCreated(userData)
                    pf(userData.programmeFidelite)
                } else {
                    setBackendError(true)
                    setErrorMessage(response.data)
                }
            })
            .catch((error) => {
                console.error('timeout exceeded', error)
                setBackendError(true)
                setErrorMessage('Duplicate email')
            })
    }

    return (
        <div id='inscription'>
            <div class='modal'>
                <div class='modal-content'>
                    <div class='box'>
                        <div className='content'>
                            <h2>CREATE ACCOUNT</h2>
                            <input
                                id='bar'
                                type='email'
                                placeholder='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                id='bar'
                                type='input'
                                placeholder='nom'
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                            />
                            <input
                                id='bar'
                                type='password'
                                placeholder='Password'
                                value={motDePasse}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                id='bar'
                                type='password'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            /><br />

                            <label htmlFor='fidelite'>fidelite</label>
                            <input
                                // eslint-disable-next-line react/jsx-no-duplicate-props
                                id='fidelite'
                                type='checkbox'
                                checked={programmeFidelite}
                                onChange={handleprogrammeF}
                            /><br />

                            {backendError && (
                                <div className='modal-ERROR'>
                                    <p className='error-message'>{errorMessage}</p>
                                    <button>OK</button>
                                </div>
                            )}
                            <div class='modal-BTN'>
                                <button class='create-BTN' onClick={handleCreate}>
                                    CREATE ACCOUNT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateModal

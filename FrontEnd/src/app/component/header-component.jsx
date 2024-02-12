/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React from 'react'
import '../css/accueil'

const Header = ({
    onHomeClick,
    onCatalogueClick,
    isLoggedIn,
    onLoginClick,
    onLogout,
    onHistoriqueClick,
    isAdmin,
    onPanierClick,
    onMonCompteClick
}) => {
    return (
        <header>
            <div class='logo-nav'>
                <div class='logo'>
                    <img src='../../img/Logo.png' />
                </div>
                <nav>
                    <ul class='nav'>
                        <li>
                            <a href='#' onClick={onHomeClick}>
                                HOME
                            </a>
                        </li>
                        <li>
                            <a href='#' onClick={onCatalogueClick}>
                                CATALOGUE
                            </a>
                        </li>
                        {isAdmin ? <li>
                            <a href='#' onClick={onHistoriqueClick}>
                                HISTORIQUE
                            </a>
                                   </li> : ''}
                        {isLoggedIn ? isAdmin ? '' : <li>
                            <a href='#' onClick={onMonCompteClick}>
                                MON COMPTE
                            </a>
                                                     </li> : ''}
                        <a href='#' className='loginbox' onClick={isLoggedIn ? onLogout : onLoginClick}>
                                {isLoggedIn ? 'LOGOUT' : 'LOGIN'}
                        </a>
                        {isLoggedIn ? (
                                <img
                                    src='../../img/img_online.png'
                                    /* src={img_online.src} */ alt='Online'
                                />
                            ) : (
                                <img
                                    src='../../img/img_offline.png'
                                    /* src={img_offline.src} */ alt='Offline'
                                />
                        )}
                        {isLoggedIn ? isAdmin ? '' : <li>
                            <a href='#' onClick={onPanierClick}>
                            PANIER
                            </a>
                                                     </li> : ''}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header

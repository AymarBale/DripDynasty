import React from 'react'
import '../css/footer.css' // Importation du fichier CSS pour styliser le footer
import { IonIcon } from '@ionic/react' // Importation du composant IonIcon depuis Ionic
import { logoFacebook, logoTwitter, logoInstagram, logoLinkedin } from 'ionicons/icons' // Importation des icônes spécifiques depuis Ionicons

const FooterComponent = () => {
    return (
        <footer className='footerFooter'> {/* Classe CSS pour le footer */}
            {/* Menu de navigation */}
            <ul className='menu'>
                {/* Lien "Follow" au-dessus des icônes de réseaux sociaux */}
                <li className='menu__item'>
                    <a className='menu__link' href='#'>
                        Follow Us
                    </a>
                </li>
                {/* Liens du menu */}
                <li className='menu__item'>
                    <a className='menu__link' href='#'>
                        Catalogue
                    </a>
                </li>
                <li className='menu__item'>
                    <a className='menu__link' href='#'>
                        Home
                    </a>
                </li>
                <li className='menu__item'>
                    <a className='menu__link' href='#'>
                        Login
                    </a>
                </li>

            </ul>
            {/* Section des icônes de réseaux sociaux */}
            <ul className='social-icon'>
                {/* Icône Facebook */}
                <li className='social-icon__item'>
                    <a className='social-icon__link' href='#'>
                        <IonIcon icon={logoFacebook} /> {/* Utilisation de IonIcon avec l'icône Facebook */}
                    </a>
                </li>
                {/* Icône Twitter */}
                <li className='social-icon__item'>
                    <a className='social-icon__link' href='#'>
                        <IonIcon icon={logoTwitter} /> {/* Utilisation de IonIcon avec l'icône Twitter */}
                    </a>
                </li>
                {/* Icône LinkedIn */}
                <li className='social-icon__item'>
                    <a className='social-icon__link' href='#'>
                        <IonIcon icon={logoLinkedin} /> {/* Utilisation de IonIcon avec l'icône LinkedIn */}
                    </a>
                </li>
                {/* Icône Instagram */}
                <li className='social-icon__item'>
                    <a className='social-icon__link' href='#'>
                        <IonIcon icon={logoInstagram} /> {/* Utilisation de IonIcon avec l'icône Instagram */}
                    </a>
                </li>
            </ul>
            {/* Texte de copyright */}
            <p className='poweredBy'>
                Powered By Shoe Store
            </p>
            <p>
                &copy;2024 Shoe Store | Credits
            </p>
            {/* Scripts pour charger les icônes Ionicons */}
            <script
                type='module'
                defer
                src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js'
            />
            <script
                noModule
                defer
                src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js'
            />
        </footer>
    )
}

export default FooterComponent

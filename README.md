# DripDynasty

<h2>Introduction</h2>
<p> Il s'agit d'un projet fait en équipe dans le cadre de ma formation en Web. Le projet consiste à faire un site web avec deux serveurs, un serveur backend en J2EE et un serveur frontend en React qui communiquent entre eux à l'aide de requêtes. Le serveur backend a quant à lui fait des requêtes vers une base de donnée. Pour ensuite envoyer les réponses vers le front end.</p>

<h2>Liste des fonctionnalite</h2>
<h4>-Espace client :</h4>
Il s’agit là de créer une page de connexion qui sera nécessaire quand l’utilisateur voudra payer, mais pas nécessaire pour ajouter des choses dans le panier. Une fois connecté, l’utilisateur pourra accéder à des informations comme son nom et son email.<br>
 
<h4>-Ajouter au panier :</h4>
Il s'agit de créer un panier ou l’utilisateur pourra ajouter des articles sans se connecter
et payer. Une fois qu’il aura payé, il recevra les détails des ventes par courriel.le panier sera vider apres
 
<h4>-Moteur de recherche :</h4>
On veut permettre à l’utilisateur de chercher différents articles dans le catalogue suivant le critère qu'il va choisir.
 
<h4>-Rabais et programme de fidélité :</h4>
On veut permettre à l’utilisateur de s’inscrire à un programme de fidélité et de se désabonner quand il est un inscrit, il aura une réduction sur les articles  dans le catalogue.
 
<h4>-Fonctionnalité Admin :</h4>
Permettre à l’admin de voir le stock , de modifier la quantité des produits et leurs stocks. Il sera aussi capable de voir l’historique des achats.
<h2>Demo</h2>


https://github.com/AymarBale/DripDynasty/assets/62848857/bc7768a4-ddf5-4199-b39a-721e7df898fa


![Screenshot (19)](https://github.com/AymarBale/DripDynasty/assets/62848857/422cf729-0428-4abd-85c6-546bf4f17807)

![Screenshot (18)](https://github.com/AymarBale/DripDynasty/assets/62848857/71f7a5a3-a1db-412d-b418-720f19e611bc)

![Screenshot (17)](https://github.com/AymarBale/DripDynasty/assets/62848857/0baf9fbd-767f-4bf5-ba27-591930c15ca0)


<h2> Langage utilise</h2>

![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

## Instructions d'installation

### Backend
1. Ouvrez NetBeans.
2. Importez le fichier Backend.
3. Utilisez un serveur Apache Tomcat sur le port 8888.
4. Compilez et lancez le projet.

### FrontEnd
1. Utilisez Visual Studio Code (VSC).
2. Ouvrez le fichier FrontEnd.
3. Assurez-vous d'avoir Node.js installé (version égale ou supérieure à 18.2).
4. Dans le terminal du dossier FrontEnd, exécutez les commandes suivantes dans l'ordre :
    - `npm install`
    - `npm run build`
    - `npm run dev`

### Database
1. Utilisez pgAdmin 4.
2. Utilisez le port 5433.
3. Créez une base de données nommée "ProduitMagasin".
4. Dans les fichiers Database, copiez-collez le script SQL.
5. Exécutez les commandes d'insertion pour peupler la base de données.

## Configuration
Assurez-vous de configurer les paramètres appropriés dans les fichiers de configuration, notamment les informations de base de données, les ports, et autres configurations spécifiques au projet.

## Remarques
- Vérifiez les dépendances du projet pour garantir un bon fonctionnement.
- Assurez-vous d'avoir une connexion Internet stable lors de l'installation des dépendances.
- Pour toute question ou problème, n'hésitez pas à consulter la documentation du projet ou à contacter l'équipe de développement.

# Projet : Plateforme de Gestion de Modèles ML (Full-Stack)

> **Objectif :** Construire une application web complète pour gérer et exécuter des modèles de Machine Learning, tout en démontrant une maîtrise des standards industriels du développement logiciel.

---

##  Phase 1 : Architecture & Environnement de Développement

### 1. Choix Technologiques (Stack Technique)
* **Front-end :** React.js (pour une interface réactive et composable).
* **Back-end :** Spring Boot 3+ (Java 21) pour une logique métier robuste et sécurisée.
* **Base de données :** PostgreSQL (système de gestion de base de données relationnelle performant).
* **Conteneurisation :** Docker & Docker Compose (pour l'orchestration des services).



---

##  Points Clés d'Apprentissage (Q&A)

###  Infrastructure & DevOps
**Q : Pourquoi utiliser Docker Compose pour PostgreSQL au lieu d'une installation locale ?**
* **Portabilité :** Le projet peut être lancé sur n'importe quelle machine avec la même configuration via `docker-compose up`.
* **Isolation :** Évite les conflits de versions et de ports sur le système hôte.
* **Professionnalisme :** Démontre une compréhension du cycle de vie des applications modernes et des principes DevOps.

###  Spring Boot Core
**Q : Quel est le rôle du fichier `application.yaml` ?**
* Il centralise la configuration du projet : connexion à la base de données (URL, user, password) et paramètres de l'ORM Hibernate (`ddl-auto: update` pour la création automatique des tables).

**Q : Comment résoudre l'erreur 404 lors de la création d'un nouveau Controller ?**
* **Component Scan :** Spring Boot scanne uniquement les classes situées dans le package de la classe principale (annotée `@SpringBootApplication`) et ses sous-packages. Il faut s'assurer que le Controller est dans le bon répertoire.



###  Sécurité
**Q : Pourquoi la page "Please sign in" s'est-elle affichée automatiquement ?**
* **Spring Security :** En ajoutant cette dépendance, l'application est sécurisée par défaut. Cela montre une approche "Security by Design".
* **Auth :** L'authentification utilise un utilisateur par défaut (`user`) et un mot de passe généré dynamiquement dans les logs de la console.

---

##  Commandes Utiles (Cheat Sheet)

| Action | Commande |
| :--- | :--- |
| **Démarrer la DB** | `docker-compose up -d` |
| **Arrêter la DB** | `docker-compose down` |
| **Vérifier les containers** | `docker ps` |
| **Git Commit Pro** | `git commit -m "feat: description"` |

---

##  Progression du Projet (Workflow)

1.  **Initialisation :** Génération du projet via Spring Initializr avec les dépendances Web, JPA, Postgres, Security et Lombok.
2.  **Dockerisation :** Configuration du service de base de données.
3.  **Premier API :** Création d'un `RestController` pour valider la communication entre le client et le serveur.
4.  **Validation :** Test de l'endpoint `/api/hello` avec authentification.

---

##  Prochaines Étapes
- [ ] **Modélisation (JPA) :** Créer l'entité `MLModel` pour mapper les modèles Python en base de données.
- [ ] **Repository :** Utiliser Spring Data JPA pour les opérations CRUD (Create, Read, Update, Delete).
- [ ] **Interface :** Initier la partie React pour afficher les données du Back-end.


# Projet : Engineering Portfolio - Phase 2 (Data & Full-Stack)

> **Objectif :** Transformer le squelette Spring Boot en un système complet de gestion de projets, capable de stocker des données réelles et de les servir à un front-end React moderne.

---

## Architecture & Persistance des Données

### 1. Modélisation Générique (JPA Entity)
Au-delà du simple ML, l'entité `MLModel` a été étendue pour devenir une structure de gestion de projet polyvalente :
* **Champs Clés :** `name`, `category`, `techStack`, `status`, `description`, `achievement`.
* **Énumération :** Utilisation de `ProjectStatus` (`PLANNED`, `IN_PROGRESS`, `COMPLETED`) pour une gestion rigoureuse du cycle de vie des projets.

### 2. Initialisation de la Base de Données
* **Data Loader :** Mise en place d'un `CommandLineRunner` pour peupler automatiquement PostgreSQL avec 10 projets réels (NLP, Jeux, Recherche, Digital Twin) dès le démarrage de l'application.

---

## Points Clés d'Apprentissage (Q&A)

### Communication Inter-Services
**Q : Pourquoi mon front-end (React) ne pouvait-il pas lire les données du back-end au début ?**
* **CORS (Cross-Origin Resource Sharing) :** Pour des raisons de sécurité, les navigateurs bloquent les requêtes entre des ports différents (8080 vs 5174).
* **Solution :** Ajout de l'annotation `@CrossOrigin` sur le Controller Spring Boot pour autoriser explicitement le port du front-end.

### Design & Expérience Utilisateur
**Q : Comment Tailwind CSS a-t-il été configuré pour le projet ?**
* **Configuration :** Installation des dépendances et initialisation du fichier `tailwind.config.js` pour scanner les fichiers `.jsx`.
* **Layout :** Utilisation d'un système de grille responsive (`grid-cols-1 md:grid-cols-3`) pour assurer une consultation fluide sur mobile et desktop.

### Résolution de Problèmes (Debugging)
**Q : Que faire si le port 8080 est déjà utilisé ?**
* **Action :** Il faut identifier le PID du processus Java précédent et le terminer via le terminal pour libérer le port 8080.

---

## État de l'Interface (Dashboard)

| Composant UI | Fonctionnalité | Source de Données |
| :--- | :--- | :--- |
| **Header Statistics** | Project Summary (Total, Completed, In Progress) | Backend `repository.count()` |
| **Project Cards** | Detailed Display (with icons and descriptions) | Backend API `/api/models` |
| **Status Badges** | Dynamic Status Label (Terminé, En cours) | Backend Enum `ProjectStatus` |

---

## Commandes de la Semaine

| Action | Commande |
| :--- | :--- |
| **Installer Tailwind** | `npm install -D tailwindcss postcss autoprefixer` |
| **Initialiser la configuration** | `npx tailwindcss init -p` |
| **Lancer l'interface utilisateur** | `npm run dev` |
| **Git nettoyage forcé** | `git rm -rf --cached .` |

---

## Prochaines Étapes
- [ ] **Filtrage Dynamique :** Ajoutez un champ de recherche pour permettre le filtrage des projets par pile technologique.
- [ ] **Optimisation des interactions :** Implémentez « Framer Motion » pour ajouter des animations d'entrée aux cartes.
- [ ] **Conteneurisation :** Affinez la configuration Docker pour permettre le déploiement en un clic du frontend et du backend.
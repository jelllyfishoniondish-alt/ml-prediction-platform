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
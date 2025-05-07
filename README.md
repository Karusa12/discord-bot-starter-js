# Karusa Project

## Description / Description

**FR :** Karusa Project est un bot Discord avancé, conçu pour offrir une gestion complète des interactions Discord, une API REST et des communications en temps réel via WebSocket. Ce projet est construit avec TypeScript et utilise des bibliothèques modernes comme `discord.js`, `express` et `mongoose`.

**EN :** Karusa Project is an advanced Discord bot designed to provide comprehensive management of Discord interactions, a REST API, and real-time communications via WebSocket. This project is built with TypeScript and uses modern libraries such as `discord.js`, `express`, and `mongoose`.

## Fonctionnalités principales / Main Features

**FR :**

* **Commandes Slash** : Gestion des commandes publiques et privées.
* **Interactions avancées** : Boutons, menus de sélection et modaux interactifs.
* **API REST** : Permet d'interagir avec les utilisateurs et les serveurs Discord via des endpoints HTTP.
* **WebSocket** : Communication en temps réel pour envoyer des messages aux canaux Discord.
* **Planification de tâches** : Envoi de messages récurrents avec `node-cron`.
* **Gestion des erreurs** : Journalisation des erreurs et gestion des exceptions.
* **Base de données MongoDB** : Persistance des données pour les utilisateurs et les serveurs.

**EN :**

* **Slash Commands**: Management of public and private commands.
* **Advanced Interactions**: Buttons, select menus, and interactive modals.
* **REST API**: Enable interaction with Discord users and servers via HTTP endpoints.
* **WebSocket**: Real-time communication to send messages to Discord channels.
* **Task Scheduling**: Send recurring messages with `node-cron`.
* **Error Handling**: Logging of errors and exception management.
* **MongoDB Database**: Data persistence for users and servers.

## Architecture du projet / Project Architecture

**FR :** Voici une vue d'ensemble de l'architecture du projet :

```
discord-bot-starter-js/
├── src/
│   ├── api/                     # API REST et WebSocket
│   │   ├── controllers/         # Contrôleurs pour les routes API
│   │   ├── middlewares/         # Middlewares pour l'API et WebSocket
│   │   ├── routes/              # Routes API (user, guild, websocket)
│   │   └── services/            # Services pour la logique métier
│   ├── commands/                # Commandes Discord (public, private, message)
│   ├── events/                  # Gestion des événements Discord
│   ├── handlers/                # Gestionnaires pour les interactions et commandes
│   ├── interactions/            # Interactions Discord (boutons, menus, modaux)
│   ├── schema/                  # Schémas Mongoose pour MongoDB
│   ├── function/                # Fonctions utilitaires
│   ├── bot.ts                   # Initialisation du bot Discord
│   ├── index.ts                 # Gestionnaire de sharding
│   └── routine.ts               # Planification des tâches récurrentes
├── dist/                        # Fichiers compilés (générés après `npm run build`)
├── logs/                        # Fichiers de logs (console et erreurs)
├── .env.example                 # Exemple de configuration des variables d'environnement
├── tsconfig.json                # Configuration TypeScript
├── package.json                 # Dépendances et scripts npm
└── README.md                    # Documentation du projet
```

**EN :** Here is an overview of the project architecture:

```
discord-bot-starter-js/
├── src/
│   ├── api/                     # REST API and WebSocket
│   │   ├── controllers/         # Controllers for API routes
│   │   ├── middlewares/         # Middlewares for API and WebSocket
│   │   ├── routes/              # API routes (user, guild, websocket)
│   │   └── services/            # Services for business logic
│   ├── commands/                # Discord commands (public, private, message)
│   ├── events/                  # Discord event handlers
│   ├── handlers/                # Handlers for interactions and commands
│   ├── interactions/            # Discord interactions (buttons, select menus, modals)
│   ├── schema/                  # Mongoose schemas for MongoDB
│   ├── function/                # Utility functions
│   ├── bot.ts                   # Discord bot initialization
│   ├── index.ts                 # Sharding manager
│   └── routine.ts               # Task scheduling routines
├── dist/                        # Compiled files (generated after `npm run build`)
├── logs/                        # Log files (console and errors)
├── .env.example                 # Example environment configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and npm scripts
└── README.md                    # Project documentation
```

## Prérequis / Prerequisites

**FR :** Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

* [Node.js](https://nodejs.org/) (version 16 ou supérieure)
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
* Une base de données MongoDB
* Un token Discord valide

**EN :** Before getting started, make sure you have the following installed:

* [Node.js](https://nodejs.org/) (version 16 or higher)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* A MongoDB database
* A valid Discord token

## Installation

**FR :**

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/Karusa12/discord-bot-starter-js
   cd discord-bot-starter-js
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configurez les variables d'environnement :

   ```bash
   cp .env.example .env
   ```

   Remplissez `.env` avec :

   * `token` : Votre token Discord.
   * `guild` : L'ID de votre serveur Discord.
   * `client` : L'ID de votre application Discord.
   * `mongo` : Votre chaîne de connexion MongoDB.
   * `port` : Le port pour l'API (par défaut : 3000).

4. Compilez le projet TypeScript :

   ```bash
   npm run build
   ```

5. Lancez le bot :

   ```bash
   npm run start
   ```

**EN :**

1. Clone the repository:

   ```bash
   git clone https://github.com/Karusa12/discord-bot-starter-js
   cd discord-bot-starter-js
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Fill in `.env` with:

   * `token`: Your Discord token.
   * `guild`: Your Discord server ID.
   * `client`: Your Discord application ID.
   * `mongo`: Your MongoDB connection string.
   * `port`: The API port (default: 3000).

4. Compile the TypeScript project:

   ```bash
   npm run build
   ```

5. Start the bot:

   ```bash
   npm run start
   ```

## Utilisation / Usage

**FR :**

* **Commandes Discord** :

  * Commandes publiques comme `/ping` pour tester la latence.
  * Commandes privées spécifiques au serveur, comme `/ping-guild`.
  * Interactions : boutons, menus de sélection et modaux.

* **API REST** :

  * URL : `http://localhost:3000/`
  * Routes disponibles : `/user`, `/user/:id`, `/guild`, `/guild/:id`.

* **WebSocket** :

  * URL : `ws://localhost:3000/websocket`
  * Exemple de message JSON :

    ```json
    {
      "guild": "1234idguild",
      "channel": "1234idchannel",
      "message": "Hello, world! (ceci est un message de test)"
    }
    ```

**EN :**

* **Discord Commands**:

  * Public commands like `/ping` to test latency.
  * Private commands specific to a server, like `/ping-guild`.
  * Interactions: buttons, select menus, and modals.

* **REST API**:

  * URL: `http://localhost:3000/`
  * Available routes: `/user`, `/user/:id`, `/guild`, `/guild/:id`.

* **WebSocket**:

  * URL: `ws://localhost:3000/websocket`
  * Example JSON message:

    ```json
    {
      "guild": "1234idguild",
      "channel": "1234idchannel",
      "message": "Hello, world! (this is a test message)"
    }
    ```

## Contribution

**FR :** Les contributions sont les bienvenues ! Soumettez une pull request ou ouvrez une issue pour signaler des bugs ou proposer des améliorations.

**EN :** Contributions are welcome! Please submit a pull request or open an issue to report bugs or suggest improvements.

## Licence / License

**FR :** Ce projet est sous licence [MIT](https://opensource.org/licenses/MIT).

**EN :** This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

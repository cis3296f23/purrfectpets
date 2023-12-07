<p align="center">
  <img src="src/assets/coding-cat.png" alt="Cat Icon" style="width: 100px;"/>
</p>

# **<p style="text-align: center;">PurrfectPets</p>**
<p align="center">
  <img src="https://img.shields.io/github/contributors/cis3296f23/purrfectpets" alt="GitHub contributors">
  <img src="https://img.shields.io/github/commit-activity/m/cis3296f23/purrfectpets" alt="GitHub commit activity">
  <img src="https://img.shields.io/github/issues/cis3296f23/purrfectpets" alt="GitHub issues">
</p>
Discover your ideal companion using PurrfectPets – the ultimate destination for pet adoption. Customize your preferences, and witness a delightful array of adorable pets right at your fingertips. Express your affection by liking your favorite pets, and with a simple click, we'll guide you to the PetFinder website, connecting you directly with the shelter or owner. Your journey to finding the perfect pet begins here.

## Project Overview

PurrfectPets is a platform dedicated to pet adoption, allowing users to discover their ideal companions. Customize your preferences, interact with adorable pets, and seamlessly connect with shelters or owners through the PetFinder website.

<p align="center">
  <img src="src/assets/home-page.png" alt="Home Page" style="width: 700px;"/>
</p>

## How to contribute

### Getting Started

#### Recommended / Required Development Utilities

* [NodeJS](https://nodejs.org/en/download) version 20.x or higher
* [Git](https://git-scm.com/downloads)
* [PetFinder](https://www.petfinder.com/developers/) API Keys

#### Contributing and Staying Up to Date

Follow the [project board](https://github.com/orgs/cis3296f23/projects/118) to stay updated on the project's status. If you want to contribute:

1. Clone this GitHub repository: `git clone https://github.com/cis3296f23/purrfectpets.git`
1. Create your own branch off of Production or Dev
2. Run `npm install` to install all dependencies needed
3. Use your preferred IDE for development
4. Open a Pull Request to Dev

#### How to build

* Install NodeJS version 20.x or higher
  * Run `node --version` to ensure you are running version 20.x or higher
* Ensure all packages are up to date and installed by running `npm install`
* Ensure API keys are in the `.env` file

```env
PETFINDER_API_KEY=<your api key>
PETFINDER_API_SECRET=<your api secret>
AZURE_SQL_SERVER=purrfectpetssql.database.windows.net
AZURE_SQL_DATABASE=purrfectpetsusers
AZURE_SQL_PORT=1433
AZURE_SQL_USER=<your username>
AZURE_SQL_PASSWORD=<your password>
```

* Run `npm run dev` to start an instance of the application on Localhost.
* Click on http://localhost:5173/

![Building and Running the App](src/assets/build-instructions.png)

Cat icons created by  [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/)
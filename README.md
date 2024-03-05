
  <h1 align="center">Flashcards Backend with NestJS</h1>

  ## Table of contents
1. [Note to recruiters](#note-to-recruiters)
2. [One liner](#one-liner)
3. [Instalation](#instalation)
4. [Running the app](#running-the-app)
6. [Running the tests](#running-the-tests)
7. [Features](#features)
8. [Sets and Cards logic](#features)
9. [Translations of cards logic](#translation-of-cards-logic)
10. [Adding sets and cards to learning stack](#adding-sets-and-cards-to-learning-stack)
11. [Stay in touch](#stay-in-touch)

  

  
## Note to recruiters
This repository is my coding playground, where I explore and mix GraphQL and HTTP requests with NestJS - I undrestand using both of them simultaneously in the project is not the best approach from development perspective. While it's currently a learning space, I am serious about launching this app commercially in the future. I'm aware of my current gaps, but I see this project as both a recruitment showcase and a stepping stone in creating a cross-platform app based on NestJS and a monorepo of React and React Native for the frontend. This serves as a sketch or scaffolding for the long-term project that I will develop as an experienced developer

Thank you for checking it out!

Best regards,
Damian

## One liner
This project is dedicated to offering users a seamless and efficient language learning platform. by integrating the finest features from industry-leading language apps, and introducing niche learning methods not yet digitalized by them.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Features
Currently, the only functionalities of the application consist of authorization, authentication, creating sets, cards and adding translations.

## Sets and Cards logic
- They are two pools of cards - official cards, and cards created by users
- Official Sets contains only official cards
- User Sets contains User Cards and also official cards
- Official Sets, and User Sets differ from Learning Sets - becouse user can choose if he wants to add entire set to learn, or choosen cards. More about it in [Adding sets and cards to learning stack](#adding-sets-and-cards-to-learning-stack)

![cards and sets logic](https://github.com/damianSwieboda/FlashcardsBackendNestJS/assets/104576595/085d6afb-9e80-4a95-a1e0-770b3c951bad)

## Translations of cards logic
Your readme section provides a clear explanation of the structure and advantages of the translation property in your cards. However, there are a couple of minor edits for clarity and readability:

"Every card contains a 'translations' property, which comprises an array of objects. Each object represents a language translation of the card in which it is located. There is no single main word to translate; instead, multiple translations are grouped by meaning and common definitions.

The advantage of this approach is the easy and fast creation of translations for multiple languages. For instance, if a card has two translations, such as Polish and English, it is useful for two types of customers: those who use Polish and want to learn English, and vice versa.
However, adding one more translation, let's say Spanish, increases its utility for six types of customers.
```bash
polish customer can learn: english(1) and spanish(2)
english customer can learn: polish(3) and spanish(4)
spanish customer can learn: english(5) and polish(6)
```

With each additional translation, the number of language pairs is expanding exponentially. Example after adding french translation:
```bash
polish customer can learn: english(1), spanish(2) and french(3)
english customer can learn: polish(4), spanish(5)  and french(6)
spanish customer can learn: english(7), polish(8) and french(9)
french customer can learn: polish(10), spanish(11) and english(12)
```
![Translations logic](https://github.com/damianSwieboda/FlashcardsBackendNestJS/assets/104576595/b85b8002-c4b5-41fb-ab13-3ed6ade4ab90)


## Adding sets and cards to learning stack
Work in progress, nothing here yet

## Stay in touch
- Author Linkedin profile - [Damian Świeboda](https://www.linkedin.com/in/damian-%C5%9Bwieboda/)

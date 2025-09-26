<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="">
    <img src="/client/src/Assets/Images/home.png" alt="Logo" width="1846" height="847">
  </a>

<h3 align="center">Hangmen</h3>

</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#deployed-version">Deployed Version</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      </li>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#future-changes">Future Changes</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The project is an update to the earlier create-react-app build of the classic game Hangman.
You can find the old version here - 

Project Link: [https://github.com/github_username/repo_name](https://github.com/Rambo9223/Hangmen)


The new conceptual game Hangmen aims to be an multi-layered improvement to the original game. 
In classic Hangman the player must guess letters to ultimatley reveal a word, guesses are usually limited to ten and on completion or failure there is no continuation to the game. The player may only begin a new game or retry if the game is failed. 

Hangmen creates a new concept where the user attempts to save mutliple stick figure men over 5 rounds with subsequent rule changes over each round.

The stick figures images have been updated by Jenny Rose:

LinkedIn: [https://www.linkedin.com](https://uk.linkedin.com/in/jennifer--rose) 

GitHub: [https://github.com/github_username](https://github.com/rosejar)

Original music & SFX have been added to the game for added atmosphere.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* [![React][React.js]][React-url]
* [![Redux][Redux.js.com]][Redux.js-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Express.js][Express.js.com]][Express.js-url]
* [![Node.js][Node.js.com]][Node.js-url]
* [![RapidAPI][RapidAPI.com]][RapidAPI-url]
* [![ChatGPT][ChatGPT.com]][ChatGPT-url]



The app was built using the React frame work with create-react-app. 
On the client side global state management is handled by redux.  
Bootstrap components and icons are used for styling.
The dictionary was built with a custom node/express js server, it has been ommited from the main Git repository as it was only required on the development side and not on the final version of the project. It is available to view on request. The server used a pre-existing dictionary JSON object and queried random words to the thesaurus-by-api-ninjas API. If the words had both synonms and antonyms, the returned object was pushed to a new JSON, if not the queried word was omitted from the original dictionary.
The final dictionary JSON file for use on the client side of the application was modified and formatted with ChatGPT. 


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- Deployed Version -->

## Deployed Version 

If you would like to view the deployment of the game you can find it here - <a href="link to deployment">Deployed Version</a>


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.


### Prerequisites

Ensure you have the latest copy of VSCode downloaded to your machine. 
Find it here - <a href="https://code.visualstudio.com/">VSCode</a>

### Installation

Download the zipped file from the GitHub Repo and unzip in to your chosen directory.

Open the terminal or VSCode and navigate to the directory that contains the files using cd
,cd to the server

![terminal](/client/src/Assets/Images/terminal.png)

  Type in to the terminal
    ```
    npm start
    ```
then enter, the required packages should install and once compiled you will be able to use the app on your browser at localhost:3000

![Successful Compile](/client/src/Assets/Images/compiled.png)

![Home Screen](/client/src/Assets/Images/home.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

The game is played as follows: 

The player will input letters or words in to the input field and either click/tap guess or use the enter key. 

![Correct Word](/client/src/Assets/Images/correct.png)
![Incorrect Word](/client/src/Assets/Images/incorrect.png)

The first round is played in the same manner as classic Hangman in which the player guesses letters in order to make a word, the game will allow 10 incorrect guesses. This is the only round that allows the player to restart the game with the same word if the player should fail.

![Failed Round 1](/client/src/Assets/Images/gameoverR1.png)
![Passed Round 1](/client/src/Assets/Images/winnerR1.png)

The second round will ask the player to make a word only using the letters from the successfully guessed word from round 1, the player will have 3 guesses to complete this.

![Round 2](/client/src/Assets/Images/round2.png)

The third round will ask the player to create a word starting with the last letter of the original word in round 1 and be at least no shorter in length to the original word by two characters. The player will have 3 guesses to complete this.

The fourth round requires the player to guess a synonym of the original word, the player has 3 guesses to complete this. 

The fifth and final round requires the player to guess an antonym of the original word, again the player has 3 guesses to complete this. 

At any point after round one the user can decide to quit the game by clicking the give up button however this counts as a loss. 

![Game Over](/client/src/Assets/Images/lostR2.png)

Should the player complete all of the rounds and win the game, they will arrive at the end page, from here they can choose to start another game. 

![Game Won](/client/src/Assets/Images/gamewon.png)

If during the game the player inputs an incorrect answer or tries to enter a duplicate letter or word the game may throw certain errors, depending on the rules of the round a life may or may not be deducted. 
![Duplicate Error](/client/src/Assets/Images/duplicate.png)
![Game Error](/client/src/Assets/Images/error.png)

The game uses custom music and sounds, these change based on the game round. The player can choose to mute/unmute the music by clicking the speaker icon. 

![Mute/Unmute](/client/src/Assets/Images/mute.png)

If the playes need to at anytime refresh their knowledge of the rules they can click on the rules button and this will open up a modal as follows. Doing this will not affect the current progress of the game. 

![Rules](/client/src/Assets/Images/rules.png)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Testing -->
## Testing

To run the tests on the app simply open the terminal, cd to the server directory and type in 
    ```
    npm test
    ```

![NPM Test](/client/src/Assets/Images/test.png)

Provided the project has been installed correctly the server test suite will run, and then the client 
test will run. It should appear as follows:

![Tests](/client/src/Assets/Images/results.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Future Changes -->
## Future Changes

For this project I have listed below some of the future changes I would like to make to the App to increase it's functionality and efficiancy.

- Adjust/simplify components to make them more reusable, reduce repetative code and increase efficiancy. 
- Introduce a word of the day similar to the game wordle to keep users interacting on a day to day basis.
- Vary the imagary and sfx in the game to keep the game feeling fresh to the user.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Scott Ramsay - sct_r_9223@live.co.uk

Project Link: [https://github.com/github_username/repo_name](https://github.com/Rambo9223/Hangmen)

GitHub Profile: [https://github.com/github_username](https://github.com/Rambo9223)

LinkedIn: [https://www.linkedin.com](www.linkedin.com/in/scott-ramsay-287b43286)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Mongo.com]:https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]:https://www.mongodb.com/
[Express.js.com]:https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express.js-url]:https://expressjs.com/
[RapidAPI.com]:https://img.shields.io/badge/RapidAPI-0055DA?style=for-the-badge&logo=rapid&logoColor=black
[RapidAPI-url]:https://rapidapi.com/
[ChatGPT.com]:https://img.shields.io/badge/ChatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white
[ChatGPT-url]:https://chatgpt.com/
[Node.js.com]:https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node.js-url]:https://nodejs.org/
[Redux.js.com]:https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[Redux.js-url]:https://redux.js.org/

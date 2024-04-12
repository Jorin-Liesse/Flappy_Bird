# Flappy Bird
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]
[![GitHub Release](https://img.shields.io/github/v/release/Jorin-Liesse/Flappy_Bird)](https://github.com/Jorin-Liesse/Flappy_Bird/releases)
[![GitHub Stars](https://img.shields.io/github/stars/Jorin-Liesse/Flappy_Bird)](https://github.com/Jorin-Liesse/Flappy_Bird/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Jorin-Liesse/Flappy_Bird)](https://github.com/Jorin-Liesse/Flappy_Bird/forks)
[![GitHub watchers](https://img.shields.io/github/watchers/Jorin-Liesse/Flappy_Bird)](https://github.com/Jorin-Liesse/Flappy_Bird/watchers)

## Table of Contents
- [Installation](#Installation)
- [Troubleshooting](#Troubleshooting)
- [Usage](#Usage)
- [Credits](#Credits)
- [License](#License)
- [Project Description](#Project-Description)

## Installation

### Prerequisites
Before installing and running the application, please ensure that you have the following prerequisites installed on your system:

- Node.js (>= 10.x)
- npm (Node Package Manager)

### Method 1: Running with npm http-server (Windows, macOS, Linux)

1. Open your command line interface.
2. Navigate to the root directory of the repository.
3. Run the following commands:
    ```bash
    npm init -y
    npm install -g http-server
    http-server
    ```
4. If you encounter the error message:
    ```
    http-server : File C:\Users\yourusername\AppData\Roaming\npm\http-server.ps1
    cannot be loaded because running scripts is disabled on this system...
    ```
    You need to adjust the execution policy by running:
    ```bash
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```
5. Run `http-server` again.
6. Open your web browser and navigate to one of the following URLs:
    - [http://192.168.129.85:8080](http://192.168.129.85:8080)
    - [http://127.0.0.1:8080](http://127.0.0.1:8080)

### Method 2: Building from Source (Windows, macOS, Linux)

1. Open your command line interface.
2. Navigate to the root directory of the repository.
3. Run the following commands to install dependencies and build the application:
    ```bash
    npm install
    npm run build-win  # for Windows
    # OR
    npm run build-mac  # for macOS
    # OR
    npm run build-linux  # for Linux
    ```
4. Once the build process is complete, navigate to the `build` folder.
5. In the `build` folder, you will find the application folder containing `Flappy-Bird.exe` (for Windows).
   
## Troubleshooting
If you encounter any issues during installation or running the application, please refer to the following steps:

- Make sure you navigate to the root directory of the repositor.
- For issues related to script execution policies on Windows, refer to [Microsoft's documentation](https://go.microsoft.com/fwlink/?LinkID=135170).
- Make sure you have installed all required dependencies and have the correct version of Node.js and npm.
  
## Usage
### Playing the Game

To play the game, follow these steps:

1. Launch the game by double-clicking the executable file (`Flappy-Bird.exe` for Windows).
2. Once the game is launched, you will be presented with the main menu.
3. Use the following controls to play the game:
   - **Spacebar** or **Left Mouse Button**: Flap wings to fly.
   - *Optionally include other controls here.*
4. Navigate through the obstacles by tapping the spacebar or left mouse button to keep the bird flying.
5. Try to achieve the highest score possible by passing through the gaps between the obstacles without colliding.
6. The game ends when the bird falls off the screen.
7. After the game ends, you can view your score and try again to beat it.

### Controls

- **Spacebar** or **Left Mouse Button**: Flap wings to fly.
- **Escape**: To pause the game.

## Credits
### Development

- [Jorin Liesse](https://github.com/Jorin-Liesse) - Sole developer of the project

  ### Personal Links

- [Portfolio Website](https://jorin-liesse.github.io/Portfolio/){:target="_blank" rel="noopener"} - Visit my portfolio to learn more about my projects and skills.
- [LinkedIn](https://www.linkedin.com/in/jorin-liesse-755774287/){:target="_blank" rel="noopener"} - Connect with me on LinkedIn.

### Inspirations

- Mention any games, projects, or individuals who inspired your work

### Testers

- [Sander Daniels](https://www.linkedin.com/in/sander-daniels-429a11293/) - Provided valuable feedback and testing
- [Brian Thys](https://www.linkedin.com/in/brian-thys-4a88492a4/) - Provided valuable feedback and testing

## License
This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

## Project Description


//////////////

# Your App Name

Welcome to [Your App Name]! This is a simple guide to get you started with running the application.

## Installation

### Prerequisites
Before installing and running the application, please ensure that you have the following prerequisites installed on your system:

- Node.js (>= 10.x)
- npm (Node Package Manager)

### Method 1: Running with npm http-server (Windows, macOS, Linux)

1. Open your command line interface.
2. Navigate to the root directory of the repository.
3. Run the following commands:
    ```bash
    npm init -y
    npm install -g http-server
    http-server
    ```
4. If you encounter the error message:
    ```
    http-server : File C:\Users\yourusername\AppData\Roaming\npm\http-server.ps1 cannot be loaded because running scripts is disabled on this system...
    ```
    You need to adjust the execution policy by running:
    ```bash
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```
5. Run `http-server` again.
6. Open your web browser and navigate to one of the following URLs:
    - [http://192.168.129.85:8080](http://192.168.129.85:8080)
    - [http://127.0.0.1:8080](http://127.0.0.1:8080)

### Method 2: Building from Source (Windows, macOS, Linux)

1. Open your command line interface.
2. Navigate to the root directory of the repository.
3. Run the following commands to install dependencies and build the application:
    ```bash
    npm install
    npm run build-win  # for Windows
    # OR
    npm run build-mac  # for macOS
    # OR
    npm run build-linux  # for Linux
    ```
4. Once the build process is complete, navigate to the `build` folder.
5. In the `build` folder, you will find the application folder containing `Flappy-Bird.exe` (for Windows).

## Troubleshooting
If you encounter any issues during installation or running the application, please refer to the following steps:

- Make sure you navigate to the root directory of the repositor.
- For issues related to script execution policies on Windows, refer to [Microsoft's documentation](https://go.microsoft.com/fwlink/?LinkID=135170).
- Make sure you have installed all required dependencies and have the correct version of Node.js and npm.


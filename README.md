# Amal

## Setup

This project uses [devcontainers](https://containers.dev/) to streamline the setup process. Moreover, this project 
is [DevPod](https://devpod.sh/) compatible, so it may be used to make the build process even easier.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) or an 
[alternative Docker option](https://code.visualstudio.com/remote/advancedcontainers/docker-options), like Docker on a remote host or 
Docker compliant CLI, installed
  - Docker must be running!
- [Visual Studio Code](https://code.visualstudio.com/) (VSCode) installed
  - [Dev Containers](https://aka.ms/vscode-remote/download/containers) plugin
- [Expo Go](https://expo.dev/client) installed on mobile device
- [DevPod](https://devpod.sh/) (optional) installed

#### Chocolatey Installation

If using Windows, it's recommended to install the pre-requisites using [chocolatey](https://community.chocolatey.org/). If you have some of the applications already installed, consider removing them in favor of the homebrew installation or modify the command to not install it if you prefer.

```
choco install docker-desktop docker-compose vscode devpod

code --install-extension ms-vscode-remote.remote-containers
```

**Note:** For Docker Desktop to work on Windows, [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) must be installed. You will see this be an error if you start Docker Desktop after installing.

#### Homebrew Installation

If using MacOS, it's recommended to install the pre-requisites using [homebrew](https://brew.sh/). If you have some of the applications already installed, consider removing them in favor of the chocolatey installation or modify the command to not install it if you prefer.

```
brew install --cask docker visual-studio-code
brew install devpod

code --install-extension ms-vscode-remote.remote-containers
```

**Note:** This has not been tested.

#### APT Installation

If using an Ubuntu-based operating system, it's recommended to install the pre-requisites using [`apt-get`](https://ubuntu.com/server/docs/package-management) and [`snap`](https://snapcraft.io/).

```
sudo apt update && sudo apt install -y docker.io docker-compose devpod
sudo snap install --classic code

code --install-extension ms-vscode-remote.remote-containers
```

**Note:** This has not been tested.

### Installation

#### DevPod (recommended)

1. Open DevPod application.
2. Click `+ Create` workspace.
    - Select Docker as provider, VSCode as default IDE.
3. Enter workspace source as `https://github.com/amal-app/amal`
4. Set Workspace Name (optional)
5. Click `Create Workspace`.

This will initialize a Dev Container instance and open an instance of VSCode within the container.

#### Manual

1. Clone this repository.
2. Open the code in VSCode.
3. Open the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) (`View` -> `Command Palette...`).
4. Type `Dev Containers: Rebuild and Reopen in Container`. Select the option.

This will initialize a Dev Container instance and open an instance of VSCode within the container.

### Running

Wait for post-container-creation tasks to complete. Then, use `npm start` to run. This will run an expo instance, using a tunnel to go around the myriad of issues that can happen due to proxies.

Once the application is finished running, a QR Code will be generated in the output. Scan the QR code with Expo Go (Android) or the Camera app (iOS) to launch the application.

**Note**: The initial bundle may be slow after scanning the QR code, perhaps due to internet speeds or the tunnel.

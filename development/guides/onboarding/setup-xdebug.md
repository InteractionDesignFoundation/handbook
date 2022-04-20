# Setup XDebug on PHPStorm

### Enable Xdebug in env
Simply set `XDEBUG_MODE` to `debug` in your `.env` file and restart the app container.

### Install the Browser Extension
For Firefox and Chrome, you have to install Xdebug helper extension

If Xdebug works now, then simply skip the rest of this document. 🥷

### Configure the Browser extension
1. Right-click on the extension Icon and choose options
2. Set the IDE key to `other` and type in `phpstorm` as follows:
![image](https://user-images.githubusercontent.com/77272856/164238929-69ddc652-6214-4424-bc0f-66c954e8adae.png)

### Configure PHPStorm
1. Open Xdebug settings and enter IDE key & port
![image](https://user-images.githubusercontent.com/77272856/164239456-36da203e-4975-4ccc-98a7-fb2cee9c694c.png)
2. Go to servers and create a server with the mappings
![image](https://user-images.githubusercontent.com/77272856/164239584-842213e7-ea49-4cc4-bed7-9575d9bc9159.png)

Your setup should be working now. 🦄

External docs:
1. https://www.jetbrains.com/help/phpstorm/configuring-xdebug.html

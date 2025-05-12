# Den Den Mushi Shell
Browser-based Terminal emulator for easy low latency shell access to cloud compute instances

![demo.png](img/example.png)

## Features
- Type and Run commands
- Backspace
- Ctrl+C, Ctrl+Z, Ctrl+D
- Linux, MacOS, Windows support
- that's it lol

## Prerequisites

```bash
sudo yum install -y nodejs

# required for node-pty
sudo yum groupinstall "Development Tools" -y
sudo yum install gcc-c++ make -y
```

## Running

1. Clone the repository
```bash
git clone https://github.com/Arabasta/den-den-mushi.git
```

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
npm start
```


## Todo
- [ ] Fix ctrl+c
- [ ] Add vim support
- [ ] Add more themes

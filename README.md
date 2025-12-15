# Den Den Mushi
A minimal PoC for browser-based terminal access using WebSockets and PTY.

## Background
This project was originally built to explore low-latency, credential-less remote shell access. 

The core idea later evolved into a split-trust SSH access platform deployed at DBS Bank (JumpHost) supporting 30k+ Linux servers.

![example.gif](assets/example.gif)

## Features
- Run all commands through a web browser
- Dark and light themes
- Linux, MacOS, Windows support

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

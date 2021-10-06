### URL shortener

A URL shortener script based on node js

### Installation

Use the package manager npm to install URL Shortener. To use, execute these commands:

```bash
npm install
node index.js
```
Don't forget to add MongoDB connected string to config/db.js file line number 2

### Usage

```javascript
It will listen to port 5005

# API to generate Shorten URL
POST /api/shorten
# It accepts a url parameter in JSON string

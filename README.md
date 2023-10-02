# Serverless Framework - Lambda + Mongo

## Install Dependences

```
  npm install
```

## Usage

### Deployment

```
$  npm run deploy
```

After deploying, you should see output similar to:

```bash


Deploying culqi-serveless to stage dev

✔ Service deployed to stack culqi-serveless-dev

endpoints:
  POST - https://xxxxxx.execute-api.us-east-1.amazonaws.com/dev/tokenCard/createToken
  GET - https://xxxxxxx.execute-api.us-east-1.amazonaws.com/dev/tokenCard/findTokenCard
functions:
  CreateToken: culqi-serveless-dev-CreateToken (1.5 MB)
  findTokenCard: culqi-serveless-dev-findTokenCard (3.1 MB)
```

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
https://xxxxxxx.execute-api.us-east-1.amazonaws.com/dev/tokenCard/findTokenCard
```

### Local development

You can invoke your function locally by using the following command:

```bash
npm run local
```

```bash


Starting Offline at stage dev (us-east-1)

endpoints:
  POST - http://localhost:3000/dev/tokenCard/createToken
  GET  - http://localhost:3000/dev/tokenCard/findTokenCard

```

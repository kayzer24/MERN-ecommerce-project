# MERN-ecommerce-project

## Usage:
Create a .env file in then client folder and add the following

```
REACT_APP_REGISTER_REDIRECT_URL = 'http://localhost:3000/register/complete'
REACT_APP_FORGOT_PASSWORD_REDIRECT = 'http://localhost:3000/login'
REACT_APP_API='http://localhost:8000/api'

REACT_APP_STRIPE_KEY=add_your_stripe_public_key

LOCAL='en-US'
```

Create a .env file in then server folder and add the following

```
DATABASE=mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority

PORT=8000

JWT_SECRET=jwt_secret_key

CLIENT_URI=http://localhost:3000

CLOUDINARY_CLOUD_NAME=cloudinary_cloud_name
CLOUDINARY_API_KEY=cloudinary_api_key
CLOUDINARY_API_SECRET=cloudinary_api_secret

STRIPE_SECRET=stripe_secret_key
```


## Install Dependencies (frontend & backend)
```
 cd client
 npm install
 
 cd server
 npm install
```

## Run frontend (/client)

```
npm start

# Run backend (/server)
npm start
```

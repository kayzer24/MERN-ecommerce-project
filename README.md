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

## Edit Firebase config on server/config/fbServiceAccountKey.json
```
{
  "type": "service_account",
  "project_id": "project_id",
  "private_key_id": "private_key_id",
  "private_key": "private_key",
  "client_email": "client_email",
  "client_id": "client_id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-z649p%40ecommerce-3940c.iam.gserviceaccount.com"
}
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

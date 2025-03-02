# AWS Event-Driven Microservices Project

## 🚀 Overview
This project is an **event-driven microservices architecture** hosted on AWS, designed to handle customer orders through a **serverless** approach. It integrates multiple AWS services to process and manage orders efficiently.

## 🏗️ Tech Stack
- **Frontend**: React.js (Hosted on AWS S3)
- **Backend**: AWS Lambda (Python)
- **Event Processing**: AWS SQS & SNS
- **API Gateway**: Exposes API endpoints
- **Database**: DynamoDB (NoSQL) for order storage
- **Domain Management**: Route 53

## 📌 Features
✅ Customers can place orders via a React-based UI.  
✅ Orders are processed asynchronously via AWS Lambda functions.  
✅ SQS ensures reliable event handling between services.  
✅ DynamoDB stores and retrieves order details.  
✅ Route 53 manages domain-based access.

## 📁 Project Structure
```
AWS-Event-Driven-Microservice-Proj/
│── front-end/             # React frontend (deployed on S3)
│── lambda/               # AWS Lambda functions
│── aws-services/         # Cloudformation template for VPC and DyanamkDB
│── package.json          # Dependencies & scripts
└── README.md             # Documentation
```

## 🛠️ Setup & Deployment
### **1️⃣ Backend Deployment**
Ensure you have AWS CLI configured, then deploy the Lambda functions:
```sh
yarn install  # or npm install
aws lambda update-function-code --function-name processOrder --zip-file fileb://processOrder.zip
```

### **2️⃣ Frontend Deployment**
Build and upload the React app to S3:
```sh
cd frontend
npm run build
aws s3 sync build/ s3://your-s3-bucket-name --delete
```

### **3️⃣ Configure Route 53 (Custom Domain)**
- Create an **S3 Static Website Hosting** bucket.
- Point a **Route 53 A-record** to the CloudFront distribution.
- Use `nslookup your-domain.com` to check if DNS is resolving.

## ⚠️ Troubleshooting
- **CORS Issues**: Ensure your API Gateway has CORS enabled.
- **404 on S3**: Make sure `index.html` exists in the S3 bucket.
- **Route 53 Not Resolving**: Check if the domain is correctly set up in Route 53 and linked to the right CloudFront.

## 📜 License
This project is licensed under MIT License.

---
🚀 **Happy Coding!** 💻


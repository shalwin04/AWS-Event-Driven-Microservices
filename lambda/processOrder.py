import json
import boto3

# Initialize AWS services
dynamodb = boto3.resource('dynamodb')
sns = boto3.client('sns')

# Replace with actual values
ORDER_TABLE = "OrderManagementTable"  
SNS_TOPIC_ARN = "arn:aws:sns:us-east-1:522814719494:OrderManagement-SNS"  

def lambda_handler(event, context):
    for record in event['Records']:
        order = json.loads(record['body'])

        # Save order to DynamoDB
        table = dynamodb.Table(ORDER_TABLE)
        table.put_item(Item=order)

        # Notify via SNS
        sns.publish(
            TopicArn=SNS_TOPIC_ARN,
            Message=json.dumps({'default': json.dumps(order)}),
            MessageStructure='json'
        )

    return {
        'statusCode': 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
        'body': json.dumps({'message': 'Order Processed', 'order': order})
    }

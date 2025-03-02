import json
import boto3

# Initialize SQS client
sqs = boto3.client('sqs')

# Replace with your actual SQS queue URL
SQS_QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/522814719494/OrderManagement-SQS"

def lambda_handler(event, context):
    order = json.loads(event['body'])
    
    if "item_id" in order and "quantity" in order:
        # Send validated order to SQS
        response = sqs.send_message(
            QueueUrl=SQS_QUEUE_URL,
            MessageBody=json.dumps(order)
        )

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Order Validated and Sent to SQS',
                'order': order,
                'sqs_message_id': response['MessageId']
            })
        }
    else:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Invalid Order'})
        }

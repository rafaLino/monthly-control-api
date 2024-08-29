import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocument.from(new DynamoDB());
const TABLE_NAME = 'registers';


export async function get(date) {
    const data = await client.send(
        new GetCommand({
            TableName: TABLE_NAME,
            Key: {
                date: date
            },
        }));

    return data.Item;
}

export async function save(item) {
    return await client.send(
        new PutCommand({
            TableName: TABLE_NAME,
            Item: item
        }));
}
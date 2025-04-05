import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, GetCommand, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';


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

export async function scan() {
    const params = {
        TableName: TABLE_NAME
    }

    const results = [];
    let lastKey;

    do {
        params.ExclusiveStartKey = lastKey;
        const command = new ScanCommand(params);
        const { LastEvaluatedKey, Items } = await client.send(command);
        lastKey = LastEvaluatedKey;
        results.push(...Items);
    } while (lastKey);

    return results;
}
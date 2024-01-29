import { App, Stack, StackProps } from "aws-cdk-lib";
import { Key } from "aws-cdk-lib/aws-kms";
import { Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { createSampleEncryptedBucket } from "../construct/bucket/SampleBucket";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export interface SampleStackProps extends StackProps {
    nameSpace: string;
}

export class SampleStack extends Stack {
    constructor(scope: App, id: string, props: SampleStackProps) {
        super(scope, id, props);

        const { bucket, bucketEncryptionKey } = createSampleEncryptedBucket(this, props);
    }
}
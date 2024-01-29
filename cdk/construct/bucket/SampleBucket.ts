import { Key } from "aws-cdk-lib/aws-kms";
import { Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3";
import { SampleStackProps } from "../../stack/SampleStack";
import { Construct } from "constructs";

export const createSampleEncryptedBucket = (scope: Construct, props: SampleStackProps) => {
    const bucketEncryptionKey = new Key(scope, `${props.nameSpace}-sample-encryption-key`, {
        description: `${props.nameSpace} sample encryption key`
    });

    const bucket = new Bucket(scope, `${props.nameSpace}-sample-bucket`, {
        bucketName: `${props.nameSpace}-sample-bucket`,
        versioned: true,
        encryptionKey: bucketEncryptionKey,
        encryption: BucketEncryption.KMS
    });

    return { bucket, bucketEncryptionKey };
}
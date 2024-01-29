import { describe, it, expect } from '@jest/globals';
import { Template } from 'aws-cdk-lib/assertions';
import { SampleStack } from '../../stack/SampleStack';
import { SampleApp } from '../../bin/SampleApp';
import { App, Stack } from 'aws-cdk-lib';
import { SynthUtils } from '@aws-cdk/assert';
import * as fs from 'fs';

const sampleStackProps = {
    env: {
        account: '078900383518',
        region: 'ap-south-1'
    },
    stackName: `demo-sample-stack`,
    nameSpace: 'demo'
}

describe('Sample Stack', () => {

    let app: App;
    let sampleStack: Stack;
    let template: Template;

    beforeEach(() => {
        app = new SampleApp();
        sampleStack = new SampleStack(app, 'demo-sample-stack', sampleStackProps);
        template = Template.fromStack(sampleStack);
        fs.writeFile('template.json', JSON.stringify(template.toJSON()), () => { });
    });

    it('should match all resources', () => {
        expect(SynthUtils.toCloudFormation(sampleStack)).toMatchSnapshot();
    });

    it('should create S3 Bucket', () => {
        template.resourceCountIs('AWS::S3::Bucket', 1);
        template.hasResourceProperties('AWS::S3::Bucket', {
            BucketName: 'demo-sample-bucket'
        });
    });

    it('should create kms encryption key', () => {
        template.resourceCountIs('AWS::KMS::Key', 1);
        template.hasResourceProperties('AWS::KMS::Key', {
            Description: 'demo sample encryption key'
        });
    });
});
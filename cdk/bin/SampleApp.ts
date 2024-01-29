import { App, AppProps } from 'aws-cdk-lib';
import { SampleStack } from '../stack/SampleStack';

export class SampleApp extends App {

    constructor(props?: AppProps) {
        super(props);
    }
}
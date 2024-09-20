import { Module } from '@nestjs/common';
import { S3Service } from './services/s3.service';
import { AmplifyService } from './services/amplify.service';
import { Ec2Service } from './services/ec2.service';

@Module({
    providers: [S3Service, AmplifyService, Ec2Service],
    exports: [S3Service, AmplifyService, Ec2Service]
})
export class AwsModule {}

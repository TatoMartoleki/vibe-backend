import { Body, Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk"
import { MimeType } from "aws-sdk/clients/kendra";

@Injectable()
export class S3Service{
    private s3Client: AWS.S3;
    private bucketName: string
    constructor(){
        this.s3Client = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'eu-north-1',
            signatureVersion: 'v4'
        })

        this.bucketName = process.env.AWS_BUCKET_NAME
    }
    async upload(file: Express.Multer.File, key: string){

        const buffer = file.buffer

        const fileKey = key

        const params = {
            Bucket: this.bucketName,
            Key: fileKey,
            Body: buffer,
            ContentType: file.mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: 'eu-north-1'
            }
        }

        try{
            return await this.s3Client.upload(params).promise();
        } catch(e){
            throw e
        }
    }

    async getPresignedUrl(key: string, bucket?: string): Promise<string | null> {
        const params = {
            Bucket: bucket || this.bucketName,
            Key: key,
            Expires: 3600
        };
    
        try {
            const url = await this.s3Client.getSignedUrlPromise('getObject', params);
            return url;
        } catch (error) {
            console.error(`Failed to get presigned URL for key ${key}:`, error);
            return null; // or handle the error as appropriate for your use case
        }
    }

}
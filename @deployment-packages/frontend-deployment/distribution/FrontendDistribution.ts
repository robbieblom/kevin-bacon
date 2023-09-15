import { RemovalPolicy } from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  Distribution,
  Function,
  FunctionCode,
  FunctionEventType,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Effect, PolicyStatement, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { FrontendAppContext, FrontendManualSetup } from "../types";

export interface FrontendDistributionProps {
  appContext: FrontendAppContext;
  manualSetup: FrontendManualSetup;
}
export class FrontendDistribution extends Construct {
  hostingBucket: Bucket;
  cdn: Distribution;

  constructor(scope: Construct, id: string, props: FrontendDistributionProps) {
    super(scope, id);

    // create bucket
    const hostingBucket = new Bucket(
      this,
      `${props.appContext.projectName}-bucket`,
      {
        bucketName: `${props.appContext.siteDNS}`,
        removalPolicy: RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
      }
    );

    // create distribution
    const certificate = Certificate.fromCertificateArn(
      this,
      `${props.appContext.projectName}-certificate`,
      props.manualSetup.certificateArn
    );
    const origin = new S3Origin(hostingBucket);
    const cfFunction = new Function(
      this,
      `${props.appContext.projectName}-cf-function`,
      {
        code: FunctionCode.fromFile({
          filePath: `@deployment-packages/frontend-deployment/distribution/modifyUrl.ts`,
        }),
      }
    );
    const cdn = new Distribution(
      this,
      `${props.appContext.projectName}-distribution`,
      {
        defaultBehavior: {
          origin,
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          functionAssociations: [
            {
              function: cfFunction,
              eventType: FunctionEventType.VIEWER_REQUEST,
            },
          ],
        },
        domainNames: [props.appContext.siteDNS],
        defaultRootObject: "index.html",
        certificate,
      }
    );

    // create DNS Record
    const zone = HostedZone.fromHostedZoneId(
      this,
      `${props.appContext.projectName}-hosted-zone`,
      props.manualSetup.hostedZoneId
    );
    const record = new ARecord(this, "ARecordAlias", {
      zone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(cdn)),
      recordName: `${props.appContext.siteDNS}.`,
    });
    record.applyRemovalPolicy(RemovalPolicy.DESTROY);

    // add bucket policy
    hostingBucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        principals: [new ServicePrincipal("cloudfront.amazonaws.com")],
        actions: ["s3:GetObject"],
        resources: [`${hostingBucket.bucketArn}/*`],
        conditions: {
          StringEquals: {
            "AWS:SourceArn": `arn:aws:cloudfront::${props.appContext.accountId}:distribution/${cdn.distributionId}`,
          },
        },
      })
    );

    // assign instance values
    this.hostingBucket = hostingBucket;
    this.cdn = cdn;
  }
}

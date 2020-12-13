import { Construct } from 'constructs';
import { App, TerraformStack, Token } from 'cdktf';

import { Vpc } from "./.gen/providers/aws/vpc"
import { AwsProvider } from './.gen/providers/aws'
import { Subnet } from './.gen/providers/aws/subnet';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new AwsProvider(this, 'aws', {
      region: 'ap-northeast-1'
    });

    // define resources here
    const vpc = new Vpc(this, 'my-vpc', {
      cidrBlock: '10.0.0.0/16',
      tags: {
        name: "my-vpc"
      }
    })
    new Subnet(this, 'my-subnet', {
      vpcId: Token.asString(vpc.id),
      cidrBlock: '10.0.0.0/24',
      tags: {
        name: "my-subnet"
      }
    });

  }
}

const app = new App();
new MyStack(app, 'vpc-example');
app.synth();

import { Construct, Stack, StackProps } from "@aws-cdk/core";
interface BillingStackProps extends StackProps {
    billingAmount: number;
    email: string;
}
export declare class BillingStack extends Stack {
    constructor(scope: Construct, id: string, props: BillingStackProps);
}
export {};

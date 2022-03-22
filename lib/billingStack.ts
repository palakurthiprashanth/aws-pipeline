import { Construct, Stack, StackProps } from "@aws-cdk/core";
import { Budget } from "./constructs/budget";


interface BillingStackProps extends StackProps {
    billingAmount: number,
    email: string
};

export class BillingStack extends Stack {
    constructor(scope:  Construct, id: string, props: BillingStackProps) {
        super(scope, id, props);

        new Budget(this, "Budget", {
            budgetAmount: props.billingAmount,
            email: props.email
        })
    }
}
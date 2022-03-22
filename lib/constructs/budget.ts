import { Construct } from "@aws-cdk/core";
import { CfnBudget } from '@aws-cdk/aws-budgets';

interface BudgetProps {
    budgetAmount: number,
    email: string
}

export class Budget extends Construct {
    constructor(scope: Construct, id: string, props: BudgetProps) {
        super(scope, id);

        new CfnBudget(this, "Budget", {
            budget: {
                budgetType: 'COST',
                budgetName: 'Monthly Budget',
                timeUnit: 'MONTHLY',
                budgetLimit: {
                    amount: 1,
                    unit: 'USD',
                  }
            },
            notificationsWithSubscribers:[{
                notification: {
                    threshold: props.budgetAmount,
                    notificationType: 'ACTUAL',
                    comparisonOperator: "GREATER_THAN",
                    thresholdType: "ABSOLUTE_VALUE"
                },
                subscribers: [{
                    subscriptionType: 'EMAIL',
                    address: props.email
                }]
            }]
        })
    }
}
import { Construct } from "@aws-cdk/core";
interface BudgetProps {
    budgetAmount: number;
    email: string;
}
export declare class Budget extends Construct {
    constructor(scope: Construct, id: string, props: BudgetProps);
}
export {};

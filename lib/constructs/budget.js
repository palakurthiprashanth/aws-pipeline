"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Budget = void 0;
const core_1 = require("@aws-cdk/core");
const aws_budgets_1 = require("@aws-cdk/aws-budgets");
class Budget extends core_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        new aws_budgets_1.CfnBudget(this, "Budget", {
            budget: {
                budgetType: 'COST',
                budgetName: 'Monthly Budget',
                timeUnit: 'MONTHLY',
                budgetLimit: {
                    amount: 1,
                    unit: 'USD',
                }
            },
            notificationsWithSubscribers: [{
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
        });
    }
}
exports.Budget = Budget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUEwQztBQUMxQyxzREFBaUQ7QUFPakQsTUFBYSxNQUFPLFNBQVEsZ0JBQVM7SUFDakMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUN4RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQzFCLE1BQU0sRUFBRTtnQkFDSixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsVUFBVSxFQUFFLGdCQUFnQjtnQkFDNUIsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLFdBQVcsRUFBRTtvQkFDVCxNQUFNLEVBQUUsQ0FBQztvQkFDVCxJQUFJLEVBQUUsS0FBSztpQkFDWjthQUNOO1lBQ0QsNEJBQTRCLEVBQUMsQ0FBQztvQkFDMUIsWUFBWSxFQUFFO3dCQUNWLFNBQVMsRUFBRSxLQUFLLENBQUMsWUFBWTt3QkFDN0IsZ0JBQWdCLEVBQUUsUUFBUTt3QkFDMUIsa0JBQWtCLEVBQUUsY0FBYzt3QkFDbEMsYUFBYSxFQUFFLGdCQUFnQjtxQkFDbEM7b0JBQ0QsV0FBVyxFQUFFLENBQUM7NEJBQ1YsZ0JBQWdCLEVBQUUsT0FBTzs0QkFDekIsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLO3lCQUN2QixDQUFDO2lCQUNMLENBQUM7U0FDTCxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0o7QUE1QkQsd0JBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCB7IENmbkJ1ZGdldCB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1idWRnZXRzJztcblxuaW50ZXJmYWNlIEJ1ZGdldFByb3BzIHtcbiAgICBidWRnZXRBbW91bnQ6IG51bWJlcixcbiAgICBlbWFpbDogc3RyaW5nXG59XG5cbmV4cG9ydCBjbGFzcyBCdWRnZXQgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBCdWRnZXRQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgICAgIG5ldyBDZm5CdWRnZXQodGhpcywgXCJCdWRnZXRcIiwge1xuICAgICAgICAgICAgYnVkZ2V0OiB7XG4gICAgICAgICAgICAgICAgYnVkZ2V0VHlwZTogJ0NPU1QnLFxuICAgICAgICAgICAgICAgIGJ1ZGdldE5hbWU6ICdNb250aGx5IEJ1ZGdldCcsXG4gICAgICAgICAgICAgICAgdGltZVVuaXQ6ICdNT05USExZJyxcbiAgICAgICAgICAgICAgICBidWRnZXRMaW1pdDoge1xuICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IDEsXG4gICAgICAgICAgICAgICAgICAgIHVuaXQ6ICdVU0QnLFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbnNXaXRoU3Vic2NyaWJlcnM6W3tcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyZXNob2xkOiBwcm9wcy5idWRnZXRBbW91bnQsXG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGU6ICdBQ1RVQUwnLFxuICAgICAgICAgICAgICAgICAgICBjb21wYXJpc29uT3BlcmF0b3I6IFwiR1JFQVRFUl9USEFOXCIsXG4gICAgICAgICAgICAgICAgICAgIHRocmVzaG9sZFR5cGU6IFwiQUJTT0xVVEVfVkFMVUVcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvblR5cGU6ICdFTUFJTCcsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IHByb3BzLmVtYWlsXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0pXG4gICAgfVxufSJdfQ==
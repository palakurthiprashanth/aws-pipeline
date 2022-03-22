"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingStack = void 0;
const core_1 = require("@aws-cdk/core");
const budget_1 = require("./constructs/budget");
;
class BillingStack extends core_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        new budget_1.Budget(this, "Budget", {
            budgetAmount: props.billingAmount,
            email: props.email
        });
    }
}
exports.BillingStack = BillingStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlsbGluZ1N0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmlsbGluZ1N0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUE2RDtBQUM3RCxnREFBNkM7QUFNNUMsQ0FBQztBQUVGLE1BQWEsWUFBYSxTQUFRLFlBQUs7SUFDbkMsWUFBWSxLQUFpQixFQUFFLEVBQVUsRUFBRSxLQUF3QjtRQUMvRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixJQUFJLGVBQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ3ZCLFlBQVksRUFBRSxLQUFLLENBQUMsYUFBYTtZQUNqQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7U0FDckIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKO0FBVEQsb0NBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdHJ1Y3QsIFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCB7IEJ1ZGdldCB9IGZyb20gXCIuL2NvbnN0cnVjdHMvYnVkZ2V0XCI7XG5cblxuaW50ZXJmYWNlIEJpbGxpbmdTdGFja1Byb3BzIGV4dGVuZHMgU3RhY2tQcm9wcyB7XG4gICAgYmlsbGluZ0Ftb3VudDogbnVtYmVyLFxuICAgIGVtYWlsOiBzdHJpbmdcbn07XG5cbmV4cG9ydCBjbGFzcyBCaWxsaW5nU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6ICBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBCaWxsaW5nU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgICAgICBuZXcgQnVkZ2V0KHRoaXMsIFwiQnVkZ2V0XCIsIHtcbiAgICAgICAgICAgIGJ1ZGdldEFtb3VudDogcHJvcHMuYmlsbGluZ0Ftb3VudCxcbiAgICAgICAgICAgIGVtYWlsOiBwcm9wcy5lbWFpbFxuICAgICAgICB9KVxuICAgIH1cbn0iXX0=
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../app");
const getPostsAccount = (req, res) => {
    let getPostsAccountSql = `select * from post_accounts`;
    app_1.pool.query(getPostsAccountSql, (err, result) => {
        console.log('getPostsAccount', result);
        return res.json(result);
    });
};
exports.default = getPostsAccount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UG9zdHNBY2NvdW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXJzL3YxL2dldFBvc3RzQWNjb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUErQjtBQUUvQixNQUFNLGVBQWUsR0FBQyxDQUFDLEdBQVcsRUFBQyxHQUFZLEVBQUMsRUFBRTtJQUM5QyxJQUFJLGtCQUFrQixHQUFDLDZCQUE2QixDQUFDO0lBQ3JELFVBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUMsQ0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLEVBQUU7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUM7QUFFRixrQkFBZSxlQUFlLENBQUMifQ==
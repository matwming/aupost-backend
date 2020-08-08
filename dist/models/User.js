"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose_1.default.model('user', UserSchema);
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvVXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUEyQztBQVMzQyxNQUFNLFVBQVUsR0FBQyxJQUFJLGtCQUFRLENBQUMsTUFBTSxDQUFDO0lBQ2pDLElBQUksRUFBQztRQUNELElBQUksRUFBQyxNQUFNO1FBQ1gsUUFBUSxFQUFDLElBQUk7S0FDaEI7SUFDRCxLQUFLLEVBQUM7UUFDRixJQUFJLEVBQUMsTUFBTTtRQUNYLFFBQVEsRUFBQyxJQUFJO1FBQ2IsTUFBTSxFQUFDLElBQUk7S0FDZDtJQUNELFFBQVEsRUFBQztRQUNMLElBQUksRUFBQyxNQUFNO1FBQ1gsUUFBUSxFQUFDLElBQUk7S0FDaEI7SUFDRCxNQUFNLEVBQUM7UUFDSCxJQUFJLEVBQUMsTUFBTTtLQUNkO0lBQ0QsSUFBSSxFQUFDO1FBQ0QsSUFBSSxFQUFDLElBQUk7UUFDVCxPQUFPLEVBQUMsSUFBSSxDQUFDLEdBQUc7S0FDbkI7Q0FDSixDQUFDLENBQUM7QUFDSCxNQUFNLElBQUksR0FBQyxrQkFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsVUFBVSxDQUFDLENBQUM7QUFDN0Msa0JBQWUsSUFBSSxDQUFDIn0=
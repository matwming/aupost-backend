"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProfileSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [{
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }],
    education: [{
            degree: {
                type: String,
                required: true
            },
            school: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Profile = mongoose_1.default.model('profile', ProfileSchema);
exports.default = Profile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvUHJvZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUVoQyxNQUFNLGFBQWEsR0FBQyxJQUFJLGtCQUFRLENBQUMsTUFBTSxDQUFDO0lBQ3BDLElBQUksRUFBQztRQUNELElBQUksRUFBQyxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUNuQyxHQUFHLEVBQUMsTUFBTTtLQUNiO0lBQ0QsT0FBTyxFQUFDO1FBQ0osSUFBSSxFQUFDLE1BQU07S0FDZDtJQUNELE9BQU8sRUFBQztRQUNKLElBQUksRUFBQyxNQUFNO0tBQ2Q7SUFDRCxRQUFRLEVBQUM7UUFDTCxJQUFJLEVBQUMsTUFBTTtLQUNkO0lBQ0QsTUFBTSxFQUFDO1FBQ0gsSUFBSSxFQUFDLE1BQU07S0FDZDtJQUNELE1BQU0sRUFBQztRQUNILElBQUksRUFBQyxDQUFDLE1BQU0sQ0FBQztRQUNiLFFBQVEsRUFBQyxJQUFJO0tBQ2hCO0lBQ0QsR0FBRyxFQUFDO1FBQ0EsSUFBSSxFQUFDLE1BQU07S0FDZDtJQUNELGNBQWMsRUFBQztRQUNYLElBQUksRUFBQyxNQUFNO0tBQ2Q7SUFDRCxVQUFVLEVBQUMsQ0FBQztZQUNSLEtBQUssRUFBQztnQkFDRixJQUFJLEVBQUMsTUFBTTtnQkFDWCxRQUFRLEVBQUMsSUFBSTthQUNoQjtZQUNELE9BQU8sRUFBQztnQkFDSixJQUFJLEVBQUMsTUFBTTtnQkFDWCxRQUFRLEVBQUMsSUFBSTthQUNoQjtZQUNELFFBQVEsRUFBQztnQkFDTCxJQUFJLEVBQUMsTUFBTTthQUNkO1lBQ0QsSUFBSSxFQUFDO2dCQUNELElBQUksRUFBQyxJQUFJO2dCQUNULFFBQVEsRUFBQyxJQUFJO2FBQ2hCO1lBQ0QsRUFBRSxFQUFDO2dCQUNDLElBQUksRUFBQyxJQUFJO2FBQ1o7WUFDRCxPQUFPLEVBQUM7Z0JBQ0osSUFBSSxFQUFDLE9BQU87Z0JBQ1osT0FBTyxFQUFDLEtBQUs7YUFDaEI7WUFDRCxXQUFXLEVBQUM7Z0JBQ1IsSUFBSSxFQUFDLE1BQU07YUFDZDtTQUNKLENBQUM7SUFDRixTQUFTLEVBQUMsQ0FBQztZQUNQLE1BQU0sRUFBQztnQkFDSCxJQUFJLEVBQUMsTUFBTTtnQkFDWCxRQUFRLEVBQUMsSUFBSTthQUNoQjtZQUNELE1BQU0sRUFBQztnQkFDSCxJQUFJLEVBQUMsTUFBTTtnQkFDWCxRQUFRLEVBQUMsSUFBSTthQUNoQjtZQUNELFlBQVksRUFBQztnQkFDVCxJQUFJLEVBQUMsTUFBTTthQUNkO1lBQ0QsSUFBSSxFQUFDO2dCQUNELElBQUksRUFBQyxJQUFJO2dCQUNULFFBQVEsRUFBQyxJQUFJO2FBQ2hCO1lBQ0QsRUFBRSxFQUFDO2dCQUNDLElBQUksRUFBQyxJQUFJO2FBQ1o7WUFDRCxPQUFPLEVBQUM7Z0JBQ0osSUFBSSxFQUFDLE9BQU87Z0JBQ1osT0FBTyxFQUFDLEtBQUs7YUFDaEI7WUFDRCxXQUFXLEVBQUM7Z0JBQ1IsSUFBSSxFQUFDLE1BQU07YUFDZDtTQUNKLENBQUM7SUFDRixNQUFNLEVBQUM7UUFDSCxPQUFPLEVBQUM7WUFDSixJQUFJLEVBQUMsTUFBTTtTQUNkO1FBQ0QsT0FBTyxFQUFDO1lBQ0osSUFBSSxFQUFDLE1BQU07U0FDZDtRQUNELFFBQVEsRUFBQztZQUNMLElBQUksRUFBQyxNQUFNO1NBQ2Q7UUFDRCxRQUFRLEVBQUM7WUFDTCxJQUFJLEVBQUMsTUFBTTtTQUNkO1FBQ0QsU0FBUyxFQUFDO1lBQ04sSUFBSSxFQUFDLE1BQU07U0FDZDtLQUNKO0lBQ0QsSUFBSSxFQUFDO1FBQ0QsSUFBSSxFQUFDLElBQUk7UUFDVCxPQUFPLEVBQUMsSUFBSSxDQUFDLEdBQUc7S0FDbkI7Q0FDSixDQUFDLENBQUM7QUFDSCxNQUFNLE9BQU8sR0FBQyxrQkFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUMsYUFBYSxDQUFDLENBQUM7QUFDdEQsa0JBQWUsT0FBTyxDQUFDIn0=
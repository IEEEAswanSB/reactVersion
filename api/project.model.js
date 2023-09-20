const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    phone: String,
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    project_type: String,
    project_title: String,
    project_category: String,
    project_track: String,
    project_file: String,
    project_abstract: String,

    hasPrototype: Boolean,
    prototype_dimension: String,

    university: String,
    faculty: String,

    governorate: String,
    school: String,
    educational_level: String,
    total_payment: Number,
    project_supervisor: {
      name: {
        type: String,
      },
      mobile: {
        type: String,
      },
      email: {
        type: String,
        trim: true,
      },
      ID_number: {
        type: String,
      },
      is_attending: {
        type: Boolean,
        default: false,
      },
    },
    team_members: [
      {
        name: {
          type: String,
          required: true,
        },
        mobile: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          trim: true,
          required: true,
        },
        ID_number: {
          type: String,
          required: true,
        },
        hasMeals: {
          type: Boolean,
          default: false,
        },
        hasAccommodation: {
          type: Boolean,
          default: false,
        },
      },
    ],
    team_members_count: Number,
  },
  {
    timestamps: true,
  }
);
projectSchema.methods.toJSON = function () {
  const projectSchema = this.toObject();
  // delete projectSchema.owner;
  // delete projectSchema._id;
  return projectSchema;
};
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;

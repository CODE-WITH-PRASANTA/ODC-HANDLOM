const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    bannerTitle: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
    },

    buttonText: {
      type: String,
    },

    buttonLink: {
      type: String,
    },

    bannerType: {
      type: String,
      default: "Hero Banner",
    },

    displayPosition: {
      type: String,
      default: "Hero Slider",
    },

    priority: {
      type: Number,
      default: 1,
    },

    status: {
      type: Boolean,
      default: true,
    },

    startDate: {
      type: String,
    },

    endDate: {
      type: String,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    bgColor: {
      type: String,
      default: "#FFA640",
    },

    titleColor: {
      type: String,
      default: "#FFFFFF",
    },

    subtitleColor: {
      type: String,
      default: "#FFFFFF",
    },

    buttonColor: {
      type: String,
      default: "#000000",
    },

    buttonTextColor: {
      type: String,
      default: "#FFFFFF",
    },

    publishStartTime: {
      type: String,
    },

    timezone: {
      type: String,
    },

    seoAltText: {
      type: String,
    },

    seoTitle: {
      type: String,
    },

    seoDescription: {
      type: String,
    },

    language: {
      type: String,
      default: "English",
    },

    bannerImage: {
      type: String,
    },

    displaySettings: {
      heroSlider: {
        type: Boolean,
        default: true,
      },

      desktop: {
        type: Boolean,
        default: true,
      },

      tablet: {
        type: Boolean,
        default: true,
      },

      mobile: {
        type: Boolean,
        default: true,
      },

      smallBannerSection: {
        type: Boolean,
        default: false,
      },

      bottomBanner: {
        type: Boolean,
        default: false,
      },

      offerSection: {
        type: Boolean,
        default: false,
      },
    },

    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Banner",
  bannerSchema
);
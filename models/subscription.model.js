import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "subs name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "subs price required"],
      min: [0, "price must be major than 0"],
      max: [10000, "price must be major than 100000"],
    },
    currency: {
      type: String,
      enum: ["USD", "COP"],
      default: "USD",
    },
    frecuency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
    },
    category: {
      type: String,
      enum: ["sports", "news", "life"],
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      require: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      require: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "renewal date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency],
    );
  }
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});

const Subscription = mongoose.model("subscription", subscriptionSchema);

export default Subscription;

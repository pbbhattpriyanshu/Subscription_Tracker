import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLenght: 3,
        maxLength: 50,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Price must be grater then Zero'],
    },
    currency: {
        type: String,
        enum: ['USD', 'INR', 'GBP'],
        default: 'INR'
    },
    frequency: {
        type: String,
        required: true,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        required: true,
        enum: ['sports', 'entertainment', 'lifestyle', 'technologu', 'finance', 'politics', 'others'],
    },
    paymentMethod: {
        type: String,
        required: true,
        trim : true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in past',
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) { return value > this.startDate},
            message: 'Renewal date must be after the Start date',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, { timestamps: true })


// Auto-calculate renewal date
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const start = new Date(this.startDate);

    switch (this.frequency) {
      case "daily":
        this.renewalDate = new Date(start.setDate(start.getDate() + 1));
        break;

      case "weekly":
        this.renewalDate = new Date(start.setDate(start.getDate() + 7));
        break;

      case "monthly":
        this.renewalDate = new Date(start.setMonth(start.getMonth() + 1));
        break;

      case "yearly":
        this.renewalDate = new Date(start.setFullYear(start.getFullYear() + 1));
        break;
    }

    // Set renewal to end of that day
    this.renewalDate.setHours(23, 59, 59, 999);
  }

  // Auto-update the status only if renewalDate is strictly before now
  if (this.renewalDate && this.renewalDate < new Date()) {
    this.status = "expired";
  } else if (!this.status) {
    this.status = "active"; // default
  }

  next();
});


const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
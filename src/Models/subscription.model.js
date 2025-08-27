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
        enum: ['actice', 'inactive', 'expired'],
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
subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    // Auto-update the status if renewal date is passed
    if (this.renewalDate && this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
})
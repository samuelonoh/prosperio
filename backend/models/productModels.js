import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Enter name of product'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Enter category of product'],
        trim: true,
    },
    price: {
        type: String,
        required: [true, 'Product must have a price'],
        trim: true,
    },
    quantity: {
        type: String,
        required: [true, 'Enter the quantity of product available'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Product must have a description"],
        trim: true,
    },
    image: {
        type: Object,
        default: {},
    },
    value: {
        type: Number
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User",
    },
}, {
    timestamps: true,
});

productSchema.pre('save', function (next) {
    // Use the current value of quantity if price is provided
    if (this.isModified('price') && !this.isModified('quantity')) {
        this.value = this.price * this.quantity;
    }
    // Use the current value of price if quantity is provided
    else if (!this.isModified('price') && this.isModified('quantity')) {
        this.value = this.price * this.quantity;
    }
    // Use both fields if both are modified
    else {
        this.value = this.price * this.quantity;
    }
    next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
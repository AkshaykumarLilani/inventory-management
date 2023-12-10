// Function to generate a random product name
module.exports.generateRandomProductName = function () {
    const adjectives = ['Red', 'Blue', 'Green', 'Tech', 'Fashionable', 'Smart'];
    const nouns = ['Phone', 'Shirt', 'Watch', 'Camera', 'Shoes', 'Laptop'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
}

// Function to generate a random price between a given range
module.exports.generateRandomPrice = function (min, max) {
    return Number((Math.random() * (max - min) + min).toFixed(2));
}

// Function to generate a random quantity
module.exports.generateRandomQuantity = function () {
    return Math.floor(Math.random() * 50) + 1; // Adjust the range as needed
}

// Function to generate a random description
module.exports.generateRandomDescription = function () {
    const descriptions = ['High-quality product', 'Latest technology', 'Comfortable fit', 'Stylish design'];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
}

// Function to generate a random category
module.exports.generateRandomCategory = function () {
    const categories = ['Electronics', 'Apparels'];
    return [categories[Math.floor(Math.random() * categories.length)]];
}
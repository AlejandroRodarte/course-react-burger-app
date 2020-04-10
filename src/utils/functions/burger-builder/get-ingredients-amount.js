export default function(ingredients) {
    return Object
            .keys(ingredients)
            .map(ingredientKey => ingredients[ingredientKey])
            .reduce((acc, cv) => acc + cv, 0);
}

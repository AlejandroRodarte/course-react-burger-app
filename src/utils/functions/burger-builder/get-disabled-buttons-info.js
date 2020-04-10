export default function(ingredients) {

    const disabledButtonsInfo = {};

    Object
        .keys(ingredients)
        .forEach((ingredientKey) => disabledButtonsInfo[ingredientKey] = ingredients[ingredientKey] <= 0);

    return disabledButtonsInfo;

}

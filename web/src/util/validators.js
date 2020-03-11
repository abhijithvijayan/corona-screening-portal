export function isValidAge(age) {
    const re = /^[1-9]?[0-9]{1}$|^100$/;

    return re.test(age);
}

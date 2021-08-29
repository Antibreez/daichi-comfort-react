const REG_EXP = {
    email: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    phone: /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/
};

const PASSWORD_MIN_LENGTH = 5;

export const isEmailValid = (email) => {
    return email.match(REG_EXP.email) !== null;
}

export const isPhoneValid = (phone) => {
    return phone.match(REG_EXP.phone) !== null;
}

export const isPassowrdValid = (password) => {
    return password.length >= PASSWORD_MIN_LENGTH;
}

export const getProperPhone = (value) => {
    let phone = value;

    phone = phone.split('+').join('').split('-').join('').split('(').join('').split(')').join('').split(' ').join('')

    console.log(phone);

    if (phone[0] == 8) {
        phone = '+7' + phone.slice(-phone.length + 1)
    } else {
        phone = '+' + phone
    }

    return phone
}
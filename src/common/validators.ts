const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

export const nameValidator = (value: string) => !(value.length > 0) ? 'Имя не должно быть пустым полем' : null;
export const emailValidator = (value: string) => !emailRegex.test(value) ? 'Некорректный формат электронной почты' : null;
export const passwordValidator = (value: string) => !passwordRegex.test(value)
    ? 'Пароль должен быть не меньше 6 символов и включать одну цифру, одну заглавную и малую буквы, а также один спец символ' : null;

export const formValidator = (formData: { [key: string]: string }) => {
    const { password, password2 } = formData;

    return (password && password2 && password !== password2)
        ? { password2: 'Пароли не совпадают' } as { [key: string]: string }
        : {}
};


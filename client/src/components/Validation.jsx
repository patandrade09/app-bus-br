export const Validation = (values) => {
    let errors = {}
    if (!values.username) {
        errors.username = "Nome é obrigatório"
    } else if (values.username.length < 3){
        errors.username = "Nome deve conter mais de 3 caractéres"
    }
}

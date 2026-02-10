fullName = "Paulo Roberto Wilhelm";
age = 16;
salary = 10000.00;
livesInSaoPaulo = false;
phones = ["11 99999-9999", "11 88888-8888", "11 77777-7777"];
email = "paulo@gmail.com";
birthDate = new Date("1990-01-01");

// console.log(fullName);
// console.log(age);
// console.log(salary);
// console.log(livesInSaoPaulo);
// console.log(phones);
// console.log(email);
// console.log(birthDate);


// Verifica se o usuario é maior de idade

if (age >= 18) {
    console.log("Você é maior de idade");
} else {
    console.log("Você é menor de idade");
}

console.log("Executa de qualquer forma");

// Verifica se o usuario mora em São Paulo

if (livesInSaoPaulo) {
    console.log("Você mora em São Paulo");
} else {
    console.log("Você não mora em São Paulo");
}

// esta logado no sistema
isLoggedIn = true;
if (isLoggedIn) {
    console.log("Você está logado no sistema");
    console.log("Bem-vindo de volta, " + fullName); // exemplo de concatenação de string com variável

    // listar os telefones do usuario com for simples
    //ex: em português: 
    // para cada telefone na lista de telefones, imprima o telefone
    for (counter = 0; counter < phones.length; counter++) {
        console.log(phones[counter]);
    }

    console.log("Seu salario é de " + salary);

} else {
    console.log("Você não está logado no sistema");
    console.log("Por favor, faça login para continuar");
}
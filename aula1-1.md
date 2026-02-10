## Variáveis e Tipos de Dados

Aqui se declara as variáveis em JavaScript. Pode-se usar `const`, `let` ou `var`.  
Exemplo:

```javascript
let nome = "Paulo"; // string
let idade = 25; // number
let salario = 10000.00; // number
let ehMaiorDeIdade = true; // boolean
let endereco = {
    rua: "Rua do Carmo",
    numero: 123,
    cidade: "São Paulo",
    estado: "SP",
    pais: "Brasil"
}; // object
let telefone = ["11 99999-9999", "11 88888-8888"]; // array de strings
let email = "paulo@gmail.com"; // string
let dataNascimento = new Date("1990-01-01 10:00:00"); // date (data e hora)
```

Exemplo em outras linguagens:

Python:
```python
nome = "Paulo"
idade = 25
endereco = "Rua do Carmo, 123"
telefone = "11 99999-9999"
email = "paulo@gmail.com"
```

Java:
```java
String nome = "Paulo";
int idade = 25;
String endereco = "Rua do Carmo, 123";
String telefone = "11 99999-9999";
String email = "paulo@gmail.com";
```

C++:
```cpp
string nome = "Paulo";
int idade = 25;
string endereco = "Rua do Carmo, 123";
string telefone = "11 99999-9999";
string email = "paulo@gmail.com";
```

Exemplos de tipos de dados em JavaScript:
- **String** - texto
- **Number** - número
- **Boolean** - verdadeiro ou falso
- **Array** - lista de valores (indexada)
- **Object** - conjunto de valores chave-valor
- **Null** - nulo (não tem valor)
- **Undefined** - indefinido (não tem valor)
- **Date** - data (data e hora)

---

## Operadores (Aritméticos, Lógicos, Comparação)

### Operadores aritméticos mais utilizados
- `+` adição
- `-` subtração
- `*` multiplicação
- `/` divisão (quociente)
- `%` resto da divisão
- `**` potência

Exemplo:
```javascript
1 + 1 // 2
1 - 1 // 0
1 * 1 // 1
1 / 1 // 1
1 % 1 // 0
1 ** 1 // 1
```

Erros comuns:
```javascript
1 / 0    // Infinity (divisão por zero)
1 % 0    // NaN (resto de divisão por zero)
1 ** 0   // 1 (qualquer número elevado a zero)
1 + "2"  // "12" (concatenação de string com número)
1 - "2"  // -1 (subtração de string com número)
1 * "2"  // 2 (multiplicação de string com número)
1 / "2"  // 0.5 (divisão de string com número)
1 % "2"  // 1 (resto de divisão de string com número)
1 ** "2" // 1 (potência de string com número)
```

---

### Operadores lógicos
- `&&` e
- `||` ou
- `!` não

Exemplo:
```javascript
true && true    // true
true && false   // false
false && true   // false
false && false  // false

true || true    // true
true || false   // true
false || true   // true
false || false  // false

!true  // false
!false // true
```

---

### Operadores de comparação
- `==` igual (valor)
- `!=` diferente (valor)
- `>` maior (valor)
- `<` menor (valor)
- `>=` maior ou igual (valor)
- `<=` menor ou igual (valor)
- `===` igual e do mesmo tipo (strict equality)
- `!==` diferente e do mesmo tipo (strict inequality)

Exemplo:
```javascript
1 == 1      // true
1 == "1"    // true
1 != "1"    // false
1 > 2       // false
1 < 2       // true
1 >= 2      // false
1 <= 2      // true
1 === 1     // true
1 === "1"   // false
1 !== "1"   // true
1 !== 1     // false
1 !== "1"   // true
```

---

## Estruturas condicionais (if/else, switch)

Um exemplo simples de condicional:
```javascript
if (idade >= 18) {
    console.log("Você é maior de idade");
} else {
    console.log("Você é menor de idade");
}
```

Exemplo fictício:
```javascript
let condicao = "a porta nao esta trancada"; // string
if (condicao) {
    // código a ser executado se a condição for true
    // abrir a porta
} else {
    // código a ser executado se a condição for false
    // pegar a chave e abrir a porta
}
```

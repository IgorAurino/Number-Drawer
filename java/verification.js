document.addEventListener('DOMContentLoaded', function() {
    // Recupera os números sorteados do localStorage
    const randomNumbers = JSON.parse(localStorage.getItem('randomNumbers'));

    // Se números sorteados forem encontrados
    if (randomNumbers) {
        console.log('Números sorteados recuperados:', randomNumbers);

        // Contador de tentativas
        let attempts = 3;

        // Elementos do DOM
        const attemptsLeft = document.getElementById('attempts-left');
        const inputNumber = document.getElementById('input-number');
        const btnSend = document.getElementById('btnSend');
        const revealNumber = document.getElementById('reveal-number');

        // Inicializa o texto de tentativas restantes
        attemptsLeft.textContent = `Tentativas restantes: ${attempts}`;

        // Adiciona event listener para verificar o número inserido
        if (btnSend) {
            btnSend.addEventListener('click', function() {
                const guessNumber = parseInt(inputNumber.value);

                if (isNaN(guessNumber)) {
                    // Verifica se foi inserido um número válido
                    attemptsLeft.textContent = `Tentativas restantes: ${attempts} - Insira um número válido`;
                    return;
                }

                // Limpa o campo de entrada
                inputNumber.value = '';

                // Verifica se o número inserido está entre os números sorteados
                if (randomNumbers.includes(guessNumber)) {
                    // Caso o número seja correto
                    inputNumber.disabled = true;
                    btnSend.disabled = true;
                    
                    // Animação para parabéns
                    attemptsLeft.textContent = `Parabéns, você acertou em ${3 - attempts + 1} tentativa(s)`;
                    attemptsLeft.style.animation = 'bounce 0.5s ease-in-out';
                    attemptsLeft.style.color = '#2ecc71';

                    // Exibe o número sorteado
                    revealNumber.textContent = `O número sorteado era: ${randomNumbers.join(', ')}`;
                    revealNumber.style.display = 'block';
                } else {
                    // Caso o número seja incorreto
                    attempts--;
                    if (attempts > 0) {
                        // Animação de erro
                        attemptsLeft.classList.add('error-shake');
                        setTimeout(() => {
                            attemptsLeft.classList.remove('error-shake');
                        }, 500);

                        attemptsLeft.textContent = `Tentativas restantes: ${attempts}`;
                    } else {
                        attemptsLeft.textContent = `Suas tentativas acabaram. O número sorteado era: ${randomNumbers.join(', ')}`;
                        inputNumber.disabled = true;
                        btnSend.disabled = true;
                    }
                }
            });
        } else {
            console.log('Botão de enviar não encontrado.');
        }
    } else {
        console.log('Nenhum número sorteado encontrado.');
    }
});

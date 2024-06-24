document.addEventListener('DOMContentLoaded', function() {
    // Variáveis para armazenar estado
    let inicioNumeros = document.getElementById('inicio-numeros');
    let fimNumeros = document.getElementById('fim-numeros');

    // Botão de sortear
    if (document.getElementById('btnSortear')) {
        document.getElementById('btnSortear').addEventListener('click', function() {
            inicioNumeros = parseInt(document.getElementById('inicio-numeros').value);
            fimNumeros = parseInt(document.getElementById('fim-numeros').value);

            if (inicioNumeros > fimNumeros) {
                alert('O número inicial não pode ser maior que o número final.');
                return;
            }

            let numeroAleatorio = Math.floor(Math.random() * (fimNumeros - inicioNumeros + 1)) + inicioNumeros;
            localStorage.setItem('numeroSorteado', numeroAleatorio);
            console.log(`Número sorteado: ${numeroAleatorio}`);

            // Determinar o número de tentativas com base no intervalo
            let intervalo = fimNumeros - inicioNumeros;
            let tentativas = intervalo > 10 ? 5 : 3;
            localStorage.setItem('tentativas', tentativas);

            window.location.href = '../html/page-game.html';
        });
    }

    // Exibir o número sorteado na página page-game.html
    if (window.location.pathname.includes('page-game.html')) {
        let numeroSorteado = localStorage.getItem('numeroSorteado');
        if (numeroSorteado) {
            console.log(`Número sorteado: ${numeroSorteado}`);
        }
    }

    // Botão ENVIAR na página page-game.html
    if (document.getElementById('btnSend')) {
        let tentativasRestantes = parseInt(localStorage.getItem('tentativas')) || 3;
        let tentativasUsadas = 0;
        document.getElementById('btnSend').addEventListener('click', function() {
            let numeroSorteado = parseInt(localStorage.getItem('numeroSorteado'));
            let inputNumber = parseInt(document.getElementById('input-number').value);

            tentativasUsadas++;

            let attemptsLeft = document.getElementById('attempts-left');
            let revealNumber = document.getElementById('reveal-number');

            if (inputNumber === numeroSorteado) {
                attemptsLeft.textContent = `Parabéns! Você acertou o número em ${tentativasUsadas} tentativa(s).`;
                attemptsLeft.classList.add('bounce');
                attemptsLeft.style.color = 'green';
                document.getElementById('btnSend').disabled = true;

                // Dispara a animação de confetes
                triggerConfetti();
            } else {
                tentativasRestantes--;
                if (tentativasRestantes > 0) {
                    attemptsLeft.textContent = `Número incorreto. Você tem mais ${tentativasRestantes} tentativa(s).`;
                    attemptsLeft.style.color = '#fa4530';
                    attemptsLeft.classList.add('error-shake');
                    setTimeout(() => {
                        attemptsLeft.classList.remove('error-shake');
                    }, 500);
                } else {
                    attemptsLeft.textContent = `Você não tem mais tentativas.`;
                    attemptsLeft.style.color = '#fa4530';
                    revealNumber.style.display = 'block';
                    revealNumber.textContent = `O número sorteado era: ${numeroSorteado}`;
                    document.getElementById('btnSend').disabled = true;
                    btnSend.classList.add('disabled');
                }
            }
        });
    }

    // Disparar confetes
    function triggerConfetti() {
        confetti({
            particleCount: 2000,
            spread: 1000,
            origin: { y: 0.4 }
        });
    }

    // Event listener para o botão HOME
    if (document.querySelector('.btn-play')) {
        document.querySelector('.btn-play').addEventListener('click', function() {
            localStorage.removeItem('numeroSorteado');
            localStorage.removeItem('tentativas');
        });
    }

});

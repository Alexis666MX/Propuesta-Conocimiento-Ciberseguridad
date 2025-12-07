function submitQuiz() {
    const quizData = [
        { name: 'q1', answer: 'c', explanation: 'Correcto. Nunca hagas clic en enlaces sospechosos. Siempre ve directamente al sitio web oficial para verificar.' },
        { name: 'q2', answer: 'b', explanation: 'Correcto. Las actualizaciones corrigen vulnerabilidades que los ciberdelincuentes usan para atacar.' },
        { name: 'q3', answer: 'b', explanation: 'Correcto. La 2FA es una capa de seguridad vital que combina algo que sabes (contraseña) con algo que tienes (tu móvil).' },
        { name: 'q4', answer: 'b', explanation: 'Correcto. El software pirata es una de las principales fuentes de infecciones por malware como troyanos y spyware.' },
        { name: 'q5', answer: 'b', explanation: 'Correcto. Una contraseña larga, con mayúsculas, minúsculas, números y símbolos es exponencialmente más difícil de adivinar.' }
    ];

    let score = 0;
    const form = document.getElementById('quizForm');
    const resultDiv = document.getElementById('quizResult');
    const feedbackDiv = document.getElementById('quizFeedback');
    
    // Limpiar resultados anteriores
    resultDiv.innerHTML = '';
    feedbackDiv.innerHTML = '';

    let allAnswered = true;
    const userAnswers = [];

    quizData.forEach(item => {
        const userAnswer = form.querySelector(`input[name="${item.name}"]:checked`);
        if (!userAnswer) {
            allAnswered = false;
        }
        userAnswers.push(userAnswer);
    });

    if (!allAnswered) {
        resultDiv.textContent = "ALERTA: Debes responder todas las preguntas para completar el análisis.";
        resultDiv.style.color = "var(--error-color)";
        return;
    }

    // Calcular puntaje y generar feedback
    let feedbackHTML = '<h3>Análisis de Respuestas:</h3>';
    quizData.forEach((item, index) => {
        const userAnswer = userAnswers[index];
        if (userAnswer.value === item.answer) {
            score++;
            feedbackHTML += `
                <div class="feedback-item correct">
                    <p><strong>Pregunta ${index + 1}: Correcta.</strong> ${item.explanation}</p>
                </div>
            `;
        } else {
            feedbackHTML += `
                <div class="feedback-item incorrect">
                    <p><strong>Pregunta ${index + 1}: Incorrecta.</strong> La respuesta correcta era la opción que dice: "${item.explanation.split('.')[1].trim()}".</p>
                </div>
            `;
        }
    });

    feedbackDiv.innerHTML = feedbackHTML;

    // Mostrar puntaje final
    let message = '';
    const totalQuestions = quizData.length;
    
    if (score === totalQuestions) {
        message = `¡NIVEL EXPERTO! ${score}/${totalQuestions}. Tu conocimiento es un escudo impenetrable. 🛡️`;
        resultDiv.style.color = 'var(--success-color)';
    } else if (score >= totalQuestions / 2) {
        message = `¡BUEN TRABAJO! ${score}/${totalQuestions}. Tienes una defensa sólida, pero no bajes la guardia. 👍`;
        resultDiv.style.color = 'var(--primary-color)';
    } else {
        message = `¡CUIDADO! ${score}/${totalQuestions}. Tu sistema tiene vulnerabilidades. Repasa la guía y fortalece tus defensas. ⚠️`;
        resultDiv.style.color = 'var(--warning-color)';
    }

    resultDiv.textContent = message;
}
<template>
    <form @submit.prevent="handleSubmit">
        <h2>Iniciar Sesión</h2>
        <div class="form-group">
            <label for="loginEmail">Email:</label>
            <input
                type="email"
                id="loginEmail"
                v-model="email"
                required
                aria-describedby="loginEmailHelp"
            />
            <small id="loginEmailHelp" class="form-text text-muted">Ingresa tu email registrado.</small>
        </div>

        <div class="form-group">
            <label for="loginPassword">Contraseña:</label>
            <input
                type="password"
                id="loginPassword"
                v-model="password"
                required
                minlength="8"
                aria-describedby="loginPasswordHelp"
            />
            <small id="loginPasswordHelp" class="form-text text-muted">Ingresa tu contraseña.</small>
        </div>

        <button type="submit" :disabled="!isFormValid">Iniciar Sesión</button>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
    name: 'LoginForm',
    setup() {
        const email = ref('');
        const password = ref('');

        const isFormValid = computed(() => {
            // Check HTML5 validity for all fields
            // Accessing form element directly in setup might be tricky before mount
            // For now, rely on basic checks and browser's built-in validation
            return email.value.length > 0 && password.value.length >= 8;
        });

        const handleSubmit = async () => {
            // A more robust check for form validity for actual submission
            const form = (document.getElementById('loginEmail') as HTMLInputElement)?.form;
            if (form && form.checkValidity() && isFormValid.value) {
                console.log('Formulario de login válido, enviando datos:', {
                    email: email.value,
                    password: password.value,
                });

                try {
                    const response = await fetch('http://localhost:3000/api/users/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email.value,
                            password: password.value,
                        }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert(`¡Bienvenido, ${data.user.username}!`);
                        // Handle successful login, e.g., store token, redirect
                        console.log('Login exitoso:', data);
                        // Clear form
                        email.value = '';
                        password.value = '';
                    } else {
                        alert(`Error al iniciar sesión: ${data.msg || 'Credenciales inválidas.'}`);
                        console.error('Error al iniciar sesión:', data);
                    }
                } catch (error) {
                    console.error('Error de red o del servidor:', error);
                    alert('Error de conexión. Inténtalo de nuevo más tarde.');
                }

            } else {
                console.log('Formulario de login inválido.');
                alert('Por favor, ingresa un email y contraseña válidos.');
            }
        };

        return {
            email,
            password,
            isFormValid,
            handleSubmit,
        };
    },
});
</script>

<style scoped>
:host {
    --oxo-bg-primary: #161616;
    --oxo-bg-secondary: #262626;
    --oxo-bg-tertiary: #393939;
    --oxo-text-primary: #f4f4f4;
    --oxo-text-secondary: #c6c6c6;
    --oxo-accent-cyan: #78c2c4;
    --oxo-accent-teal: #08bdba;
    --oxo-accent-magenta: #ee5396;
    --oxo-accent-purple: #a56eff;
    --oxo-border: #393939;
    --oxo-error: #fa4d56;
    --oxo-success: #42be65;
}

.form-group {
    margin-bottom: 15px;
    text-align: left;
}
label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: var(--oxo-text-primary);
}
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 12px;
    border: 2px solid var(--oxo-border);
    border-radius: 4px;
    background-color: var(--oxo-bg-primary);
    color: var(--oxo-text-primary);
    box-sizing: border-box;
    font-size: 14px;
    transition: border-color 0.3s, box-shadow 0.3s;
}

input[type="email"]:focus,
input[type="password"]:focus {
    outline: none;
    border-color: var(--oxo-accent-cyan);
    box-shadow: 0 0 8px rgba(120, 194, 196, 0.3);
}

button {
    background: linear-gradient(135deg, var(--oxo-accent-cyan) 0%, var(--oxo-accent-teal) 100%);
    color: #161616;
    font-weight: bold;
    padding: 12px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    margin-top: 10px;
    transition: transform 0.2s, box-shadow 0.2s;
}

button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(120, 194, 196, 0.4);
}

button:disabled {
    background-color: var(--oxo-bg-tertiary);
    color: #6c6c6c;
    cursor: not-allowed;
}
.text-muted {
    color: var(--oxo-text-secondary);
    font-size: 0.85em;
}
h2 {
    color: var(--oxo-accent-cyan);
    text-align: center;
    margin-bottom: 25px;
}
</style>

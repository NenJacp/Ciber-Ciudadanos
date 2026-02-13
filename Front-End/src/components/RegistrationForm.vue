<template>
    <form @submit.prevent="handleSubmit">
        <h2>Registro de Ciber-Ciudadanos</h2>

        <div class="form-group">
            <label for="username">Username:</label>
            <input
                type="text"
                id="username"
                v-model="username"
                required
                minlength="3"
                @blur="usernameTouched = true"
                :class="{
                    'is-invalid': usernameTouched && username.length > 0 && username.length < 3,
                    'is-valid': usernameTouched && username.length >= 3
                }"
            />
            <small v-if="usernameTouched && username.length > 0 && username.length < 3" class="text-danger">El username debe tener al menos 3 caracteres.</small>
            <small v-else-if="usernameTouched && username.length >= 3" class="text-success">✓ Válido</small>
            <small v-else class="form-text text-muted">Mínimo 3 caracteres.</small>
        </div>

        <div class="form-group">
            <label for="email">Email:</label>
            <input
                type="email"
                id="email"
                v-model="email"
                required
                @blur="emailTouched = true"
                @input="validateEmailFormat"
                :class="{
                    'is-invalid': emailTouched && !isEmailValid && email.length > 0,
                    'is-valid': emailTouched && isEmailValid && email.length > 0
                }"
            />
            <small v-if="emailTouched && !isEmailValid && email.length > 0" class="text-danger">Por favor ingresa un email válido.</small>
            <small v-else-if="emailTouched && isEmailValid && email.length > 0" class="text-success">✓ Válido</small>
            <small v-else class="form-text text-muted">Asegúrate de que sea un email válido.</small>
        </div>

        <div class="form-group">
            <label for="password">Contraseña:</label>
            <div class="password-wrapper">
                <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="password"
                    required
                    minlength="8"
                    autocomplete="new-password"
                    @blur="passwordTouched = true"
                    :class="{
                        'is-invalid': passwordTouched && !isPasswordValid && password.length > 0,
                        'is-valid': passwordTouched && isPasswordValid && password.length > 0
                    }"
                />
                <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                    <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-icon"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                </button>
            </div>
            <small v-if="passwordTouched && !isPasswordValid && password.length > 0" class="text-danger">La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.</small>
            <small v-else-if="passwordTouched && isPasswordValid && password.length > 0" class="text-success">✓ Válido</small>
            <small v-else class="form-text text-muted">Mínimo 8 caracteres, al menos una mayúscula y un número.</small>
        </div>

        <div class="form-group">
            <label for="confirmPassword">Confirmar Contraseña:</label>
            <div class="password-wrapper">
                <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    required
                    autocomplete="new-password"
                    @blur="confirmTouched = true"
                    :class="{
                        'is-invalid': confirmTouched && password !== confirmPassword && confirmPassword.length > 0,
                        'is-valid': confirmTouched && password === confirmPassword && confirmPassword.length > 0
                    }"
                />
                <button type="button" class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
                    <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-icon"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                </button>
            </div>
            <small v-if="confirmTouched && password !== confirmPassword && confirmPassword.length > 0" class="text-danger">Las contraseñas no coinciden.</small>
            <small v-else-if="confirmTouched && password === confirmPassword && confirmPassword.length > 0" class="text-success">✓ Válido</small>
        </div>

        <div class="form-group">
            <label for="humanityTest">Prueba de Humanidad: ¿Cuánto es {{ num1 }} + {{ num2 }}?</label>
            <input
                type="text"
                id="humanityTest"
                v-model.number="humanityTestAnswer"
                required
                @blur="humanityTestTouched = true"
                :class="{
                    'is-invalid': humanityTestTouched && !isHumanityTestValid && humanityTestAnswer !== null,
                    'is-valid': humanityTestTouched && isHumanityTestValid
                }"
            />
            <small v-if="humanityTestTouched && !isHumanityTestValid && humanityTestAnswer !== null" class="text-danger">Respuesta incorrecta.</small>
            <small v-else-if="humanityTestTouched && isHumanityTestValid" class="text-success">✓ Eres humano</small>
            <small v-else class="form-text text-muted">Por favor, demuéstranos que no eres un robot.</small>
        </div>

        <button type="submit" :disabled="!allFieldsValid">Registrarse</button>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';

export default defineComponent({
    name: 'RegistrationForm',
    setup() {
        const username = ref('');
        const email = ref('');
        const password = ref('');
        const confirmPassword = ref('');
        const humanityTestAnswer = ref<number | null>(null);

        const num1 = ref(0);
        const num2 = ref(0);

        const usernameTouched = ref(false);
        const emailTouched = ref(false);
        const passwordTouched = ref(false);
        const humanityTestTouched = ref(false);
        const confirmTouched = ref(false);

        const showPassword = ref(false);
        const showConfirmPassword = ref(false);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const isEmailValid = computed(() => {
            return emailRegex.test(email.value);
        });

        const isPasswordValid = computed(() => {
            const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            return regex.test(password.value);
        });

        const expectedAnswer = computed(() => num1.value + num2.value);

        const isHumanityTestValid = computed(() => {
            return humanityTestAnswer.value === expectedAnswer.value;
        });

        const generateRandomNumbers = () => {
            num1.value = Math.floor(Math.random() * 10) + 1;
            num2.value = Math.floor(Math.random() * 10) + 1;
        };

        onMounted(() => {
            generateRandomNumbers();
        });

        const validateEmailFormat = () => {
            emailTouched.value = true;
        };

        const allFieldsValid = computed(() => {
            return username.value.length >= 3 &&
                   isEmailValid.value &&
                   isPasswordValid.value &&
                   password.value === confirmPassword.value &&
                   isHumanityTestValid.value;
        });

        const handleSubmit = async () => {
            usernameTouched.value = true;
            emailTouched.value = true;
            passwordTouched.value = true;
            humanityTestTouched.value = true;
            confirmTouched.value = true;

            if (allFieldsValid.value) {
                try {
                    const response = await fetch('http://localhost:3000/api/users/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username.value,
                            email: email.value,
                            password: password.value,
                            confirmPassword: confirmPassword.value,
                            humanityTestAnswer: expectedAnswer.value,
                        }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert('¡Registro exitoso!');
                        username.value = '';
                        email.value = '';
                        password.value = '';
                        confirmPassword.value = '';
                        humanityTestAnswer.value = null;
                        usernameTouched.value = false;
                        emailTouched.value = false;
                        passwordTouched.value = false;
                        humanityTestTouched.value = false;
                        generateRandomNumbers();
                    } else {
                        alert(`Error en el registro: ${data.msg || 'Por favor, corrige los errores del formulario.'}`);
                    }
                } catch {
                    alert('Error de conexión. Inténtalo de nuevo más tarde.');
                }
            }
        };

        return {
            username,
            email,
            password,
            confirmPassword,
            humanityTestAnswer,
            num1,
            num2,
            usernameTouched,
            emailTouched,
            passwordTouched,
            humanityTestTouched,
            confirmTouched,
            showPassword,
            showConfirmPassword,
            isEmailValid,
            isPasswordValid,
            isHumanityTestValid,
            allFieldsValid,
            validateEmailFormat,
            handleSubmit,
        };
    },
});
</script>

<style scoped>
* {
    box-sizing: border-box;
}

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

form {
    background-color: var(--oxo-bg-secondary);
    color: var(--oxo-text-primary);
    padding: 30px;
    border-radius: 8px;
    max-width: 450px;
    margin: 0 auto;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    border: 1px solid var(--oxo-border);
}

h2 {
    text-align: center;
    color: var(--oxo-accent-cyan);
    margin-bottom: 25px;
}

.form-group {
    margin-bottom: 18px;
    text-align: left;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: var(--oxo-text-primary);
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"] {
    width: 100%;
    padding: 12px;
    border: 2px solid var(--oxo-border);
    border-radius: 4px;
    background-color: var(--oxo-bg-primary);
    color: var(--oxo-text-primary);
    font-size: 14px;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.password-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.password-wrapper input {
    flex: 1;
    padding-right: 50px;
}

.toggle-password {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    color: #ffffff;
    cursor: pointer;
    font-size: 16px;
    padding: 5px;
    width: auto;
    margin-top: 0;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.toggle-password:hover {
    color: #ffffff;
}

.toggle-password:hover {
    color: var(--oxo-accent-teal);
}

button[type="submit"] {
    background: linear-gradient(135deg, var(--oxo-accent-cyan) 0%, var(--oxo-accent-teal) 100%);
    color: var(--oxo-bg-primary);
    font-weight: bold;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    margin-top: 15px;
    transition: transform 0.2s, box-shadow 0.2s;
}

button[type="submit"]:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(120, 194, 196, 0.4);
}

button:disabled {
    background: var(--oxo-bg-tertiary);
    color: #6c6c6c;
    cursor: not-allowed;
}

.text-muted {
    color: var(--oxo-text-secondary);
    font-size: 0.85em;
    display: block;
    margin-top: 5px;
}

.text-danger {
    color: var(--oxo-error);
    font-size: 0.85em;
    display: block;
    margin-top: 5px;
}

.text-success {
    color: var(--oxo-success);
    font-size: 0.85em;
    display: block;
    margin-top: 5px;
}
</style>

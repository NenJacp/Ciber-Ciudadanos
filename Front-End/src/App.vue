<template>
    <div id="app-container">
        <component :is="currentView"></component>
        <p class="toggle-view">
            <span v-if="currentView === 'RegistrationForm'">
                ¿Ya tienes cuenta? <a href="#" @click.prevent="currentView = 'LoginForm'">Inicia sesión aquí.</a>
            </span>
            <span v-else>
                ¿No tienes cuenta? <a href="#" @click.prevent="currentView = 'RegistrationForm'">Crea una aquí.</a>
            </span>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginForm from './components/LoginForm.vue';
import RegistrationForm from './components/RegistrationForm.vue';

export default defineComponent({
    name: 'App',
    components: {
        LoginForm,
        RegistrationForm,
    },
    setup() {
        const currentView = ref('RegistrationForm'); // Start with the registration form
        return {
            currentView,
        };
    },
});
</script>

<style>
:root {
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

#app-container {
    background-color: var(--oxo-bg-secondary);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    width: 100%;
    max-width: 450px;
    text-align: center;
    margin: 50px auto;
    border: 1px solid var(--oxo-border);
}
.toggle-view {
    margin-top: 20px;
    font-size: 0.9em;
    color: var(--oxo-text-secondary);
}
.toggle-view a {
    color: var(--oxo-accent-cyan);
    text-decoration: none;
    font-weight: bold;
    transition: color 0.2s;
}
.toggle-view a:hover {
    color: var(--oxo-accent-teal);
    text-decoration: underline;
}

body {
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--oxo-bg-primary);
    margin: 0;
}
</style>
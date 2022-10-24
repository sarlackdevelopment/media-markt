import { defineConfig } from 'cypress';

export default defineConfig({
    video: false,
    screenshotOnRunFailure: false,
    watchForFileChanges: true,
    viewportHeight: 800,
    viewportWidth: 1280,
    waitForAnimations: false,
    e2e: {
        setupNodeEvents(on, config) {},
        specPattern: 'cypress/e2e/**/*.spec.js',
        supportFile: false
    }
});

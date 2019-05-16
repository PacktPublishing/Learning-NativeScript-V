<template>
    <Page class="page">
        <ActionBar title="My App">
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack" />
        </ActionBar>

        <GridLayout
        rows="200,*">

            <Image 
                src="~/Images/logo.png" />
            <StackLayout
                row="1">
                <Button 
                    text="Button" 
                    @tap="increaseCounter"
                    :class="buttonBackground" />
                <TextField v-model="currentCounter" hint="Something" />
                <Button
                    text="Prompt"
                    @tap="askUser" />
                <TextField v-model="currentAnswer" hint="Answer" />
            </StackLayout>
        </GridLayout>

    </Page>
</template>

<script>
    export default {
        data() {
            return {
                currentCounter: 0,
                currentAnswer: ""
            }
        },
        computed: {
            buttonBackground() {
                if (this.currentCounter > 10) {
                    return "red-background";
                } else {
                    return "";
                }
            }
        },
        methods: {
            increaseCounter() {
                this.currentCounter++;
            },
            askUser() {
                prompt('What is your name?')
                    .then(result => {
                        this.currentAnswer = result.text;
                    });
            }
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables
    .red-background {
        background-color: red;
        color: black;
    }
</style>

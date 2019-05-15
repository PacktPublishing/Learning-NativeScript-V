<template>
    <Page class="page">
        <ActionBar title="My App">
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack" />
        </ActionBar>

        <StackLayout>

            <ScrollView>
                <StackLayout>
                    <Label class="sofia" text="Some" />
                    <Label text="Text" />
                    <Label text="To" />
                    <Label text="Fill" />
                    <Label text="The" />
                    <Label text="Space" />
                    <Label text="To" />
                    <Label text="Force" />
                    <Label text="Scrolling" />
                </StackLayout>
            </ScrollView>
            
        </StackLayout>

    </Page>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    { text: 'Patty' },
                    { text: 'Jessica' },
                    { text: 'Mackenzie' },
                    { text: 'Sophia' },
                    { text: 'Dapper' },
                    { text: 'Sam' },
                    { text: 'Andrew' },
                    { text: 'Coral' },
                    { text: 'Nadia' },
                    { text: 'Moma' },
                    { text: 'Carl' }
                ]
            }
        },
        computed: {
            anotherMessage() {
                return "Beautiful View";
            },
            message() {
                return "My Application!";
            }
        },
        methods: {
            openDialog() {
                prompt({
                    title: "Prompt Title",
                    message: "Prompt Body",
                    okButtonText: "Submit",
                    cancelButtonText: "Cancel",
                    defaultText: "Initial Text",
                }).then(result => {
                    console.log('Results');
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables
    Label {
        border-width:1;
        border-color:red;
        height: 100;
    }
    // Custom styles
    .fa {
        color: red;
    }

    .info {
        font-size: 30;
    }
</style>

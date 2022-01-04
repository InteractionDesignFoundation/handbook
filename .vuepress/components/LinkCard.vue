<template>
    <!--    <details><summary>{{title}}</summary>{{content}} </details>-->
    <div class="details">
        <h2>{{ title }}</h2>
        <p> {{ content }}</p>
    </div>

</template>

<script>
export default {
    name: 'Details',
    props: {
        title: {
            type: String,
            default: "title"
        },
        content: {
            type: String,
            default: "title"
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="styl">
.details {
    border-radius: 3px;
    background: #EEE;
    padding: 5px 5px 5px 5px;
}
h2, p {
    margin: 0;
}

</style>

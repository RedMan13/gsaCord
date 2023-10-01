<script lang="ts">
</script>

<div class="card">
    <slot />
</div>
<style>
    .card {
        border: 5px solid #f3f3f3;
        border-radius: 50%;
        border-top: 5px solid #555;
        object-fit: scale-down;
        display: table-cell;
        width: 50px;
        height: 50px;
        -webkit-animation: spin 1s linear infinite; /* Safari */
        animation: spin 1s linear infinite;
    }
</style>
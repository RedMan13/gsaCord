<script lang="ts">
    export let loaded: boolean | any
</script>

{#if loaded}
    <slot />
{:else}
    <div style="display:flex; justify-content:center; align-items:center; height:100%">
        <div class="loader" />
    </div>
{/if}

<style>
    .loader {
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
    
    /* Safari */
    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
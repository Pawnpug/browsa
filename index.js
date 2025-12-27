<script>
    const title = document.querySelector('h1');
    const body = document.querySelector('body');

    title.addEventListener('click', () => {
    if (body.style.backgroundColor === "rgb(64, 255, 182)") {
    body.style.backgroundColor = "#f16b55"; // Back to original orange
} else {
    body.style.backgroundColor = "#40ffb6"; // Switch to green
}
});
</script>
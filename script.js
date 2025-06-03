
document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

document.querySelectorAll('.drop-zone').forEach(zone => {
    zone.addEventListener('drop', drop);
    zone.addEventListener('dragover', event => event.preventDefault());
});

function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.label);
}

function drop(event) {
    const label = event.dataTransfer.getData("text/plain");
    const correct = event.target.dataset.season === label;

    if (correct) {
        document.getElementById('ding').play();
        event.target.appendChild(document.querySelector(`[data-label="${label}"]`));
    } else {
        document.getElementById('buzzer').play();
        showRedX();
    }
}

function showRedX() {
    const xOverlay = document.createElement("div");
    xOverlay.innerText = "✖";
    xOverlay.className = "red-x";
    document.body.appendChild(xOverlay);
    setTimeout(() => xOverlay.remove(), 1500);
}

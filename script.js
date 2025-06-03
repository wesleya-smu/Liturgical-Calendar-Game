
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
    const target = event.target;
    const correct = target.dataset.season === label;

    const labelEl = document.querySelector(`[data-label="${label}"]`);

    if (correct) {
        document.getElementById('ding').play();
        labelEl.style.left = target.style.left;
        labelEl.style.top = target.style.top;
        labelEl.setAttribute("draggable", "false");
        labelEl.style.backgroundColor = "#d4edda";
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

function resetGame() {
    document.querySelectorAll('.draggable').forEach((el, index) => {
        el.setAttribute("draggable", "true");
        el.style.left = "50px";
        el.style.top = (50 + index * 60) + "px";
        el.style.backgroundColor = "lightyellow";
    });
}

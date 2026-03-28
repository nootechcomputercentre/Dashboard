function openDetail(page) {
    window.open(page, "_blank");
}

function upload(event) {
    event.stopPropagation();

    let file = document.createElement("input");
    file.type = "file";

    file.onchange = () => {
        alert("Content Uploaded Successfully!");
    };

    file.click();
}
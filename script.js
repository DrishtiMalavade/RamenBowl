// Keeps track of the currently selected layer in each category
let selectedLayers = {
    broth: null,
    noodles: null,
    egg: null,
    meat: null
};

// Change layer function
function changeLayer(layerType, imagePath) {
    let layerId = '';

    // Determine layer type from ID prefix
    if (layerType.startsWith('broth')) layerId = 'broth';
    else if (layerType.startsWith('noodles')) layerId = 'noodles';
    else if (layerType.startsWith('egg')) layerId = 'egg';
    else if (layerType.startsWith('meat')) layerId = 'meat';
    else if (layerType.startsWith('topping')) layerId = 'topping';

    // For exclusive layers (broth, noodles, egg, meat)
    if (selectedLayers[layerId] === layerType) {
        // If clicked again, remove the image
        document.getElementById(layerType + '-layer').style.display = 'none';
        selectedLayers[layerId] = null;
    } else {
        // Hide previously selected layer in the category
        if (selectedLayers[layerId]) {
            document.getElementById(selectedLayers[layerId] + '-layer').style.display = 'none';
        }

        // Show the newly selected layer
        const layer = document.getElementById(layerType + '-layer');
        layer.src = imagePath;
        layer.style.display = 'block';
        selectedLayers[layerId] = layerType;
    }
}

// Download the customized ramen bowl as an image
function downloadRamen() {
    const bowlElement = document.querySelector('.bowl'); // Select the bowl area
    const bowlNameInput = document.getElementById('bowlName').value.trim(); // Get the custom name
    const fileName = bowlNameInput !== '' ? bowlNameInput + '.png' : 'my_ramen_bowl.png'; // Default name if input is empty

    html2canvas(bowlElement).then(canvas => {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = canvas.toDataURL();
        link.click();
    });
}

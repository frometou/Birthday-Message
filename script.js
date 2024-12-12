// script.js
document.addEventListener('DOMContentLoaded', function() {
  const balloonContainer = document.getElementById('balloonContainer');
  const confettiContainer = document.getElementById('confettiContainer');
  const specialButton = document.getElementById('specialButton');
  const modal = document.getElementById('modal');
  const closeModal = document.querySelector('.close');
  const layers = [
    { id: 'happyLayer', message: 'HAPPY' },
    { id: 'middleLayer', message: '21ST' },
    { id: 'birthdayLayer', message: 'BIRTHDAY' }
  ];
  const colors = ['#98ff98'];
  const confettiColors = ['#ff69b4', '#ffa07a', '#ff6347', '#ffd700', '#adff2f', '#00ff7f', '#00bfff', '#1e90ff', '#9370db'];

  let totalDelay = 0;
  const balloonDelay = 0.1; // 0.1 seconds delay between balloons
  const layerDelay = 1; // 1 second delay between layers

  // Create balloons for each layer
  layers.forEach((layer, layerIndex) => {
    const layerDiv = document.getElementById(layer.id);
    const layerStartDelay = totalDelay;
    for (let i = 0; i < layer.message.length; i++) {
      const balloon = document.createElement('div');
      balloon.classList.add('balloon');
      balloon.style.backgroundColor = colors[i % colors.length];
      balloon.style.animationDelay = `${layerStartDelay + i * balloonDelay}s`;
      balloon.setAttribute('data-letter', layer.message[i]);
      layerDiv.appendChild(balloon);
    }
    totalDelay += layer.message.length * balloonDelay + layerDelay;
  });

  // Select the last balloon and attach an animationend event
  const lastLayer = layers[layers.length - 1];
  const lastLayerDiv = document.getElementById(lastLayer.id);
  const lastBalloon = lastLayerDiv.children[lastLayer.message.length - 1];

  lastBalloon.addEventListener('animationend', () => {
    specialButton.style.display = 'block';
  });

  specialButton.addEventListener('click', () => {
    specialButton.style.display = 'none';

    // Create confetti
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.backgroundColor = confettiColors[i % confettiColors.length]; 
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.animationDelay = `${Math.random() * 5}s`;
      confettiContainer.appendChild(confetti);
    }

    // Add the read letter button
    const readLetterButton = document.createElement('button');
    readLetterButton.innerText = 'READ LETTER';
    readLetterButton.id = 'readLetterButton';
    readLetterButton.style.marginTop = '20px';
    readLetterButton.style.padding = '10px 10px';
    readLetterButton.style.fontSize = '16px';
    readLetterButton.style.backgroundColor = '#98ff98'; 
    readLetterButton.style.border = 'none';
    readLetterButton.style.height = '50px';
    readLetterButton.style.borderRadius = '20px';
    readLetterButton.style.cursor = 'pointer';
    readLetterButton.style.boxShadow = '0px 0px 10px 5px white'; 

    readLetterButton.addEventListener('mouseover', function() {
      readLetterButton.style.boxShadow = '0px 0px 10px 5px white'; 
    });

    readLetterButton.addEventListener('mouseout', function() {
      readLetterButton.style.boxShadow = 'none'; 
    });

    document.getElementById('animationContainer').appendChild(readLetterButton);

    // Open modal on button click
    readLetterButton.addEventListener('click', () => {
      modal.style.display = 'block';
    });
  });

  // Close modal
  closeModal.onclick = function() {
    modal.style.display = 'none';
  };

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
});

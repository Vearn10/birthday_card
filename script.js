const byId = (id) => document.getElementById(id);

byId('recipient').addEventListener('input', (event) => {
  byId('previewName').textContent = event.target.value.trim() || 'My Love';
});
byId('message').addEventListener('input', (event) => {
  byId('previewMessage').textContent = event.target.value;
});
byId('sender').addEventListener('input', (event) => {
  byId('previewSender').innerHTML = '';
  byId('previewSender').textContent = event.target.value;
  const heart = document.createElement('span');
  heart.textContent = ' ♥';
  byId('previewSender').appendChild(heart);
});
byId('theme').addEventListener('change', (event) => {
  byId('loveCard').className = `love-card theme-${event.target.value}`;
});

document.querySelectorAll('input[data-photo]').forEach((input) => {
  input.addEventListener('change', (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      input.value = '';
      return;
    }
    const index = Number(input.dataset.photo);
    const slot = document.querySelectorAll('.memory-slot')[index];
    const image = slot.querySelector('.memory-image');
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      image.src = loadEvent.target.result;
      slot.classList.add('has-photo');
      input.parentElement.querySelector('.upload-icon').textContent = '✓';
      input.parentElement.querySelector('.upload-name').textContent = 'Photo added';
    };
    reader.readAsDataURL(file);
  });
});

byId('resetButton').addEventListener('click', () => {
  byId('recipient').value = 'My Love';
  byId('message').value = 'Happy birthday to the person who makes my world brighter. I hope today brings you as much happiness as you bring into my life. Keep smiling, keep dreaming, and never forget how deeply you are loved. Here\\'s to more memories together. I love you! ♡';
  byId('sender').value = 'Forever yours';
  byId('previewName').textContent = 'My Love';
  byId('previewMessage').textContent = byId('message').value;
  byId('previewSender').textContent = 'Forever yours ♥';
  byId('theme').value = 'blush';
  byId('loveCard').className = 'love-card theme-blush';
});

byId('downloadButton').addEventListener('click', async () => {
  const button = byId('downloadButton');
  const originalText = button.innerHTML;
  button.disabled = true;
  button.textContent = 'Preparing your card…';
  try {
    if (typeof html2canvas === 'undefined') throw new Error('Export library did not load. Check your internet connection.');
    const card = byId('loveCard');
    const canvas = await html2canvas(card, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
      logging: false
    });
    const link = document.createElement('a');
    const name = (byId('recipient').value || 'my-love').trim().replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    link.download = `birthday-love-card-${name}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error(error);
    alert('The card could not be exported. Please check your internet connection and try again.');
  } finally {
    button.disabled = false;
    button.innerHTML = originalText;
  }
});

// Small floating hearts for the live page only; hidden during export.
const hearts = ['♡', '♥', '✧'];
for (let i = 0; i < 14; i++) {
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.textContent = hearts[i % hearts.length];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDelay = `${Math.random() * 12}s`;
  heart.style.animationDuration = `${12 + Math.random() * 10}s`;
  document.body.appendChild(heart);
}

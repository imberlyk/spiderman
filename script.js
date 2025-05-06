document.addEventListener('DOMContentLoaded', function() {
  
  function getRandomPosition() {
      const maxX = window.innerWidth - 90; // Adjust according to viewport size
      const maxY = window.innerHeight - 20; // Adjust according to viewport size
      const x = Math.floor(Math.random() * maxX);
      const y = Math.floor(Math.random() * maxY);
      return { x, y };
  }

  const colors = ['red'];
  let currentColorIndex = 0; 

  function duplicateDivWithDelay(delay) {
      setTimeout(function() {
          const originalDiv = document.querySelector('.duplicate');
          const clone = originalDiv.cloneNode(true);
          const position = getRandomPosition();
          clone.style.position = 'absolute';
          clone.style.left = position.x + 'px';
          clone.style.top = position.y + 'px';
          document.body.appendChild(clone);
          void clone.offsetWidth;

          clone.style.opacity = '1';
          clone.style.transition = 'opacity 0.3s ease'; 
          clone.style.backgroundColor = colors[currentColorIndex];
          currentColorIndex = (currentColorIndex + 1) % colors.length; 

          
          clone.addEventListener('mousemove', function() {
              document.body.removeChild(clone);
          });
      }, delay);
  }

  function startDuplication() {
      let numDivs = Math.ceil(window.innerWidth * window.innerHeight / (200 * 100)); //

     
      numDivs *= 26;

      const delayBetweenDuplicates = 500; 

      for (let i = 0; i < numDivs; i++) {
          duplicateDivWithDelay(i * delayBetweenDuplicates);
      }


      setTimeout(function() {
          const duplicates = document.querySelectorAll('.duplicate');
          duplicates.forEach(function(clone, index) {
              setTimeout(function() {
                  clone.style.transition = 'top 2s ease-out';
                  clone.style.top = window.innerHeight + 'px';
                  setTimeout(function() {
                      document.body.removeChild(clone);
                  }, 2000);
              }, index * 50);
          });

      
          setTimeout(startDuplication, 200); 
      }, numDivs * delayBetweenDuplicates);
  }

  startDuplication();
});

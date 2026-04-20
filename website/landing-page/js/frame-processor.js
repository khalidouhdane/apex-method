/* ==========================================================================
   APEX METHOD — Frame Processor
   Handles Chroma Keying and Canvas drawing
   ========================================================================== */

(function() {
  const { FRAME_COUNT, CANVAS_WIDTH, CANVAS_HEIGHT } = APEX.CONFIG;
  const { STATE } = APEX;

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = CANVAS_WIDTH; 
  tempCanvas.height = CANVAS_HEIGHT;
  const tCtx = tempCanvas.getContext('2d', { willReadFrequently: true });

  /**
   * processFrame: Removes green-screen background from raw frames.
   */
  APEX.processFrame = function(rawImg, index, isFirst = false) {
    tCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    tCtx.drawImage(rawImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const imgData = tCtx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const data = imgData.data;
    
    // Chroma Key logic: Target green range and spill
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i], g = data[i+1], b = data[i+2];
      if (g > 40 && g > r * 1.1 && g > b * 1.1) {
        let diff = g - Math.max(r, b);
        data[i+3] = diff > 25 ? 0 : Math.max(0, 255 - (diff * 10));
        if (data[i+3] > 0) data[i+1] = Math.min(g, Math.floor((r + b) / 2));
      }
    }
    tCtx.putImageData(imgData, 0, 0);
    
    const processed = new Image();
    processed.onload = () => {
      STATE.frames[index] = processed;
      if (isFirst) {
        document.getElementById('character-placeholder').style.display = 'none';
        document.getElementById('hero-canvas').style.display = 'block';
        APEX.drawFrame(0);
      }
    };
    processed.src = tempCanvas.toDataURL('image/png');
  };

  APEX.preloadFrames = function() {
    const firstImg = new Image();
    firstImg.src = `./Assets/frames/ezgif-frame-001.png`;
    firstImg.onload = () => {
      APEX.processFrame(firstImg, 0, true);
      for (let i = 2; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = `./Assets/frames/ezgif-frame-${String(i).padStart(3, '0')}.png`;
        img.onload = () => APEX.processFrame(img, i - 1);
      }
    };
  };

  APEX.drawFrame = function(index) {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || !STATE.frames[index]) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(STATE.frames[index], 0, 0, canvas.width, canvas.height);
  };
})();

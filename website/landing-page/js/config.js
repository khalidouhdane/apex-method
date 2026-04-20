/* ==========================================================================
   APEX METHOD — Global Config & State
   ========================================================================== */

window.APEX = window.APEX || {};

APEX.CONFIG = {
  FRAME_COUNT: 97,
  CANVAS_WIDTH: 1080,
  CANVAS_HEIGHT: 1920
};

APEX.STATE = {
  frames: [],
  frameObj: { frame: 0 },
  isLoaderComplete: false
};

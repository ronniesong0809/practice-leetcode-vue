var title = document.title;
var timeout;
document.addEventListener("visibilitychange", function() {
  if (document.hidden) {
    document.title = " ( つェ⊂ ) Okay! Ready! - " + title;
    clearTimeout(timeout);
  } else {
    document.title = " (*´∇｀*) You found me!!! - " + title;
    timeout = setTimeout(function() {
      document.title = title;
    }, 2000);
  }
});

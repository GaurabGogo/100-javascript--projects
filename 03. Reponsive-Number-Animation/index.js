const itemNumber = document.querySelectorAll(".item-number");

itemNumber.forEach((item, i) => {
  let initialValue = 0;
  let finalValue = parseInt(item.getAttribute("value"));
  let myInterval;

  function getDuration(initialValue) {
    let duration = Math.round((initialValue / finalValue) ** 16 * 160); //Exponential growth function

    // console.log(duration);
    return duration;
  }

  function getValue() {
    item.innerHTML = initialValue;
    clearInterval(myInterval);
    myInterval = setInterval(function () {
      if (initialValue !== finalValue) {
        initialValue++;
        getValue();
      } else {
        clearInterval(myInterval);
      }
    }, getDuration(initialValue));
    return;
  }

  setTimeout(getValue, 1000);
});

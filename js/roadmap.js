//Array controllers from the longest to shortest
let controllers = CONTROLER_VALUES.sort((a, b) => b[0] - a[0])
let controllerListDiv = document.querySelector(".controller-list") //controller-list tag

//Display all the controllers' string in controller-list tag
for (let i = 0; i < controllers.length; i++) {
  const span = document.createElement('span')
  span.textContent = controllers[i][0]
  controllerListDiv.appendChild(span)
}
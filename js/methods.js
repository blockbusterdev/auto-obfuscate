let nickID = 0
let functions = []

/**
 * Function to every search str to replacement in str
 * @param {string} str 
 * @param {string} search 
 * @param {string} replacement 
 * @returns {string}
 */
const replace = (str, search, replacement) => {
  if (!str || !search) return str

  while (str.indexOf(search) >= 0) {
    str = str.replaceAll(search, replacement)
  }
  return str
}

const getRan = () => {
  let res = 0
  while (res < 0.1) res = Math.random()
  return Math.ceil(res * 10)
}

/**
 * function to remove junk chars
 * @param {string}
 * @returns {string}
 */
const stringfy = string => {
  if (!string) return ""

  string = replace(string, '\t', ' ')
  string = replace(string, ' {', '{'); string = replace(string, '} ', '}')
  string = replace(string, ' ,', ','); string = replace(string, ', ', ',')
  string = replace(string, ' =', '='); string = replace(string, '= ', '=')
  string = replace(string, ' |', '|'); string = replace(string, '| ', '|')
  string = replace(string, ' >', '>'); string = replace(string, '> ', '>')
  string = replace(string, ' <', '<'); string = replace(string, '< ', '<')
  string = replace(string, ' +', '+'); string = replace(string, '+ ', '+')
  string = replace(string, ' -', '-'); string = replace(string, '- ', '-')
  string = replace(string, ' *', '*'); string = replace(string, '* ', '*')
  string = replace(string, ' /', '/'); string = replace(string, '/ ', '/')
  string = replace(string, ' ^', '^'); string = replace(string, '^ ', '^')
  string = replace(string, ' ~', '~'); string = replace(string, '~ ', '~')
  string = replace(string, ' &', '&'); string = replace(string, '& ', '&')
  string = replace(string, ' (', '('); string = replace(string, '( ', '(')
  string = replace(string, ' )', ')'); string = replace(string, ') ', ')')
  string = replace(string, '  ', ' ')
  string = replace(string, ' !', '!')
  string = replace(string, '; ', ';')
  string = replace(string, '\n(', '(')

  let array = string.split('\n'); string = ""
  for (let i = 0; i < array.length; i++) string += `${array[i].split('//')[0].trim()}\n`
  return replace(string, '\n\n', '\n')
}

/**
 * Function to apply nickname into every function
 * @param {string} str 
 * @returns 
 */
const nickFunction = (str) => {
  if (!str) return ""

  nickID = getRan()
  let array = str.split("function ")
  for (let i = 1; i < array.length; i++) array[i] = array[i].split('(')[0].trim()
  array.shift()
  array = array.sort((a, b) => b.length - a.length)

  for (let i = 0; i < array.length; i++) {
    str = replace(str, `${array[i]}(`, `_${nickID}(`)
    nickID += getRan()
  }

  return str
}

const nickValue = (str, type) => {
  if (!str) return ""
  let array = str.split(`${type} `)
  if (array.length > 0) {
    array.shift()
    for (let i = 0; i < array.length; i++) array[i] = array[i].split(';')[0].trim()
    for (let i = 0; i < array.length; i++) array[i] = array[i].split('[')[0].trim()
    for (let i = 0; i < array.length; i++) array[i] = array[i].split('=')[0].trim()
    for (let i = 0; i < array.length; i++) array[i] = array[i].split('{')[0].trim()
    for (let i = 0; i < array.length; i++) array[i] = array[i].split(',')
    let values = []
    for (let i = 0; i < array.length; i++)
      for (let j = 0; j < array[i].length; j++)
        values.push(array[i][j].trim())
    values = values.sort((a, b) => b.length - a.length)

    for (let i = 0; i < values.length; i++) {
      let regex = new RegExp(`\\b${values[i]}\\b`, "g")
      str = str.replaceAll(regex, `_${nickID}`)
      nickID += getRan()
    }
  }

  return str
}

/**
 * function to apply nickname to every controller values, such as PS4_CROSS
 * @param {string} str resource
 * @returns {string} resource uglified
 */
const nickControllerConsts = str => {
  let controllers = [...CONTROLER_VALUES]
  controllers = controllers.sort((a, b) => b[0].length - a[0].length)

  for (let i = 0; i < controllers.length; i++) {
    let regex = new RegExp(`\\b${controllers[i][0]}\\b`, "g")

    controllers[i][2] = `_${nickID}`
    str = `const int _${nickID}=${controllers[i][1]};\n` +
      str.replaceAll(regex, controllers[i][2])
    nickID += getRan()
  }
  return str
}

/**
 * Function to finally uglify the resource
 * @param {string} str 
 * @returns {string} resource uglified
 */
const uglify = str => {
  str = str.replaceAll('\n\n', '\n')
  str = str.replaceAll('\n}', '}')
  str = str.replaceAll('}\n', '}')
  str = str.replaceAll('}\n', '}')
  str = str.replaceAll('{\n', '{')
  return str
}
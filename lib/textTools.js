const capitalize = (text) => (
  text.split('')
      .map((char, index) => (
        index === 0
          ? char.toUpperCase()
          : char
      ))
      .join('')
)

const isAlphaOnlyCamelCase = (text) => (
  /^([a-z]+([A-Z]{1}[a-z]*)*)$/.test(text)
)

const camelCaseConversions = (() => {

  const toSlugCase = (text) => (
    text.replace(/([A-Z]{1})/g, (group, _, offset) => (
      offset === 0
        ? group.toLowerCase()
        : `-${group.toLowerCase()}`
    ))
  )

  const toSnakeCase = (text) => (
    text.replace(/([A-Z]{1})/g, (group, _, offset) => (
      offset === 0
        ? group.toLowerCase()
        : `_${group.toLowerCase()}`
    ))
  )

  const toLowerSpaceCase =(text) => (
    toSlugCase(text).replace(/-/g, ' ').toLowerCase()
  )

  return {
    toSlugCase,
    toSnakeCase,
    toLowerSpaceCase
  }
})()

const interpolateTestInFileName = (fileName) => {
  const parts = fileName.split('.')
  const suffix = parts[0]

  return parts.length === 1
    ? `${suffix}.test`
    : `${parts.slice(0, -1).join('.')}.test.${parts.slice(-1)[0]}`
}

module.exports = {
  capitalize,
  isAlphaOnlyCamelCase,
  camelCaseConversions,
  interpolateTestInFileName
}

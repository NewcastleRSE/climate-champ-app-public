// Handles clicking on a checkbox. It will take the key and change the state for that key to either true or false without modifying the whole state. If the key is NoneApply then it will uncheck everything else. If the key is not NoneApply it will uncheck NoneApply.
export default function handleCheckboxChange(setState, key, data) {
  setState((prev) => {
    if (key === 'noneApply') {
      // If "noneApply" is checked, uncheck all other options
      return { ...data, noneApply: true }
    }
    if (prev.noneApply) {
      // If any other option is checked while "NoneApply" is checked then uncheck "NoneApply"
      return { ...prev, noneApply: false, [key]: !prev[key] }
    }
    // Otherwise, toggle the checked status of the clicked key
    return { ...prev, [key]: !prev[key] }
  })
}

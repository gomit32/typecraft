export const codeSnippets = [
  {
    language: "JavaScript",
    code: `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`
  },
  {
    language: "Python",
    code: `def bubble_sort(arr):\n  n = len(arr)\n  for i in range(n):\n    for j in range(0, n-i-1):\n      if arr[j] > arr[j+1]:\n        arr[j], arr[j+1] = arr[j+1], arr[j]`
  },
  {
    language: "JavaScript",
    code: `const fetchData = async (url) => {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(error);\n  }\n};`
  },
  {
    language: "CSS",
    code: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n}`
  },
  {
    language: "HTML",
    code: `<div class="card">\n  <img src="image.jpg" alt="Card" />\n  <h2 class="title">Hello World</h2>\n  <p class="description">This is a card.</p>\n  <button class="btn">Click Me</button>\n</div>`
  }
];

export default codeSnippets;
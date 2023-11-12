export function debounce<F extends (...args: any[]) => any>(
  func: F,
  timeout = 300
): (...args: Parameters<F>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<F>) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => func(...args), timeout)
  }
}

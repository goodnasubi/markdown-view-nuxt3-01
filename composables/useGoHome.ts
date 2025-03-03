export function useGoHome() {
    const count = ref(0);
    const inc = () => (count.value = count.value + 1);
    const dec = () => (count.value = count.value - 1);
    const isHome = () => {return count.value == 0};
    const goHome = () => {count.value = 0};
    return {
      count,
      inc,
      isHome,
      goHome,
    };
  }
  
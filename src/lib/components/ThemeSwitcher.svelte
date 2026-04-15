<script lang="ts">
  import { onMount } from "svelte";

  let theme: "light" | "dark" = "light";

  const applyTheme = (value: "light" | "dark") => {
    const root = document.documentElement;

    if (value === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", value);
    theme = value;
  };

  const toggleTheme = () => {
    applyTheme(theme === "dark" ? "light" : "dark");
  };

  onMount(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;

    if (saved) {
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light");
    }
  });
</script>

<button onclick={toggleTheme} class="text-muted-foreground p-2 rounded-md hover:bg-muted" aria-label="Toggle theme">
  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
    <path d="M0 0h24v24H0z" fill="none" stroke="none" />
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 3l0 18" />
    <path d="M12 9l4.65 -4.65" />
    <path d="M12 14.3l7.37 -7.37" />
    <path d="M12 19.6l8.85 -8.85" />
  </svg>
</button>
